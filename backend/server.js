require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const patientRoutes = require('./routes/patients');
const authRoutes = require('./routes/auth');
const summarizeRoutes = require('./routes/summarize');


const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/patients', patientRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/summarize', summarizeRoutes);


mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(5000, () => {
    console.log('🚀 Server running on http://localhost:5000');
  });
})
.catch(err => console.error('MongoDB connection error:', err));
