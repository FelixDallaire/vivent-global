require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const markerRoutes = require('./routes/markers');

app.use('/auth', authRoutes);
app.use('/events', eventRoutes);
app.use(markerRoutes);

app.get('/', (req, res) => res.json({ message: 'Server running!' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
