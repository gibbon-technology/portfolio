import fs from "fs";

export default function writeMC_log(operation, username) {
  const date = new Date();
  fs.appendFileSync(
    "logs/minecraft.log",
    `Server ${operation} by ${username} on ${date.toLocaleDateString()} @ ${date.toLocaleTimeString()}\n`
  );
}
