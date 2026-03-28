const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const WasteSourcing      = require('../models/WasteSourcing');
const StorageRecord      = require('../models/StorageRecord');
const ProcessingRecord   = require('../models/ProcessingRecord');
const EnvMonitoringWaste = require('../models/EnvMonitoringWaste');
const SubstratePreparation = require('../models/SubstratePreparation');

router.post('/waste-sourcing', auth, async (req, res) => {
  try {
    const record = new WasteSourcing({ ...req.body, recordedBy: req.user.username });
    await record.save();
    res.status(201).json({ success: true, message: 'Waste sourcing data recorded successfully' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/waste-sourcing', auth, async (req, res) => {
  try {
    const records = await WasteSourcing.find().sort({ collectionDate: -1 });
    res.json(records);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/storage-records', auth, async (req, res) => {
  try {
    const record = new StorageRecord({ ...req.body, recordedBy: req.user.username });
    await record.save();
    res.status(201).json({ success: true, message: 'Storage record saved successfully' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/storage-records', auth, async (req, res) => {
  try {
    const records = await StorageRecord.find().sort({ storageDate: -1 });
    res.json(records);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/processing-records', auth, async (req, res) => {
  try {
    const record = new ProcessingRecord({ ...req.body, recordedBy: req.user.username });
    await record.save();
    res.status(201).json({ success: true, message: 'Processing record saved successfully' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/processing-records', auth, async (req, res) => {
  try {
    const records = await ProcessingRecord.find().sort({ processingDate: -1 });
    res.json(records);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/environmental-monitoring-waste', auth, async (req, res) => {
  try {
    const record = new EnvMonitoringWaste({ ...req.body, recordedBy: req.user.username });
    await record.save();
    res.status(201).json({ success: true, message: 'Environmental monitoring record saved successfully' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/environmental-monitoring', auth, async (req, res) => {
  try {
    const records = await EnvMonitoringWaste.find().sort({ monitoringDate: -1 });
    res.json(records);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/substrate-preparation', auth, async (req, res) => {
  try {
    const record = new SubstratePreparation(req.body);
    await record.save();
    res.status(201).json({ success: true, message: 'Substrate preparation record saved successfully' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
