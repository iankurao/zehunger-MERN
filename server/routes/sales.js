const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Customer        = require('../models/Customer');
const Sale            = require('../models/Sale');
const Delivery        = require('../models/Delivery');
const CustomerFeedback = require('../models/CustomerFeedback');

router.post('/customers', auth, async (req, res) => {
  try {
    const record = new Customer(req.body);
    await record.save();
    res.status(201).json({ success: true, message: 'Customer created', customer: record });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/customers', auth, async (req, res) => {
  try {
    const records = await Customer.find().sort({ name: 1 });
    res.json({ success: true, customers: records });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/sales', auth, async (req, res) => {
  try {
    const record = new Sale(req.body);
    await record.save();
    res.status(201).json({ success: true, message: 'Sale record saved' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/sales', auth, async (req, res) => {
  try {
    const records = await Sale.find().populate('customerId', 'name').sort({ date: -1 });
    res.json({ success: true, sales: records });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/deliveries', auth, async (req, res) => {
  try {
    const record = new Delivery(req.body);
    await record.save();
    res.status(201).json({ success: true, message: 'Delivery record saved' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/deliveries', auth, async (req, res) => {
  try {
    const records = await Delivery.find().populate('customerId', 'name').sort({ date: -1 });
    res.json({ success: true, deliveries: records });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/customer-feedback', auth, async (req, res) => {
  try {
    const record = new CustomerFeedback(req.body);
    await record.save();
    res.status(201).json({ success: true, message: 'Feedback saved' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/customer-feedback', auth, async (req, res) => {
  try {
    const records = await CustomerFeedback.find().populate('customerId', 'name').sort({ date: -1 });
    res.json({ success: true, feedback: records });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
