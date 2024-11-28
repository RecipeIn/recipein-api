import express from "express";
// import dbConnection from './dbConnection.js';
import cors from "cors";
import routes from "./routes/routes.js";
const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: "*",
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
};

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api", routes);
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
