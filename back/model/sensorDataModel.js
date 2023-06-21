const mongoose = require('mongoose');

const sensorDataSchema = new mongoose.Schema({
  humidity: {
    type: Number,
  },
  noise: {
    type: Number,
  },
  pressure: {
    type: Number,
  },
  temperature: {
    type: Number,
  },
}, { timestamps: true, collection: 'sensordata' });

const SensorData = mongoose.model('SensorData', sensorDataSchema);

module.exports = SensorData;
