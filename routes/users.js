const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const { ensureAuth } = require("../middleware/auth");

router.get("/", ensureAuth, usersController.getTodos);

router.post("/createTodo", usersController.createTodo);

router.put("/markComplete", usersController.markComplete);

router.put("/markIncomplete", usersController.markIncomplete);

router.delete("/deleteTodo", usersController.deleteTodo);

module.exports = router;
