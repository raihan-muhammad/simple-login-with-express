const router = require("express").Router();
const { getAllUsers } = require("./../controllers/userController");
const { autorize } = require("./../utils/authentication");

router.get("/", autorize, getAllUsers);

module.exports = router;