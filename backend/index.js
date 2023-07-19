const express = require("express");
var cors = require("cors");
const { connection } = require("./config/database");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send(`Welcome to Homepage`);
});

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Successfully connected to database");
  } catch (error) {
    console.log("Error while connecting with DB", error.message);
  }
  console.log(`Server is running at ${process.env.port}`);
});
