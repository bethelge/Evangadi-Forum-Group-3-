const { json } = require("express");
const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

const postAnswer = async (req, res) => {
  console.log("Request body received for validation:", req.body);

  const { questionid, answer } = req.body;

  // Log individual fields
  // console.log("userid:", userid, "questionid:", questionid, "answer:", answer);

  // Input validation: Check for missing fields or empty strings
  console.log(req.body);
  if (!answer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide an answer" });
  }

  try {
    const userid = req.user.userid;
    const query = `
      INSERT INTO answers (userid, questionid, answer) 
      VALUES (?, ?, ?)
    `;
    const [result] = await dbConnection.query(query, [
      userid,
      questionid,
      answer,
    ]);

    res.status(StatusCodes.CREATED).json({
      message: "Answer posted successfully",
      insertId: result.insertId,
    });
  } catch (err) {
    console.error("Error inserting answer:", err.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};
module.exports = { postAnswer };
