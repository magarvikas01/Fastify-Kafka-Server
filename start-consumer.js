require('dotenv').config();
require('dotenv').config({ path: '.env.influx' });
const KafkaInfluxConsumer = require('./consumers/kafka-influx.consumer');

async function startConsumer() {
    const consumer = new KafkaInfluxConsumer();

    process.on('SIGINT', async () => {
        console.log('Shutting down consumer...');
        await consumer.stop();
        process.exit(0);
    });

    try {
        await consumer.start();
    } catch (error) {
        console.error('Failed to start consumer:', error);
    }
}

startConsumer();