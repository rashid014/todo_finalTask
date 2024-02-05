require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
const connectionString = process.env.DATABASE;

function connect() {
  mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connection established successfully');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error.message);
    });
}

module.exports = {
  connect
};
