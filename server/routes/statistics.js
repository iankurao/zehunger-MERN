const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ProcessingRecord   = require('../models/ProcessingRecord');
const EnvMonitoringWaste = require('../models/EnvMonitoringWaste');
const FeedingSchedule    = require('../models/FeedingSchedule');
const WasteSourcing      = require('../models/WasteSourcing');
const HarvestYield       = require('../models/HarvestYield');
const EggCollection      = require('../models/EggCollection');
const Sale               = require('../models/Sale');
const User               = require('../models/User');
const DryingOutput       = require('../models/DryingOutput');

router.get('/waste-processing', auth, async (req, res) => {
  try {
    const stats = await ProcessingRecord.aggregate([
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$processingDate' } }, totalProcessed: { $sum: '$wasteProcessed' } } },
      { $sort: { _id: -1 } }, { $limit: 30 },
      { $project: { date: '$_id', totalProcessed: 1, _id: 0 } }
    ]);
    res.json(stats);
  } catch (err) { res.status(500).json([]); }
});

router.get('/environmental', auth, async (req, res) => {
  try {
    const stats = await EnvMonitoringWaste.aggregate([
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$monitoringDate' } }, avgTemp: { $avg: '$temperature' }, avgHumidity: { $avg: '$humidity' } } },
      { $sort: { _id: -1 } }, { $limit: 30 },
      { $project: { date: '$_id', avgTemp: 1, avgHumidity: 1, _id: 0 } }
    ]);
    res.json(stats);
  } catch (err) { res.status(500).json([]); }
});

router.get('/system-efficiency', auth, async (req, res) => {
  try {
    const [wasteResult] = await WasteSourcing.aggregate([{ $group: { _id: null, total: { $sum: '$wasteWeight' } } }]);
    const [larvaeResult] = await HarvestYield.aggregate([{ $group: { _id: null, total: { $sum: '$larvaeCollected' } } }]);
    const processingCount = await ProcessingRecord.countDocuments();
    const totalWasteIn   = wasteResult?.total || 0;
    const totalLarvaeOut = larvaeResult?.total || 0;
    res.json({ totalWasteIn, totalLarvaeOut, totalProcessingRecords: processingCount, overallEfficiency: totalWasteIn > 0 ? totalLarvaeOut / totalWasteIn : 0 });
  } catch (err) { res.status(500).json({}); }
});

router.get('/daily-report', auth, async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay   = new Date(startOfDay.getTime() + 86400000);
    const dateFilter = { $gte: startOfDay, $lt: endOfDay };
    const [[waste], [larvae], [feed], [eggs]] = await Promise.all([
      WasteSourcing.aggregate([{ $match: { collectionDate: dateFilter } }, { $group: { _id: null, total: { $sum: '$wasteWeight' } } }]),
      HarvestYield.aggregate([{ $match: { harvestDate: dateFilter } }, { $group: { _id: null, total: { $sum: '$larvaeCollected' } } }]),
      FeedingSchedule.aggregate([{ $match: { feedingDate: dateFilter } }, { $group: { _id: null, total: { $sum: '$feedQuantity' } } }]),
      EggCollection.aggregate([{ $match: { collectionDate: dateFilter } }, { $group: { _id: null, total: { $sum: '$eggsCollected' } } }]),
    ]);
    res.json({ wasteSourcedToday: waste?.total || 0, larvaeHarvestedToday: larvae?.total || 0, feedGivenToday: feed?.total || 0, eggsCollectedToday: eggs?.total || 0 });
  } catch (err) { res.status(500).json({}); }
});

router.get('/overview', auth, async (req, res) => {
  try {
    const [totalFarmers, activeFarmers, wasteResult, driedResult, salesResult, harvestResult] = await Promise.all([
      User.countDocuments({ role: { $ne: 'super_admin' } }),
      User.countDocuments({ role: { $ne: 'super_admin' }, isActive: true }),
      WasteSourcing.aggregate([{ $group: { _id: null, total: { $sum: '$wasteWeight' } } }]),
      DryingOutput.aggregate([{ $group: { _id: null, total: { $sum: '$driedProducedKg' } } }]),
      Sale.aggregate([{ $group: { _id: null, total: { $sum: '$amount' } } }]),
      HarvestYield.aggregate([{ $group: { _id: null, total: { $sum: '$larvaeCollected' } } }]),
    ]);
    res.json({ success: true, data: {
      total_farmers: totalFarmers, active_farmers: activeFarmers,
      total_waste_kg: wasteResult[0]?.total || 0, total_dried_kg: driedResult[0]?.total || 0,
      total_revenue: salesResult[0]?.total || 0, total_harvest_kg: harvestResult[0]?.total || 0
    }});
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
