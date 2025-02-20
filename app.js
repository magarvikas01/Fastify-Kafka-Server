const fastify = require('fastify')({ logger: true });
const path = require('path');
require('dotenv').config();

async function buildApp() {
  // Register plugins
  await fastify.register(require('@fastify/env'), {
    schema: {
      type: 'object',
      required: ['KAFKA_BROKER', 'PORT'],
      properties: {
        KAFKA_BROKER: { type: 'string' },
        KAFKA_CLIENT_ID: { type: 'string', default: 'fastify-kafka-app' },
        PORT: { type: 'number', default: 3000 },
      },
    },
    dotenv: true,
  });

  await fastify.register(require('./plugins/kafka.plugin'));

  // Register services
  fastify.decorate('messageService', require('./services/message.service'));

  // Register routes
  await fastify.register(require('./routes/message.route'), { prefix: '/api' });
 
  return fastify;
}

module.exports = buildApp;