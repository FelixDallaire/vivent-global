const express = require('express');
const router = express.Router();
const markerController = require('../controllers/markerController');
const auth = require('../middlewares/auth');

router.use(auth);

// POST /events/:id/markers - Add a new marker to a specific event owned by the logged-in organizer
router.post('/events/:id/markers', markerController.createMarker);

// GET /events/:id/markers - Get all markers for a specific event
router.get('/events/:id/markers', markerController.listMarkersForEvent);

// PATCH /markers/:markerId - Update a specific marker (e.g., changing its type)
router.patch('/markers/:markerId', markerController.updateMarker);

// PATCH /events/:id/markers - Update multiple markers at once
router.patch('/events/:id/markers', markerController.updateMultipleMarkers);

module.exports = router;
