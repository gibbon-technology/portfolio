import { MongoClient, ServerApiVersion } from "mongodb";
import config from "./config.js";

const client = new MongoClient(config.mongodb.connectionString, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: false,
  },
});

client
  .connect()
  .then(() => {
    console.log("Connected to DatabaseThreeOne");
  })
  .catch((err) => console.log(err));

const db = client.db("redrock");

const UpdateDB = db.collection("updates");
const UserDB = db.collection("users");
const TrackerDB = db.collection("trackers");

export { UserDB, UpdateDB, TrackerDB };
