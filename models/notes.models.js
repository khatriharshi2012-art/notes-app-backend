const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    isFavorite: {
      type: Boolean,
      default: false,
    },
    userId: String,
  },
  { timestamps: true },
);

const Notes = mongoose.model("Notes", notesSchema);

module.exports = Notes;
