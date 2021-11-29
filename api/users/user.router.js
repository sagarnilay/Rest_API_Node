const { createUser, getUserByUserId, getUsers, login } = require("./user.controller");
const router = require("express").Router();
router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserByUserId);
router.post("/login", login);

module.exports = router;