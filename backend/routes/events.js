const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const auth = require('../middlewares/auth');

// Require valid JWT for all event routes
router.use(auth);

// GET /events - List all events belonging to the logged-in organizer
router.get('/', eventController.listEvents);

// GET /events/:id - Get a single event by ID (must be owned by the logged-in organizer)
router.get('/:id', eventController.getEventById);

// POST /events - Create a new event for the logged-in organizer
router.post('/', eventController.createEvent);

// PATCH /events/:id - Update event details
router.patch('/:id', eventController.updateEvent);

module.exports = router;
