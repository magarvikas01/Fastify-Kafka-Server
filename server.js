const buildApp = require('./app');

async function start() {
  try {
    const app = await buildApp();
    const port = process.env.PORT || 3000;
    // const host = '0.0.0.0';  // Listen on all network interfaces

    await app.listen({ port });
    app.log.info(`Server is running on http://:${port}`);
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
}

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
  process.exit(1);
});

start();
