// db connection
const { json } = require("express");
const dbConnection = require("../db/dbConfig");
const bcrypt = require("bcrypt");
const {StatusCodes} = require("http-status-codes")


async function register(req,res) {
    const { username, firstname, lastname, email, password} = req.body;
    if(!email || !password || !firstname || !lastname) {
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"please provide all required information!"})
    }
    try {
        const [user] = await dbConnection.query("select username,userid from users where username =? or email =?", [username, email])
        if(user.length > 0){
            return res.status(StatusCodes.BAD_REQUEST).json({msg:" user already existed"})
        }
        if(password.length <=8){
           return res.status(StatusCodes.BAD_REQUEST).json({msg:"password must be atleast 8 characters"})
        }
        // encrype the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        await dbConnection.query("INSERT INTO users (username, firstname, lastname, email, password) VALUES (?,?,?,?,?) ", [username, firstname,lastname, email, hashedPassword])
        res.status(StatusCodes.CREATED).json({msg:"user registered"})

    } catch (error) {
        console.log(error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"something went wrong, try again latter"})
    }
}


module.exports = {register}