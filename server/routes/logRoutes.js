const express = require('express');
const router = express.Router();
const WorkLog = require('../models/WorkLog');

router.post('/', async (req, res) => {
  const newLog = new WorkLog(req.body);
  const saved = await newLog.save();
  res.json(saved);
});

router.get('/:userId', async (req, res) => {
  const logs = await WorkLog.find({ userId: req.params.userId });
  res.json(logs);
});

router.put('/:id', async (req, res) => {
  const updated = await WorkLog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  await WorkLog.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;