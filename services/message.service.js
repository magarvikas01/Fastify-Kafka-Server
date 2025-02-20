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
          messages: [{ 
            value: JSON.stringify(message),
            timestamp: Date.now().toString()
          }],
          
        });

        return { 
          success: true, 
          message: 'Message sent to Kafka',
          metadata: result 
        };
      } catch (error) {
        console.error('Kafka error:', error);
        throw new Error(`Failed to send message to Kafka: ${error.message}`);
      }
    }

   
    async disconnect() {
      try {
        await this.kafkaProducer.disconnect();
      } catch (error) {
        console.error('Error disconnecting from Kafka:', error);
      }
    }
}

module.exports = MessageService;