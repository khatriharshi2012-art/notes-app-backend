const express = require('express');


const {createNote , getNote  , getNotebtId , deleteNote , updateNote } = require("../controllers/notes.controllers")
const { authenticate ,authorize} = require("../middleware/auth.middleware");

const router  =  express.Router();

router.post("/create-note" , authenticate , createNote);
router.post("/get-note" , getNote);
router.post("/get-note-id" , getNotebtId);
router.post("/delete-note" ,authenticate, deleteNote);
router.post("/update-note" ,authenticate, updateNote);

module.exports = router
