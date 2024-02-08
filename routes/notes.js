// routes/notes.js
const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// Get all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new note
router.post("/", async (req, res) => {
  const note = new Note({
    title: req.body.title,
    content: req.body.content,
  });

  try {
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (deletedNote) {
      res.status(200).json({
        message: `Note with id ${req.params.id} deleted successfully`,
      });
    } else {
      res
        .status(404)
        .json({ message: `Note with id ${req.params.id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
