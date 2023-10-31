import { TrackerDB } from "../databaseManager.js";
import { google } from "googleapis";
import { join } from "path";
import whois from "whois-json";
import process from "process";

// Setup //

const spreadsheetId = "118zsNLEMfFGzStWqNDVXGEzNB9PdNdBc48uaQ1r87eM"; // put in config?
const scopes = "https://www.googleapis.com/auth/spreadsheets";

// Auth //

const auth = async () => {
  const _auth = new google.auth.GoogleAuth({
    keyFile: join(process.cwd(), "Tracking", "credentials.json"),
    scopes,
  });
  const client = await _auth.getClient();
  return client;
};

// Append data to Google Sheets //

const append_data = async (ip, company, location) => {
  const client = await auth();
  const sheet = await google.sheets({ version: "v4", auth: client });
  sheet.spreadsheets.values.append({
    spreadsheetId,
    range: "main!A:C",
    valueInputOption: "USER_ENTERED",
    resource: { values: [[company, location, ip]] },
  });
};

// Handle tracking flow //

export default async function handleTracking(req, res, next) {
  const { ip } = req;
  const match = await TrackerDB.findOne({ ip });

  if (match) {
    await TrackerDB.updateOne({ ip }, { $inc: { requestCount: 1 } });
    return next();
  }

  // Not match; Add new IP
  const d = new Date();
  const date = d.toLocaleDateString();
  const time = d.toLocaleTimeString();
  const dateTimeFormat = `${date} @ ${time}`;
  const info = await whois(ip);
  const { orgName: company, address, city, stateProv, country } = info;
  const location = `${address} > ${city} > ${stateProv}, ${country}`;
  TrackerDB.insertOne({
    ip,
    time: dateTimeFormat,
    company,
    location,
    requestCount: 0,
  });
  append_data(ip, company, location);

  next();
}
