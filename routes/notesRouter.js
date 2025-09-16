const express = require("express");
const Note = require("../models/note");

const noteRoute = express.Router();

noteRoute.get("/notes", async (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }

  try {
    const notes = await Note.find({ user: req.session.userId });
    res.render("notes", { notes });
  } catch (err) {
    res.status(500).send("Error Data not found");
  }
});

noteRoute.post("/create", async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).send("Title and content are required!");
  }
  if (!req.session.userId) {
    return res.redirect("/login");
  }

  try {
    const newNote = new Note({
      title,
      content,
      user: req.session.userId,
    });
    await newNote.save();
    res.redirect("/notes");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error cannot create file");
  }
});

noteRoute.get("/update/:id", async (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }

  try {
    const note = await Note.findById(req.params.id);

    if (!note || note.user.toString() !== req.session.userId) {
      return res.status(404).send("Note not found or unauthorized");
    }

    res.render("update", { note });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error: Could not fetch the note");
  }
});

noteRoute.post("/update/:id", async (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }

  const { title, content } = req.body;

  if (!title || !content) {
  }

  try {
    const note = await Note.findById(req.params.id);

    if (!note || note.user.toString() !== req.session.userId) {
      return res.status(404).send("Note not found or unauthorized");
    }

    note.title = title;
    note.content = content;
    await note.save();

    res.redirect("/notes");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error: Could not update the note");
  }
});

noteRoute.get("/delete/:id", async (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  try {
    const note = await Note.findById(req.params.id);

    if (!note || note.user.toString() !== req.session.userId) {
      return res.status(404).send("Note not found");
    }

    await note.deleteOne();
    res.redirect("/notes");
  } catch (err) {
    res.status(500).send("Error: Could not delete the note");
  }
});

module.exports = noteRoute;
