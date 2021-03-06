const config = {
  environment: process.env.NODE_ENV || 'dev',
  server: {
    port: process.env.PORT || 8080 //20375
  },
  mongo: {
    url: process.env.MONGO_DB_URI || 'mongodb://localhost/industryDB'
  }
};

module.exports = config;
