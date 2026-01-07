const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { nanoid } = require('nanoid');

// POST: Save a new project and return a shortId
router.post('/share', async (req, res) => {
  try {
    const { files } = req.body;
    const shortId = nanoid(10); // Generates a 10-char ID

    const newProject = new Project({
      shortId,
      files
    });

    await newProject.save();
    res.status(201).json({ id: shortId });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// GET: Retrieve a project by shortId
router.get('/project/:id', async (req, res) => {
  try {
    const project = await Project.findOne({ shortId: req.params.id });
    if (!project) return res.status(404).json({ message: "Project not found" });
    
    res.json(project.files);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;