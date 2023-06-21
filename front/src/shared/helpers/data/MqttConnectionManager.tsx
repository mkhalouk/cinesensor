import { IClientOptions, MqttClient } from 'mqtt';
import mqtt from "mqtt/dist/mqtt";

class MqttConnectionManager {
  private static instance: MqttConnectionManager;
  private client: MqttClient;
  private options: IClientOptions | any;
  private url?: string;

  private constructor(url?: string, options?: IClientOptions | any) {
    this.url = url;
    this.options = options || {};
    this.client = mqtt.connect(this.url || '', this.options);
  }

  static getInstance(url?: string, options?: IClientOptions | any): MqttConnectionManager {
    if (!MqttConnectionManager.instance) {
      MqttConnectionManager.instance = new MqttConnectionManager(url, options);
    }
    return MqttConnectionManager.instance;
  }

  getClient(): MqttClient {
    return this.client;
  }

  setClient(client: MqttClient): void {
    this.client = client;
  }

  getUrl(): string | undefined {
    return this.url;
  }

  setUrl(url: string): void {
    this.url = url;
    this.client = mqtt.connect(this.url || '', this.options);
  }

  connect(url: string, options?: IClientOptions | any): void {
    this.url = url;
    this.options = options || {};
    this.client = mqtt.connect(this.url || '', this.options);
  }

  disconnect(): void {
    this.client.end();
  }

  subscribe(topic: string, options?: any): void {
    this.client.subscribe(topic, options);
  }

  unsubscribe(topic: string): void {
    this.client.unsubscribe(topic);
  }

  publish(topic: string, message: string, options?: any): void {
    this.client.publish(topic, message, options);
  }


  handleEvent(event: string, callback: (...args: any) => void): void {
    this.client.on(event, callback);
  }

}

export default MqttConnectionManager;
