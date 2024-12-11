// app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Import route files
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const markerRoutes = require('./routes/markers');

// Use the routes
app.use('/auth', authRoutes);
app.use('/events', eventRoutes);
app.use(markerRoutes); // markers route does not have a prefix, but routes are /events/:id/markers and /markers/:markerId

app.get('/', (req, res) => res.json({ message: 'Server running!' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
