const fp = require('fastify-plugin');
const createKafkaConfig = require('../config/kafka.config');

async function kafkaPlugin(fastify, options) {
  const { producer } = createKafkaConfig();
  
  try {
    await producer.connect();
    fastify.log.info('Successfully connected to Kafka');
    fastify.decorate('kafkaProducer', producer);
    
    fastify.addHook('onClose', async (instance) => {
      fastify.log.info('Disconnecting Kafka producer');
      await producer.disconnect();
    });
  } catch (error) {
    fastify.log.error(`Kafka connection error: ${error.message}`);
    throw error;
  }
}

module.exports = fp(kafkaPlugin);