import { TrackerDB } from "../databaseManager.js";
import { append_data } from "./IP_tracking.js";
import whois from "whois-json";

export const handleTracking = async (req, res, next) => {
  const { ip } = req;
  const match = await TrackerDB.findOne({ ip });

  if (match) {
    console.log("Match"); //
    await TrackerDB.updateOne({ ip }, { $inc: { requestCount: 1 } });
  }

  // Not match; Add new IP
  if (!match.value) {
    console.log("No match"); //
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
  }

  next();
};
