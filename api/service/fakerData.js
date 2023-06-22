const faker = require('faker');
const email = require('./email');

// Function to generate/simulate data for sensors with a 10% chance of abnormal values
function generateSensorData() {
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
          const humidityAbnormalValue = data[abnormalKey]; // expressed in %
          // !!! FOR TESTING PURPOSE ONLY : activate the next 2 lines !!!
          // data[abnormalKey] = 19;
          // const humidityAbnormalValue = data[abnormalKey]; // expressed in %
          if (humidityAbnormalValue < 20 || humidityAbnormalValue > 80) {
            email.sendEmail(subject, generateEmailMessage('humidity', `${data[abnormalKey]}`));
          }
          break;
        case 'noise':
          const noiseAbnormalRange = faker.datatype.number({ min: 80, max: 100 }); // expressed in dB
          data[abnormalKey] = Math.random() < 0.5 ? noiseAbnormalRange : -noiseAbnormalRange;
          email.sendEmail(subject, generateEmailMessage('noise', `${data[abnormalKey]}`));
          break;
        case 'pressure':
          const pressureAbnormalRange = faker.datatype.number({ min: 51, max: 100 }); // expressed in hPa
          data[abnormalKey] = Math.random() < 0.5 ? data.pressure + pressureAbnormalRange : data.pressure - pressureAbnormalRange;
          email.sendEmail(subject, generateEmailMessage('pressure', `${data[abnormalKey]}`));
          break;
        case 'temperature':
          const temperatureAbnormalRange = faker.datatype.number({ min: 5, max: 10 }); // expressed in °C
          data[abnormalKey] = Math.random() < 0.5 ? data.temperature + temperatureAbnormalRange : data.temperature - temperatureAbnormalRange;
          email.sendEmail(subject, generateEmailMessage('temperature', `${data[abnormalKey]}`));
          break;
        default:
          break;
      }
    }

    return JSON.stringify({ sensor: data });
  } catch (error) {
    return JSON.stringify({ error: 'An error occurred while generating sensor data.' });
  }
}

const subject = 'Alert - Abnormal Sensor Value Detected';
function generateEmailMessage(sensorName, abnormalValue) {
  const unit = getUnit(sensorName);
  
  const cssStyle = `
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
      border: 1px solid #dddddd;
    }

    h1 {
      color: #333333;
      margin: 0;
      padding-bottom: 20px;
    }

    p {
      color: #555555;
      margin: 0 0 20px;
    }

    .highlight {
      font-weight: bold;
      color: #ff0000;
    }
  `;

  const message = `<html>
    <head>
      <style>${cssStyle}</style>
    </head>
    <body>
      <div class="container">
        <h1>Abnormal Sensor Value Detected</h1>
        <p>An abnormal value has been detected for ${sensorName}:</p>
        <p><span class="highlight">${abnormalValue} ${unit}</span></p>
      </div>
    </body>
  </html>`;

  return message;
}

function getUnit(sensorName) {
  switch (sensorName) {
    case 'humidity':
      return '%';
    case 'noise':
      return 'dB';
    case 'pressure':
      return 'hPa';
    case 'temperature':
      return '°C';
    default:
      return '';
  }
}

module.exports = {
  generateSensorData
};
