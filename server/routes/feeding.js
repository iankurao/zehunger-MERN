const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const EnvMonitoringLarvae = require('../models/EnvMonitoringLarvae');
const HealthIntervention  = require('../models/HealthIntervention');
const HarvestYield        = require('../models/HarvestYield');
const FeedingSchedule     = require('../models/FeedingSchedule');

router.post('/feeding/environmental-monitoring', auth, async (req, res) => {
  try {
    const record = new EnvMonitoringLarvae({ ...req.body, recordedBy: req.user.username });
    await record.save();
    res.status(201).json({ success: true, message: 'Larvae environmental monitoring saved' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/environmental-monitoring-larvaefeeding', auth, async (req, res) => {
  try {
    const record = new EnvMonitoringLarvae({ ...req.body, recordedBy: req.user.username });
    await record.save();
    res.status(201).json({ success: true, message: 'Larvae environmental monitoring saved' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/feeding/health-intervention', auth, async (req, res) => {
  try {
    const record = new HealthIntervention({ ...req.body, recordedBy: req.user.username });
    await record.save();
    res.status(201).json({ success: true, message: 'Health intervention record saved' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/health-intervention', auth, async (req, res) => {
  try {
    const record = new HealthIntervention({ ...req.body, recordedBy: req.user.username });
    await record.save();
    res.status(201).json({ success: true, message: 'Health intervention record saved' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/feeding/harvest-yield', auth, async (req, res) => {
  try {
    const record = new HarvestYield({ ...req.body, recordedBy: req.user.username });
    await record.save();
    res.status(201).json({ success: true, message: 'Harvest yield record saved' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/harvest-yield', auth, async (req, res) => {
  try {
    const record = new HarvestYield({ ...req.body, recordedBy: req.user.username });
    await record.save();
    res.status(201).json({ success: true, message: 'Harvest yield record saved' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/feeding/schedule', auth, async (req, res) => {
  try {
    const record = new FeedingSchedule({ ...req.body, recordedBy: req.user.username });
    await record.save();
    res.status(201).json({ success: true, message: 'Feeding schedule saved' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/larvae-feeding', auth, async (req, res) => {
  try {
    const record = new FeedingSchedule({ ...req.body, recordedBy: req.user.username });
    await record.save();
    res.status(201).json({ success: true, message: 'Larvae feeding record saved' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
