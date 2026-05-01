const Notes = require("../models/notes.models");

exports.createNote = async (req, res) => {
  try {
    const { title, content , isFavorite } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        status: false,
        message: "title and content are required fields",
      });
    }

    const newNotes = await Notes.create({
      title,
      content,
      isFavorite,
      userId: req.user.id,
    });

    return res.status(201).json({
      status: true,
      message: "Notes created successfully",
      data: newNotes,
    });
  } catch (error) {
    console.log("createBlog error:", error);

    return res.status(500).json({
      status: false,
      message: error?.message || "Internal server error",
    });
  }
};

exports.getNote = async (req, res) => {
  try {
    const notes = await Notes.find({});

    if (notes) {
      return res.status(200).json({
        status: true,
        message: "Notes fetched successfully",
        data: notes,
      });
    }

    return res.status(200).json({
      status: true,
      message: "Notes Not found",
      data: [],
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error?.message || "Internal server error",
    });
  }
};

exports.getNotebtId = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(200).json({
        status: true,
        message: "Id is required",
      });
    }

    const result = await Notes.findById(id);

    if (result) {
      return res.status(200).json({
        status: true,
        message: "Notes Found by id.",
        data: result,
      });
    }

    return res.status(200).json({
      status: true,
      message: "Notes Not Found.",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error?.message || "Internal server error",
    });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.body;

    const notes = await Notes.findByIdAndDelete(id);

    if (notes) {
      return res.status(200).json({
        status: true,
        message: "Notes deleted succesfully.",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Notes Not Found.",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error?.message || "Internal server error",
    });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { id, ...updates } = req.body || {};

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Notes id is required",
      });
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        status: false,
        message: "At least one field is required to update the Notes",
      });
    }

    const notes = await Notes.findByIdAndUpdate(id, updates, {
      returnDocument: "after",
      runValidators: true,
    });

    if (notes) {
      return res.status(200).json({
        status: true,
        message: "Notes updated succesfully.",
        data: notes,
      });
    }

    return res.status(200).json({
      status: true,
      message: "Notes Not Found.",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error?.message || "Internal server error",
    });
  }
};
