require("dotenv").config();
const express = require("express");
const app = express();
const port = 5200;

const cors = require("cors");

app.use(cors());
// db connection
const dbConnection = require("./db/dbConfig");

// json middleware to extract json data
app.use(express.json());

async function start() {
  try {
    const result = await dbConnection.execute("select 'test' ");
    // app.listen(port)
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
    console.log("database connection established");
    console.log(`listening to port ${port}`);
  } catch (error) {
    console.log(error.message);
  }
}

start();
