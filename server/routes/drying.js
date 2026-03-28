const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const DryingBatch          = require('../models/DryingBatch');
const DryingInput          = require('../models/DryingInput');
const DryingOutput         = require('../models/DryingOutput');
const DryingQualityControl = require('../models/DryingQualityControl');
const DryingReviewApproval = require('../models/DryingReviewApproval');

router.post('/batches', auth, async (req, res) => {
  try {
    const record = new DryingBatch(req.body);
    await record.save();
    res.status(201).json({ success: true, message: 'Drying batch saved', batchId: record.batchId });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/batches', auth, async (req, res) => {
  try {
    const records = await DryingBatch.find().sort({ dryingDate: -1 });
    res.json({ success: true, records });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/input', auth, async (req, res) => {
  try {
    const record = new DryingInput({ ...req.body, recordedBy: req.user.username });
    await record.save();
    res.status(201).json({ success: true, message: 'Drying input saved' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/input', auth, async (req, res) => {
  try {
    const records = await DryingInput.find().sort({ createdAt: -1 });
    res.json({ success: true, records });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/output', auth, async (req, res) => {
  try {
    const record = new DryingOutput({ ...req.body, recordedBy: req.user.username });
    await record.save();
    res.status(201).json({ success: true, message: 'Drying output saved' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/output', auth, async (req, res) => {
  try {
    const records = await DryingOutput.find().sort({ createdAt: -1 });
    res.json({ success: true, records });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/quality-control', auth, async (req, res) => {
  try {
    const record = new DryingQualityControl({ ...req.body, recordedBy: req.user.username });
    await record.save();
    res.status(201).json({ success: true, message: 'Quality control record saved' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/quality-control', auth, async (req, res) => {
  try {
    const records = await DryingQualityControl.find().sort({ qcDate: -1 });
    res.json({ success: true, records });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/review-approval', auth, async (req, res) => {
  try {
    const record = new DryingReviewApproval({ ...req.body, recordedBy: req.user.username });
    await record.save();
    res.status(201).json({ success: true, message: 'Review approval saved' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/review-approval', auth, async (req, res) => {
  try {
    const records = await DryingReviewApproval.find().sort({ reviewDate: -1 });
    res.json({ success: true, records });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
