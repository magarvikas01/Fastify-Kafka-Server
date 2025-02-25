const { Kafka } = require('kafkajs');

class MessageService {
    constructor(fastify) {
      // console.log("Fast    ",fastify.kafkaProducer);
      if (!fastify.kafkaProducer) {
        throw new Error('Kafka producer not initialized');
      }
      this.kafkaProducer = fastify.kafkaProducer;
    }
  
    async sendMessage(message, topic = 'messages') {
        try {
            const result = await this.kafkaProducer.send({
                topic,
                messages: [{ value: JSON.stringify(message) }],
            });
            return result;
        } catch (error) {
            console.error('Failed to send message to Kafka:', error);
            throw error;
        }
    }
}

module.exports = MessageService;