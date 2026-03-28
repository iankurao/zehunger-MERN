const express = require('express');
const cors    = require('cors');
const path    = require('path');

const authRoutes       = require('./routes/auth');
const wasteRoutes      = require('./routes/waste');
const feedingRoutes    = require('./routes/feeding');
const hatcheryRoutes   = require('./routes/hatchery');
const facilityRoutes   = require('./routes/facility');
const flyFacilityRoutes = require('./routes/flyfacility');
const dryingRoutes     = require('./routes/drying');
const salesRoutes      = require('./routes/sales');
const analyticsRoutes  = require('./routes/analytics');
const statisticsRoutes = require('./routes/statistics');
const recordsRoutes    = require('./routes/records');
const adminRoutes      = require('./routes/admin');
const errorHandler     = require('./middleware/errorHandler');

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || true,
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth',         authRoutes);
app.use('/api',              wasteRoutes);
app.use('/api',              feedingRoutes);
app.use('/api/hatchery',     hatcheryRoutes);
app.use('/api/facility',     facilityRoutes);
app.use('/api/fly-facility', flyFacilityRoutes);
app.use('/api/drying',       dryingRoutes);
app.use('/api',              salesRoutes);
app.use('/api/analytics',    analyticsRoutes);
app.use('/api/statistics',   statisticsRoutes);
app.use('/api/records',      recordsRoutes);
app.use('/api/admin',        adminRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

app.use(errorHandler);

module.exports = app;
