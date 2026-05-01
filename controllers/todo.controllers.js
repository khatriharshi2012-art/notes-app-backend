const mongoose = require("mongoose");
const Todo = require("../models/todo.models");

exports.createTodo = async (req, res) => {
  try {
    const {
      title,
      description,
      isCompleted,
      isImportant,
      dueDate,
      reminder,
      priority,
      category,
      subtasks
    } = req.body;

    if (!title) {
      return res.status(400).json({
        status: false,
        message: "Title is a required field",
      });
    }

    const newTodo = await Todo.create({
      title,
      description,
      isCompleted,
      isImportant,
      dueDate,
      reminder,
      priority,
      category,
      subtasks,
      userId: req.user.id,
    });

    return res.status(201).json({
      status: true,
      message: "Todo created successfully",
      data: newTodo,
    });
  } catch (error) {
    console.log("createTodo error:", error);

    return res.status(500).json({
      status: false,
      message: error?.message || "Internal server error",
    });
  }
};

exports.getTodo = async (req, res) => {
  try {
    const filter = req.user?.id ? { userId: req.user.id } : {};
    const todos = await Todo.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      status: true,
      message: "Todos fetched successfully",
      data: todos,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error?.message || "Internal server error",
    });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const { id } = req.body || {};

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Todo id is required",
      });
    }

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid todo id",
      });
    }

    const todo = await Todo.findOne({
      _id: id,
      userId: req.user.id,
    });

    if (!todo) {
      return res.status(404).json({
        status: false,
        message: "Todo not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Todo fetched successfully",
      data: todo,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error?.message || "Internal server error",
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.body || {};

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Todo id is required",
      });
    }

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid todo id",
      });
    }

    const todo = await Todo.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!todo) {
      return res.status(404).json({
        status: false,
        message: "Todo not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error?.message || "Internal server error",
    });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id, ...updates } = req.body || {};

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Todo id is required",
      });
    }

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid todo id",
      });
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        status: false,
        message: "At least one field is required to update the todo",
      });
    }

    delete updates.userId;

    const todo = await Todo.findOneAndUpdate(
      {
        _id: id,
        userId: req.user.id,
      },
      updates,
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!todo) {
      return res.status(404).json({
        status: false,
        message: "Todo not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Todo updated successfully",
      data: todo,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error?.message || "Internal server error",
    });
  }
};
