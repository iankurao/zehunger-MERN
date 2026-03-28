const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const WasteSourcing        = require('../models/WasteSourcing');
const StorageRecord        = require('../models/StorageRecord');
const ProcessingRecord     = require('../models/ProcessingRecord');
const EnvMonitoringWaste   = require('../models/EnvMonitoringWaste');
const EnvMonitoringLarvae  = require('../models/EnvMonitoringLarvae');
const SubstratePreparation = require('../models/SubstratePreparation');
const HealthIntervention   = require('../models/HealthIntervention');
const HarvestYield         = require('../models/HarvestYield');
const FeedingSchedule      = require('../models/FeedingSchedule');
const HatcheryBatch        = require('../models/HatcheryBatch');
const HatcheryFeeding      = require('../models/HatcheryFeeding');
const HatcheryMonitoring   = require('../models/HatcheryMonitoring');
const CageMonitoring       = require('../models/CageMonitoring');
const FacilityMaintenance  = require('../models/FacilityMaintenance');
const PupaeTransition      = require('../models/PupaeTransition');
const EggCollection        = require('../models/EggCollection');
const BaitPreparation      = require('../models/BaitPreparation');
const DryingBatch          = require('../models/DryingBatch');
const DryingInput          = require('../models/DryingInput');
const DryingOutput         = require('../models/DryingOutput');
const Customer             = require('../models/Customer');
const Sale                 = require('../models/Sale');
const Delivery             = require('../models/Delivery');
const CustomerFeedback     = require('../models/CustomerFeedback');

const makeRoute = (Model, sortField) => async (req, res) => {
  try {
    const records = await Model.find().sort({ [sortField]: -1 });
    res.json({ records, success: true });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

router.get('/waste-sourcing',       auth, makeRoute(WasteSourcing,       'collectionDate'));
router.get('/storage-records',      auth, makeRoute(StorageRecord,        'storageDate'));
router.get('/processing-records',   auth, makeRoute(ProcessingRecord,     'processingDate'));
router.get('/waste-env-monitoring', auth, makeRoute(EnvMonitoringWaste,   'monitoringDate'));
router.get('/larvae-env-monitoring',auth, makeRoute(EnvMonitoringLarvae,  'monitoringDate'));
router.get('/substrate-preparation',auth, makeRoute(SubstratePreparation, 'prepDate'));
router.get('/health-intervention',  auth, makeRoute(HealthIntervention,   'healthDate'));
router.get('/harvest-yield',        auth, makeRoute(HarvestYield,         'harvestDate'));
router.get('/feeding-schedule',     auth, makeRoute(FeedingSchedule,      'feedingDate'));
router.get('/hatchery-batches',     auth, makeRoute(HatcheryBatch,        'batchDate'));
router.get('/hatchery-feeding',     auth, makeRoute(HatcheryFeeding,      'feedingDate'));
router.get('/hatchery-monitoring',  auth, makeRoute(HatcheryMonitoring,   'monitoringDate'));
router.get('/cage-monitoring',      auth, makeRoute(CageMonitoring,       'monitoringDate'));
router.get('/facility-maintenance', auth, makeRoute(FacilityMaintenance,  'maintenanceDate'));
router.get('/pupae-transition',     auth, makeRoute(PupaeTransition,      'transitionDate'));
router.get('/egg-collection',       auth, makeRoute(EggCollection,        'collectionDate'));
router.get('/bait-preparation',     auth, makeRoute(BaitPreparation,      'startDate'));
router.get('/drying-batches',       auth, makeRoute(DryingBatch,          'dryingDate'));
router.get('/drying-input',         auth, makeRoute(DryingInput,          'createdAt'));
router.get('/drying-output',        auth, makeRoute(DryingOutput,         'createdAt'));
router.get('/customers',            auth, makeRoute(Customer,             'name'));

router.get('/sales', auth, async (req, res) => {
  try {
    const records = await Sale.find().populate('customerId', 'name').sort({ date: -1 });
    res.json({ records, success: true });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/deliveries', auth, async (req, res) => {
  try {
    const records = await Delivery.find().populate('customerId', 'name').sort({ date: -1 });
    res.json({ records, success: true });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/feedback', auth, async (req, res) => {
  try {
    const records = await CustomerFeedback.find().populate('customerId', 'name').sort({ date: -1 });
    res.json({ records, success: true });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
