import { UserDB, UpdateDB } from "../databaseManager.js";
import { registerUser, duplicateUsername } from "./Auth.js";
import { Router } from "express";
import { join } from "path";
import { v4 } from "uuid";
import { spawn, exec } from "child_process";
import fs from "fs";
import config from "../config.js";
import validator from "validator";
import verifyToken from "../validateToken.js";
import writeMC_log from "../logs/minecraftLog.js";
import * as emailConfig from "../email_config.js";
import * as cron from "node-cron";

const { f, r } = config.admins;
const production = process.env.NODE_ENV === "PROD" ? true : false;

const router = Router();
const root = process.cwd();
router.use(verifyToken);

const dateToCron = (_date) => {
  const date = new Date(_date);
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const days = date.getDate();
  const months = date.getMonth() + 1;
  return `${minutes} ${hours} ${days} ${months} *`;
};

// done //
router.get("/auth-check", (req, res) => {
  if (req.auth)
    return res.json({ data: { success: true, expiresAt: req.expiresAt } });
  res.json({ data: { success: false, expiresAt: null } });
});

// done //
router.get("/getCompanyKeys", async (req, res) => {
  const keyArray = [];
  const result = (
    await UserDB.find({ username: { $nin: [r, f] } }).toArray()
  ).reverse();
  result.forEach((key) => {
    keyArray.push({
      username: key.username,
      password: key.plainPass,
      count: key.loginCount,
    });
  });
  res.json({ data: keyArray });
});

router.get("/deleteKey", async (req, res) => {
  const { username } = req.query;
  await UserDB.deleteOne({ username });
  res.json({ data: "Confirmed" });
});
router.get("/updateCount", async (req, res) => {
  const { username } = req.query;
  await UserDB.updateOne({ username }, { $set: { loginCount: 0 } });
  res.json({ data: "Count reset" });
});
// done //
router.get("/checkNewMessages", async (req, res) => {
  if (req.auth) {
    let count = 0;
    const messages = await (
      await UserDB.findOne({ username: req.username })
    ).directMessages;
    await messages.forEach((msg) => (!msg.read ? (count += 1) : null));
    return res.json({ data: count });
  }
  res.json({ data: 0 });
});
// done //
router.post("/send-instant-message", async (req, res) => {
  const {
    fromName,
    fromUsername,
    message,
    toUsername = config.admins.r,
  } = req.body;

  const { modifiedCount, acknowledged } = await UserDB.updateMany(
    { username: { $in: [toUsername, fromUsername] } },
    {
      $push: {
        directMessages: {
          id: v4(),
          toUsername,
          fromName,
          fromUsername,
          message,
          read: false,
          time: new Date().getTime(),
        },
      },
    }
  );

  if (modifiedCount === 2 && acknowledged) {
    if (toUsername === r && production)
      emailConfig.newChatAlert(fromName, message);
    return res.json({ data: "Message sent!" });
  }
  res.json({ data: "Message failed" });
});

// Get list of USERNAMES but not CURRENT USERNAME // done //
router.get("/getAllUsers", async (req, res) => {
  const userArray = [];
  const result = await UserDB.find({ username: { $ne: req.username } })
    .project({ username: 1, _id: 0 })
    .toArray();
  result.forEach((x) => userArray.push(x.username));
  const x = userArray.reverse();
  res.json({ data: x });
});

router.get("/getMessages", async (req, res) => {
  const isSudo = req.isSudo;
  const username = req.username;
  const selectedUser = req.headers["selected-user"];

  const messages = await (
    await UserDB.findOneAndUpdate(
      { username },
      { $set: { "directMessages.$[].read": true } }
    )
  ).value.directMessages;

  await messages.sort((a, b) => b.time - a.time);
  if (!isSudo && messages.length === 0) return res.json({ data: [] });
  if (!isSudo) return res.json({ data: messages });

  if (isSudo && messages.length === 0) return res.json({ data: [] });

  const filteredMessages = await messages.filter(
    (msg) =>
      (msg.fromUsername === username && msg.toUsername === selectedUser) ||
      (msg.fromUsername === selectedUser && msg.toUsername === username)
  );
  res.json({ data: filteredMessages });
});

// done //
router.post("/addNewUser", async (req, res) => {
  const { username, password, isSudo } = req.body;
  const result = await registerUser(username, password, isSudo, false);
  result.success = true;
  res.json({ data: result });
});
// done //
router.post("/create-key", async (req, res) => {
  const { name: _name } = req.body;
  const duplicate = await duplicateUsername(_name);
  if (duplicate)
    return res.json({ data: { success: false, msg: "User exists" } });
  // check for success?
  const userPass = String(Math.floor(1000 + Math.random() * 9000));
  await registerUser(_name, userPass, false);
  res.json({ data: { success: true, msg: "Key created!" } });
});

