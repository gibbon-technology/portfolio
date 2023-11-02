import { join } from "path";
import express from "express";
import authRouter from "./Routes/Auth.js";
import baseRouter from "./Routes/Base.js";
import adminRouter from "./Routes/Admin.js";
import handleTracking from "./Tracking/tracker.js";

console.clear();
process.env.NODE_ENV === "PROD"
  ? console.log("Production")
  : console.log("Development");

const root = process.cwd();
const app = express();

const mainPublicFolder = join(root, "public/main");
const reactIndexPage = join(mainPublicFolder, "index.html");

app.use(express.static("public"));
app.use(express.static(mainPublicFolder));
app.use(express.json({ limit: "5mb" }));
app.set("trust proxy", true);

app.use("/api/base", handleTracking); // TRACKING
app.use("/api/base", baseRouter);
app.use("/api/auth", handleTracking); // TRACKING
app.use("/api/auth", authRouter);

app.use("/api/admin", adminRouter);

app.get("/*", handleTracking, async (req, res) => {
  // console.log("Running /*", req);
  res.sendFile(reactIndexPage);
});

app.listen(9000);
