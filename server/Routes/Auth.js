import { hashSync, compareSync } from "bcrypt";
import { UserDB } from "../databaseManager.js";
import { Router } from "express";
import { newLogin } from "../email_config.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import config from "../config.js";

const router = Router();
const production = process.env.NODE_ENV === "PROD" ? true : false;
const { f, r } = config.admins;

router.post("/verify-auth", async (req, res) => {
  const { username, password } = req.body;
  const cleanName = validator.escape(username).trim();
  const cleanPass = validator.escape(password);

  const user = await UserDB.findOne({ username: cleanName });
  if (user) {
    const validPass = compareSync(cleanPass, user.password);
    if (validPass) {
      const safeUser = {
        _id: user._id,
        name: user.name,
        username: user.username,
        isSudo: user.isSudo,
      };
      const token = jwt.sign({ user: safeUser }, config.jwtKey, {
        expiresIn: "90m",
      });
      const exp = await jwt.verify(token, config.jwtKey).exp;
      UserDB.updateOne({ username }, { $inc: { loginCount: 1 } });
      if (user.username !== r && production) newLogin(user.name);
      return res.json({ data: { user: safeUser, token, exp, msg: "Success" } });
    }
    return res.json({
      data: {
        user: null,
        token: null,
        exp: null,
        msg: "Invalid credentials",
      },
    });
  }
});

// check if this works //
router.post("/register-auth", async (req, res) => {
  res.json({ data: { msg: "Registration locked", user: null } });
  // const { username, password } = req.body;
  // const status = await UserDB.registerUser(username, password);
  // const { msg, user } = status;
  // if (user) return res.json({ user, msg });
  // return res.json({ user: null, msg });
});

// done //
export const registerUser = async (name, password, isSudo = false) => {
  const username = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/gi, "_");

  const hashed_pass = hashSync(password, 10);
  if (username === r || username === f) return;
  const result = await UserDB.insertOne({
    name,
    username,
    password: hashed_pass,
    plainPass: password,
    isSudo,
    loginCount: 0,
    outgoingEmails: [],
    directMessages: [],
    tasks: [],
  });
  const user = await UserDB.findOne({ _id: result.insertedId });
  delete user.password;
  delete user.plainPass;
  delete user.outgoingEmails;
  delete user.tasks;
  delete user.loginCount;
  delete user.directMessages;
  return user;
};

export const duplicateUsername = async (username) => {
  const match = await UserDB.findOne({
    $or: [{ username }, { name: username }],
  });
  if (match) return true;
  return false;
};

export default router;
