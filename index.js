const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
dotenv.config();

const dbo = require('./connections');
const api = require('./api');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

// Global error handling
app.use(function (err, _req, res) {
  console.error(err);
  res();
});

app.use('/api/income',api);
app.use('/api/expense',api);

dbo.connectToServer(function (err) {
  if (err) {
    process.exit();
  }

  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});