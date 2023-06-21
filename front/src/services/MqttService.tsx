import MqttConnectionManager from "../shared/helpers/data/MqttConnectionManager";
import { isJsonString } from "../shared/utils/JsonReader";

class MqttService {
    async initMqttClient() {
        const options = {
            protocol: 'wss',
            username: 'mkhalouk',
            password: 'mkhalouk',
            wsOptions: {
                host: 'fce85f7acde44e06b48fc42411abf0e8.s2.eu.hivemq.cloud',
                protocol: 'wss',
                rejectUnauthorized: false, // Disable SSL/TLS certificate validation
            },
        };
        const mqttConnetionManager: MqttConnectionManager = MqttConnectionManager.getInstance(
            'wss://fce85f7acde44e06b48fc42411abf0e8.s2.eu.hivemq.cloud:8884/mqtt',
            options
        );
        mqttConnetionManager.handleEvent('connect', () => console.log('Client connected'))
        mqttConnetionManager.subscribe('cinesensor/sensorsdata')
        mqttConnetionManager.handleEvent('message', (_topic, message) => {
            (isJsonString(message) ? console.log(JSON.parse(message)) : console.log('Message is not an object')) 
        })
    }
}

export default MqttService;
