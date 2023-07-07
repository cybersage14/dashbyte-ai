require('dotenv').config({ path: '.env.local' });

module.exports = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || 'default',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017',
};
