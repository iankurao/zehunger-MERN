const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const WasteSourcing      = require('../models/WasteSourcing');
const StorageRecord      = require('../models/StorageRecord');
const ProcessingRecord   = require('../models/ProcessingRecord');
const EnvMonitoringWaste = require('../models/EnvMonitoringWaste');
const HarvestYield       = require('../models/HarvestYield');
const FeedingSchedule    = require('../models/FeedingSchedule');
const CageMonitoring     = require('../models/CageMonitoring');
const EggCollection      = require('../models/EggCollection');

const MODEL_MAP = {
  waste: [
    { model: WasteSourcing,    dateField: 'collectionDate',  name: 'Waste Sourcing' },
    { model: StorageRecord,    dateField: 'storageDate',     name: 'Storage Records' },
    { model: ProcessingRecord, dateField: 'processingDate',  name: 'Processing Records' },
    { model: EnvMonitoringWaste, dateField: 'monitoringDate', name: 'Env Monitoring (Waste)' },
  ],
  feeding: [
    { model: HarvestYield,    dateField: 'harvestDate',  name: 'Harvest Yield' },
    { model: FeedingSchedule, dateField: 'feedingDate',  name: 'Feeding Schedule' },
  ],
  facility: [
    { model: CageMonitoring, dateField: 'monitoringDate', name: 'Cage Monitoring' },
    { model: EggCollection,  dateField: 'collectionDate', name: 'Egg Collection' },
  ],
};

router.get('/', auth, async (req, res) => {
  try {
    const { date, section } = req.query;
    if (!date) return res.status(400).json({ success: false, message: 'Date is required' });
    const dayStart = new Date(date);
    const dayEnd   = new Date(date);
    dayEnd.setDate(dayEnd.getDate() + 1);

    const targets = section && MODEL_MAP[section] ? MODEL_MAP[section] : Object.values(MODEL_MAP).flat();
    const results = {};

    await Promise.all(targets.map(async ({ model, dateField, name }) => {
      const records = await model.find({ [dateField]: { $gte: dayStart, $lt: dayEnd } }).lean();
      if (records.length > 0) results[name] = records;
    }));

    res.json({ success: true, records: results });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
