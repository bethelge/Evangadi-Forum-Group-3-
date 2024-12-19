const { json } = require("express");
const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");


// Get All Answers for a Question
const getAllAnswers = async (req, res) => {
  const { question_id } = req.params;

 
  try {
    const query = `
      SELECT a.answerid, a.answer, u.username 
      FROM answers a 
      JOIN users u ON a.userid = u.userid 
      WHERE a.questionid = ?
      ORDER BY a.answerid DESC;
    `;

    // Using `await` to handle the database query
    const [results] = await dbConnection.query(query, [question_id]);

    //  this blocks the front end when there is no answer and to post first answer
    // if (results.length === 0) {
    //   return res
    //     .status(StatusCodes.NOT_FOUND)
    //     .json({ message: "No answers found for this question" });
    // }

    res.status(StatusCodes.OK).json(results);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};



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
module.exports = {getAllAnswers, postAnswer };