// done //
router.post("/send-email", async (req, res) => {
  const { email, username } = req.body;
  email.username = username;
  if (validator.isEmail(email.to)) {
    const { success } = await emailConfig.sendEmail(email);
    if (success) {
      UserDB.updateOne(
        { username: email.username },
        {
          $push: {
            outgoingEmails: {
              to: email.to,
              subject: email.subject,
              message: email.message,
              time: new Date().toLocaleTimeString(),
              date: new Date().toLocaleDateString(),
            },
          },
        }
      );
      return res.json({ data: { success: true, msg: "Message sent" } });
    }
    res.json({ data: { success: false, msg: "Invalid email address}" } });
  }
});
// done//
router.get("/get-grades", async (req, res) => {
  const { subject } = req.query;
  const result = fs.readFileSync(join(root, "grades", `${subject}.txt`), {
    encoding: "utf8",
  });
  return res.json({ data: result });
});
// done //
router.post("/new-update", async (req, res) => {
  const { date: _date, details } = req.body;
  const sortDate = new Date(_date);
  await UpdateDB.insertOne({ _date, details, sortDate });
  res.json({ data: { success: true } });
});

// done //
router.get("/get-tasks", async (req, res) => {
  const { username } = req.query;
  const tasks = await (await UserDB.findOne({ username })).tasks;
  return res.json({ data: tasks });
});
// done //
router.post("/new-task", async (req, res) => {
  const { username, task: tasks } = req.body;
  const result = await UserDB.updateOne({ username }, { $push: { tasks } });
  res.json({ data: result });
});
// done //
router.get("/delete-task", async (req, res) => {
  const { username, id } = req.query;
  const result = await UserDB.updateOne(
    { username },
    { $pull: { tasks: { id } } }
  );
  res.json({ data: result });
});

router.get("/get-line-count", (req, res) => {
  let dataToSend;
  const python = spawn("python3", ["lineCount.py"]);
  python.stdout.on("data", (data) => (dataToSend = data.toString()));
  python.on("close", (code) => res.json({ data: dataToSend }));
});

router.post("/compress-image", (req, res) => {
  const { base64, name, type, size, quality } = req.body;
  const filePath = join(root, "ImageCompressor", `${name}.${type}`);
  const optimizedPath = join(
    root,
    "ImageCompressor",
    `${name}_${size}px.${type}`
  );
  const imgData = base64.split(",")[1];

  fs.writeFileSync(filePath, imgData, "base64");

  let og_file_size;
  let new_file_size;

  const python = spawn("python3", [
    "compression.py",
    filePath,
    quality,
    size,
    name,
    type,
  ]);
  python.stdout.on("data", (data) => {
    const info = data.toString().split("_");
    og_file_size = info[0];
    new_file_size = info[1];
  });

  python.stdout.on("close", async () => {
    const newBase64 = fs.readFileSync(optimizedPath, "base64");
    res.json({
      data: `data:image/${type};base64,${newBase64}`,
      size: { old: og_file_size, new: new_file_size },
    });
    fs.unlinkSync(filePath);
    fs.unlinkSync(optimizedPath);
  });
});

router.post("/schedule-email", async (req, res) => {
  const { time, to, subject, text } = req.body.emailData;
  const cronTime = dateToCron(time);
  console.log(cron.validate(cronTime));
  if (cron.validate(cronTime)) {
    console.log(`Email to ${to} scheduled for ${time}`);
    cron.schedule(cronTime, () =>
      emailConfig.sendScheduledEmail(to, subject, text)
    );
    return res.json({ data: "success" });
  }
  res.json({ data: "failed" });
});

router.get("/search-users", async (req, res) => {
  const { username: searchUsername } = req.query;
  const keyArray = [];
  const search = await UserDB.find({
    username: { $regex: searchUsername, $options: "i" },
  }).toArray();
  const result = search.reverse();
  result.forEach((key) => {
    keyArray.push({
      username: key.username,
      password: key.plainPass,
      count: key.loginCount,
    });
  });
  res.json({ data: keyArray });
});

// MC SERVER //

router.get("/get-server-status", async (req, res) => {
  const status_filepath = production
    ? "/home/ryan/minecraft/commands/status.txt"
    : "C:\\Users\\rdavi\\OneDrive\\Desktop\\Code\\new_visitor\\status.txt";
  const status = fs.readFileSync(status_filepath, "utf-8");
  res.json({ data: status });
});

router.get("/start-server", async (req, res) => {
  exec(
    "bash server_start.sh",
    {
      cwd: production
        ? "/home/ryan/minecraft/commands"
        : "C:\\Users\\rdavi\\OneDrive\\Desktop\\Code\\new_visitor",
    },
    (error, stdout, stderr) => {
      if (error !== null) {
        res.json({ data: `exec error: ${error}` });
      } else {
        res.json({ data: stdout });
        writeMC_log("STARTED", req.username);
      }
    }
  );
});

router.get("/stop-server", async (req, res) => {
  exec(
    "bash server_stop.sh",
    {
      cwd: production
        ? "/home/ryan/minecraft/commands"
        : "C:\\Users\\rdavi\\OneDrive\\Desktop\\Code\\new_visitor",
    },
    (error, stdout, stderr) => {
      if (error !== null) {
        res.json({ data: `exec error: ${error}` });
      } else {
        res.json({ data: stdout });
        writeMC_log("STOPPED", req.username);
      }
    }
  );
});

export default router;
