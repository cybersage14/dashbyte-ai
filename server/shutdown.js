const shutdown = (server, client) => {
    process.on('SIGINT', async () => {
      console.log('Server is shutting down...');
      await client.close();
      server.close(() => {
        console.log('Server has shut down');
        process.exit(0);
      });
    });
  };
  
  module.exports = shutdown;
  