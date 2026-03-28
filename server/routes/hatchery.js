const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const HatcheryBatch      = require('../models/HatcheryBatch');
const HatcheryFeeding    = require('../models/HatcheryFeeding');
const HatcheryMonitoring = require('../models/HatcheryMonitoring');
const HatcheryCleaning   = require('../models/HatcheryCleaning');
const HatcheryProblem    = require('../models/HatcheryProblem');

router.post('/batch-information', auth, async (req, res) => {
  try {
    const record = new HatcheryBatch(req.body);
    await record.save();
    res.status(201).json({ success: true, message: 'Hatchery batch information saved' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/batch', auth, async (req, res) => {
  try {
    const record = new HatcheryBatch(req.body);
    await record.save();
    res.status(201).json({ success: true, message: 'Hatchery batch saved' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/batches', auth, async (req, res) => {
  try {
    const records = await HatcheryBatch.find().sort({ batchDate: -1 });
    res.json({ success: true, records });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/feeding-records', auth, async (req, res) => {
  try {
    const record = new HatcheryFeeding(req.body);
    await record.save();
    res.status(201).json({ success: true, message: 'Hatchery feeding record saved' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/feeding', auth, async (req, res) => {
  try {
    const record = new HatcheryFeeding(req.body);
    await record.save();
    res.status(201).json({ success: true, message: 'Hatchery feeding saved' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/environmental-monitoring', auth, async (req, res) => {
  try {
    const record = new HatcheryMonitoring(req.body);
    await record.save();
    res.status(201).json({ success: true, message: 'Hatchery environmental monitoring saved' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/monitoring', auth, async (req, res) => {
  try {
    const record = new HatcheryMonitoring(req.body);
    await record.save();
    res.status(201).json({ success: true, message: 'Hatchery monitoring saved' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/cleaning', auth, async (req, res) => {
  try {
    const record = new HatcheryCleaning(req.body);
    await record.save();
    res.status(201).json({ success: true, message: 'Hatchery cleaning record saved' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/problems', auth, async (req, res) => {
  try {
    const record = new HatcheryProblem(req.body);
    await record.save();
    res.status(201).json({ success: true, message: 'Hatchery problem record saved' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
