import MqttConnectionManager from "../shared/helpers/data/MqttConnectionManager";
import { isJsonString } from "../shared/utils/JsonReader";

class MqttService {
    async initMqttClient() : Promise<MqttConnectionManager> {
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
        return MqttConnectionManager.getInstance(
            'wss://fce85f7acde44e06b48fc42411abf0e8.s2.eu.hivemq.cloud:8884/mqtt',
            options
        );
    }

    async connect() {
        const mqttConnetionManager = await this.initMqttClient();
        mqttConnetionManager.handleEvent('connect', () => console.log('Client connected'))
    }

    async subscribe() {
        const mqttConnetionManager = await this.initMqttClient();
        mqttConnetionManager.subscribe('cinesensor/sensorsdata')
    }

    async onMessage(__callback : (...args: any) => void) {
        const mqttConnetionManager = await this.initMqttClient();
        mqttConnetionManager.handleEvent('message', __callback);
    }
}

export default MqttService;
