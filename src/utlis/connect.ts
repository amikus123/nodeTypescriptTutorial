import mongoose from "mongoose";
import config from "config";
import logger from "./logger";
export default function connect() {
  const dbUri = <string>config.get("dbUri");
  mongoose.set("strictQuery", false);
  return mongoose
    .connect(dbUri)
    .then(() => {
      logger.info("Connected to db");
    })
    .catch((e) => {
      logger.error("db error ", e);
      console.log(e)
    });
}
