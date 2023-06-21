const SensorData = require('../model/sensorDataModel');

// Controller to retrieve all sensor data
async function getAllSensorData(req, res) {
  try {
    const sensorData = await SensorData.find();
    res.status(200).json(sensorData);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving sensor data.' });
  }
}

// Controller to save sensor data from MQTT message
async function saveSensorDataFromMQTT(req, res) {
  try {
    const sensorDataReceived = req.body.message.sensor;
    // Map the values to the corresponding fields of the SensorData model
    const sensorData = new SensorData({
      humidity: sensorDataReceived.humidity,
      noise: sensorDataReceived.noise,
      pressure: sensorDataReceived.pressure,
      temperature: sensorDataReceived.temperature,
    });

    // Save the sensor data to the database
    await sensorData.save();

    // Get the count of all records
    const recordCount = await SensorData.countDocuments();

    // If the count exceeds 12, delete the oldest record(s)
    if (recordCount > 12) {
      const oldestRecords = await SensorData.find().sort({ createdAt: 1 }).limit(recordCount - 12);
      await SensorData.deleteMany({ _id: { $in: oldestRecords.map(record => record._id) } });
    }

    res.status(200).json({ message: 'Sensor data saved successfully.' });
  } catch (error) {
    console.error('Error saving sensor data from MQTT:', error);
    res.status(500).json({ message: 'Error saving sensor data.' });
  }
}

// Controller to retrieve the last 12 sensor data records
async function getLast12SensorData(req, res) {
  try {
    const sensorData = await SensorData.find().sort({ _id: -1 }).limit(12);
    res.status(200).json(sensorData);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the last 12 sensor data records.' });
  }
}

module.exports = {
  getAllSensorData,
  saveSensorDataFromMQTT,
  getLast12SensorData
};
