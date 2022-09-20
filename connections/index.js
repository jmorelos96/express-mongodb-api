const { MongoClient } = require('mongodb');
const connectionString = process.env.MONGO_HOST;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer:  (callback) => {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db(process.env.MONGO_DB);
      console.log('Successfully connected to MongoDB.');

      return callback();
    });
  },

  getDb:  () => {
    return dbConnection;
  },
};