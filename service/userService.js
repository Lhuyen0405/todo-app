require("dotenv").config()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET
const getAllUsers = async () => {

	const users = await User.find().select("-password")
	return users
}

module.exports = {
	getAllUsers,
}