const { Kafka, Partitioners } = require('kafkajs');

function createKafkaConfig() {
  const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID || 'fastify-kafka-app',
    brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
  });

  const producer = kafka.producer({
    allowAutoTopicCreation: true,
    createPartitioner: Partitioners.LegacyPartitioner
  });

  return { kafka, producer };
}

module.exports = createKafkaConfig;