const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const CageMonitoring     = require('../models/CageMonitoring');
const FacilityMaintenance = require('../models/FacilityMaintenance');
const PupaeTransition    = require('../models/PupaeTransition');
const EggCollection      = require('../models/EggCollection');
const BaitPreparation    = require('../models/BaitPreparation');

const save = (Model, msg) => async (req, res) => {
  try {
    const record = new Model({ ...req.body, recordedBy: req.user.username });
    await record.save();
    res.status(201).json({ success: true, message: msg });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

router.post('/cage-monitoring',   auth, save(CageMonitoring,     'Cage monitoring record saved'));
router.post('/maintenance',       auth, save(FacilityMaintenance,'Facility maintenance record saved'));
router.post('/pupae-transition',  auth, save(PupaeTransition,    'Pupae transition record saved'));
router.post('/egg-collection',    auth, save(EggCollection,      'Egg collection record saved'));
router.post('/bait-preparation',  auth, save(BaitPreparation,    'Bait preparation record saved'));

module.exports = router;
