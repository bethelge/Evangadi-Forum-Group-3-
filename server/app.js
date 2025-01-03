require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5200;

const cors = require("cors");

app.use(cors());
// db connection
const dbConnection = require("./db/dbConfig");
// user routes middleware
const userRoutes = require("./routes/userRoute");
const questionRoute = require("./routes/questionRoute");
const answerRoutes = require("./routes/answerRoute");
// json middleware to extract json data
app.use(express.json());
// userRoutes middleware file
app.use("/api/users", userRoutes);

// question middleware file
app.use("/api/question", questionRoute);

// answer middleware file
app.use("/api/answers", answerRoutes);

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
