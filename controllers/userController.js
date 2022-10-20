const db = require("./../models");

const getAllUsers = async (req, res) => {
    const data = await db.Authentication.findAll();
    return res.status(200).json({ message: "All data users", data: data})
}

module.exports = { getAllUsers }