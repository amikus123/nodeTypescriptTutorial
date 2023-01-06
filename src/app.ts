import { deserializeUser } from "./middleware/deserializeUser";
import express from "express";
import config from "config";
import logger from "./utlis/logger";
import connect from "./utlis/connect";
import routes from "./routes";
const app = express();
// middleware used to parse body
app.use(express.json());
app.use(deserializeUser);
app.listen(config.get("port"), async () => {
  logger.info(
    `App is running at http://${config.get("host")}:${config.get("port")}`
  );
  // db connection
  await connect();
  routes(app);
});
 