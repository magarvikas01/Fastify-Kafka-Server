const { Kafka } = require('kafkajs');
const InfluxService = require('../services/influx.service');

class KafkaInfluxConsumer {
    constructor() {
        this.kafka = new Kafka({
            clientId: 'kafka-influx-consumer',
            brokers: [process.env.KAFKA_BROKER || 'localhost:29092']
        });
        this.consumer = this.kafka.consumer({ groupId: 'influx-consumer-group' });
        this.influxService = new InfluxService();
    }

    async start() {
        await this.consumer.connect();
        await this.consumer.subscribe({ topic: 'messages', fromBeginning: true });

        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const messageValue = JSON.parse(message.value.toString());
                await this.influxService.writeMessage(messageValue);
            }
        });
    }

    async stop() {
        await this.consumer.disconnect();
        await this.influxService.disconnect();
    }
}

module.exports = KafkaInfluxConsumer;