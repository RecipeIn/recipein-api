import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env.test" });

import routes from "../routes/routes";

const testServer = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/auth", routes);
  app.use("/api", routes);

  return app;
};

export default testServer;