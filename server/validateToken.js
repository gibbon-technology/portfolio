import jwt from "jsonwebtoken";
import config from "./config.js";

export default function (req, res, next) {
  req.auth = false;
  req.username = null;
  req.isSudo = false;
  req.expiresAt = { now: null, exp: null };

  const authHeader = req.headers.authorization;
  if (authHeader) {
    try {
      const token = authHeader.split(" ")[1];
      const validToken = jwt.verify(token, config.jwtKey);
      const currentTime = Math.floor(new Date().getTime() / 1000);
      if (validToken) {
        req.auth = true;
        req.username = validToken.user.username;
        req.isSudo = validToken.user.isSudo;
        req.expiresAt = { now: currentTime, exp: validToken.exp };
        return next();
      }
    } catch (err) {
      return next();
    }
  }
  next();
}
