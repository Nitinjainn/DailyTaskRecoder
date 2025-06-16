const express = require('express');
const router = express.Router();
const Worklog = require('../models/WorkLog');

// Add new task log
router.post('/add', async (req, res) => {
  try {
    const {
      userId,
      date,
      title,
      todayWork,
      technicalDetails,
      problemsFaced,
      solutions,
      nextPlan,
      tags
    } = req.body;

    const log = new Worklog({
      userId,
      date,
      title,
      todayWork,
      technicalDetails,
      problemsFaced,
      solutions,
      nextPlan,
      tags
    });

    await log.save();
    res.status(201).json({ message: 'Task submitted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all logs (used in 'week' mode)
router.get('/', async (req, res) => {
  try {
    const logs = await Worklog.find().sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Existing route: Get logs by user ID
router.get('/:userId', async (req, res) => {
  try {
    const logs = await Worklog.find({ userId: req.params.userId }).sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
