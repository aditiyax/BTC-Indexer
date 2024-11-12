const express = require('express')
const mongoose = require('mongoose');
const apiRoutes = require('./src/api/routes/index');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL)
         .then(()=> console.log('MongoDb Connected'))
         .catch(err => console.log("Failed to Connect to MongoDB", err));

         app.use(express.json());
         app.use('/api', apiRoutes);

         app.listen(PORT, ()=> {
            console.log(`Server running on port ${PORT}`);
         });