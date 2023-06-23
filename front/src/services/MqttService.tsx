import MqttConnectionManager from "../shared/helpers/data/MqttConnectionManager";

const PROTOCOL = import.meta.env.VITE_MQTT_PROTOCOL_PREFIX;
const USERNAME = import.meta.env.VITE_MQTT_USERNAME_PREFIX;
const PASSWORD = import.meta.env.VITE_MQTT_PASSWORD_PREFIX;
const HOST = import.meta.env.VITE_MQTT_HOST_PREFIX;
const PORT = import.meta.env.VITE_MQTT_PORT_PREFIX;
const RESOURCE = import.meta.env.VITE_MQTT_RESOURCE_PREFIX;
const TOPIC = import.meta.env.VITE_MQTT_TOPIC_PREFIX


class MqttService {
    async initMqttClient() : Promise<MqttConnectionManager> {
        const options = {
            protocol: PROTOCOL,
            username: USERNAME,
            password: PASSWORD,
            wsOptions: {
                host: HOST,
                protocol: PROTOCOL,
                rejectUnauthorized: false, // Disable SSL/TLS certificate validation
            },
        };
        return MqttConnectionManager.getInstance(
            `${PROTOCOL}://${HOST}:${PORT}/${RESOURCE}`,
            options
        );
    }

    async connect() {
        const mqttConnetionManager = await this.initMqttClient();
        mqttConnetionManager.handleEvent('connect', () => console.log('Client connected'))
    }

    async subscribe() {
        const mqttConnetionManager = await this.initMqttClient();
        mqttConnetionManager.subscribe(TOPIC)
    }

    async onMessage(__callback : (...args: any) => void) {
        const mqttConnetionManager = await this.initMqttClient();
        mqttConnetionManager.handleEvent('message', __callback);
    }
}

export default MqttService;
