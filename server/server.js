import { join } from "path";
import express from "express";
import authRouter from "./Routes/Auth.js";
import baseRouter from "./Routes/Base.js";
import adminRouter from "./Routes/Admin.js";

console.clear();
process.env.NODE_ENV === "PROD"
  ? console.log("Production")
  : console.log("Development\nhttp://localhost:9000");

const root = process.cwd();
const app = express();

const mainPublicFolder = join(root, "public/main");
const secFolder = join(root, "public/sec_resume");
const reactIndexPage = join(mainPublicFolder, "index.html");

app.use(express.static("public"));
app.use(express.static(mainPublicFolder));
app.use(express.json({ limit: "5mb" }));
app.set("trust proxy", true);

app.get("/security", (req, res) => {
  res.sendFile(join(secFolder, "index.html"));
});

app.use("/api/base", baseRouter);
app.use("/api/auth", authRouter);

app.use("/api/admin", adminRouter);

app.get("/*", async (req, res) => {
  res.sendFile(reactIndexPage);
});

app.listen(9000);
