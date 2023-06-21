const faker = require('faker');

async function checkApi(req, res) {
  res.status(200).json({ message: "API status: online!" });
}

// Function to generate/simulate data for sensors with a 10% chance of abnormal values
async function generateSensorData(req, res) {
  try {
    const data = {
      humidity: null,
      noise: null,
      pressure: null,
      temperature: null
    };

    // Generate random values
    data.humidity = faker.datatype.number({ min: 20, max: 80 });
    data.noise = faker.datatype.number({ min: 40, max: 70 });
    data.pressure = faker.datatype.number({ min: 950, max: 1050 });
    data.temperature = faker.datatype.number({ min: 20, max: 30 });

    // Generate abnormal value with a 10% chance
    if (Math.random() <= 0.1) {
      const abnormalKey = faker.random.arrayElement(['humidity', 'noise', 'pressure', 'temperature']);

      // Adjust the abnormal value based on the specific factor
      switch (abnormalKey) {
        case 'humidity':
          const humidityAbnormalRange = faker.datatype.number({ min: 0, max: 100 }); // expressed in %
          data[abnormalKey] = Math.random() < 0.5 ? humidityAbnormalRange : -humidityAbnormalRange;
          break;
        case 'noise':
          const noiseAbnormalRange = faker.datatype.number({ min: 80, max: 100 }); // expressed in dB
          data[abnormalKey] = Math.random() < 0.5 ? noiseAbnormalRange : -noiseAbnormalRange;
          break;
        case 'pressure':
          const pressureAbnormalRange = faker.datatype.number({ min: 51, max: 100 }); // expressed in hPa
          data[abnormalKey] = Math.random() < 0.5 ? data.pressure + pressureAbnormalRange : data.pressure - pressureAbnormalRange;
          break;
        case 'temperature':
          const temperatureAbnormalRange = faker.datatype.number({ min: 5, max: 10 }); // expressed in °C
          data[abnormalKey] = Math.random() < 0.5 ? data.temperature + temperatureAbnormalRange : data.temperature - temperatureAbnormalRange;
          break;
        default:
          break;
      }
    }

    res.status(200).json({ sensor: data });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while generating sensor data.' });
  }
}

module.exports = {
  checkApi,
  generateSensorData,
};