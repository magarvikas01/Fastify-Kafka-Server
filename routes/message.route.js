async function messageRoutes(fastify) {
    const messageService = new fastify.messageService(fastify);

    fastify.post('/messages', {
        schema: {
            body: {
                type: 'object',
                required: ['content'],
                properties: {
                    content: { type: 'string' }
                }
            }
        },
        handler: async (request, reply) => {
            try {
                const result = await messageService.sendMessage(request.body);
                return result;
            } catch (error) {
                fastify.log.error(error);
                reply.code(500).send({ 
                    error: error.message,
                    topic: 'messages'
                });
            }
        }
    });
}

module.exports = messageRoutes;