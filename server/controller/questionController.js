const { json } = require("express");
const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

// Post a Question
const postQuestion = async (req, res) => {
  const { title, description, tag } = req.body;
  const user_id = req.user.userid;

  // Validate input
  if (!title || !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "All fields are required" });
  }

  const questionid = `${user_id}-${Date.now()}`;

  try {
    const query = `
        INSERT INTO questions (questionid, userid, title, description, tag) 
        VALUES (?, ?, ?, ?, ?);
      `;

    await dbConnection.query(query, [
      questionid,
      user_id,
      title,
      description,
      tag,
    ]);

    res
      .status(StatusCodes.CREATED)
      .json({ message: "Question posted successfully" });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

module.exports = { postQuestion };
