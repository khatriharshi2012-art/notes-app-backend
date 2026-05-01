const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    isImportant: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: Date,
      default: null,
    },
    reminder: {
      type: Date,
      default: null,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    category: {
      type: String,
      enum: ["general", "work", "study", "personal"],
      default: "general",
      trim: true,
    },
    subtasks: [
      {
        text: String,
        done: Boolean,
      },
    ],
    userId: {
      type: String,
      required: [true, "User id is required"],
    },
  },
  { timestamps: true },
);

const ToDo = mongoose.model("Todo", todoSchema);

module.exports = ToDo;
