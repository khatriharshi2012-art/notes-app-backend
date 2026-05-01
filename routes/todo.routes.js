const express = require('express');

const {createTodo , getTodo  , getTodoById , deleteTodo , updateTodo } = require("../controllers/todo.controllers")
const { authenticate } = require("../middleware/auth.middleware");

const router  =  express.Router();

router.post("/create-todo" , authenticate, createTodo);
router.post("/get-todo" , authenticate, getTodo);
router.post("/get-todo-id" , authenticate, getTodoById);
router.post("/delete-todo" ,authenticate, deleteTodo);
router.post("/update-todo" ,authenticate, updateTodo);

module.exports = router
