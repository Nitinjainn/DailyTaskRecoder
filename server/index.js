require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logRoutes = require('./routes/logRoutes');

const app = express();

// ✅ Configure CORS properly
app.use(cors({
  origin: "https://stpitasks.vercel.app", // only allow your frontend
  credentials: true // set true if you're using cookies or auth
}));

app.use(express.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Routes
app.use('/api/logs', logRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
