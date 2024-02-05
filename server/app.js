const express= require('express')
const app= express();
const db= require('../server/config/db')
const cors = require('cors');
const bodyParser = require('body-parser');
const port=4000;
const todoRoute=require('../server/route/todoRoutes')
app.use(cors());
app.use(bodyParser.json());

app.use('/api',todoRoute)
async function startApp() {
    try {
  
    db.connect()
      app.listen(port, () => {
        console.log(`Server is up and running at ${port}`);
      });
     
  
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
      process.exit(1);
    }
  }
  
  startApp()

module.exports = app;
