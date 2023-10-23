import { createTransport } from "nodemailer";
import config from "./config.js";

const { user, pass, host, port, target } = config.nodemailer;

const transporter = createTransport({
  secure: true,
  host,
  port,
  auth: {
    user,
    pass,
  },
});

export const sendEmail = async (email) => {
  const { to, subject, message } = email;
  let success = false;
  const status = await transporter.sendMail({
    to,
    from: `RedRock Software <${user}>`,
    subject,
    html: `<h3>${message}</h3>`,
  });
  if (status.accepted.length > 0) success = true;
  return { success };
};

export const newLogin = async (name) => {
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  const status = await transporter.sendMail({
    to: target,
    from: `RedRock Software <${user}>`,
    subject: "New login!",
    html: `<h3>NEW LOGIN FROM:<hr/>\n\t${name}\n\n</h3><hr/><h3>${date} @ ${time}</h3>`,
  });
  return status;
};

export const newChatAlert = async (from, message) => {
  const status = await transporter.sendMail({
    to: target,
    from: `RedRock Software <${user}>`,
    subject: "New message!",
    html: `<h2>${from}</h2><br/><br/><h4>${message}</h4>`,
  });
  return status;
};

export const sendScheduledEmail = async (to, subject, text) => {
  const result = await transporter.sendMail({
    to,
    from: `RedRock Software <${user}>`,
    subject,
    text,
  });
  if (result.accepted.length === 1) return console.log("Email sent");
  console.log("Email failed to send");
};
