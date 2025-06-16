const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logRoutes = require('./routes/logRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());


const MONGO_URI = 'mongodb://localhost:27017/worklogdb'; // or your Atlas URI

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/logs', logRoutes);
app.use('/api/auth', authRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
