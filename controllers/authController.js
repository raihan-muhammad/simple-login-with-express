const db = require("./../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    const { name, email, password } = req.body;

    const validateEmail = await db.Authentication.findOne({ where: { email}})
    if(validateEmail) {
        return res.json({ message: "email already exsist!"})
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const resAdd = await db.Authentication.create({ name, email, password: hashPassword });
    return res.status(201).json({
        message: "register data successfully!",
        data: resAdd,
    })
} 

const login = async (req, res) => {
    const { email, password} = req.body;
    const checkData = await db.Authentication.findOne({ where: { email } })

    if(!checkData){
        return res.status(422).json({ message: "email or password not found!"})
    }
    
    const comparePassword = await bcrypt.compare(password, checkData.password);
    if(!comparePassword) {
        return res.status(422).json({ message: "email or password not found!"})
    }

    const token = jwt.sign({ id: checkData.id, email: checkData.email, password: checkData.password}, "secret key");

    return res.status(200).json({ message: "login successfully!", token});
}

module.exports = { register, login }