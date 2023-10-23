import { google } from "googleapis";
import { join } from "path";
import process from "process";

const spreadsheetId = "118zsNLEMfFGzStWqNDVXGEzNB9PdNdBc48uaQ1r87eM"; // put in config?
const scopes = "https://www.googleapis.com/auth/spreadsheets";

const auth = async () => {
  const _auth = new google.auth.GoogleAuth({
    keyFile: join(process.cwd(), "Tracking", "credentials.json"),
    scopes,
  });
  const client = await _auth.getClient();
  return client;
};

export const append_data = async (ip, company, location) => {
  const client = await auth();
  const sheet = await google.sheets({ version: "v4", auth: client });
  sheet.spreadsheets.values.append({
    spreadsheetId,
    range: "main!A:C",
    valueInputOption: "USER_ENTERED",
    resource: { values: [[company, location, ip]] },
  });
};
