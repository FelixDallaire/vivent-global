const Marker = require('../models/Marker');
const Event = require('../models/Event');

module.exports = {
  // POST /events/:id/markers
  // Add a new marker to the given event, checking that the event belongs to the logged-in organizer
  createMarker: async (req, res) => {
    try {
      const { id } = req.params;
      const { x, y, type } = req.body;

      const event = await Event.findOne({ _id: id, organizerId: req.user.userId });
      if (!event) {
        return res.status(404).json({ message: 'Event not found or not owned by you' });
      }

      if (x == null || y == null || !type) {
        return res.status(400).json({ message: 'x, y, and type are required' });
      }

      const marker = new Marker({ eventId: event._id, x, y, type });
      await marker.save();
      res.status(201).json(marker);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // GET /events/:id/markers
  // List all markers for the given event, ensuring it belongs to the logged-in organizer
  listMarkersForEvent: async (req, res) => {
    try {
      const { id } = req.params;
      const event = await Event.findOne({ _id: id, organizerId: req.user.userId });
      if (!event) {
        return res.status(404).json({ message: 'Event not found or not owned by you' });
      }

      const markers = await Marker.find({ eventId: event._id });
      res.json(markers);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // PATCH /markers/:markerId
  // Update a single marker, ensuring the marker's event is owned by the logged-in organizer
  updateMarker: async (req, res) => {
    try {
      const { markerId } = req.params;
      const { x, y, type } = req.body;

      const marker = await Marker.findById(markerId).populate('eventId');
      if (!marker || marker.eventId.organizerId.toString() !== req.user.userId) {
        return res.status(404).json({ message: 'Marker not found or not owned by you' });
      }

      if (x !== undefined) marker.x = x;
      if (y !== undefined) marker.y = y;
      if (type !== undefined) marker.type = type;

      await marker.save();
      res.json(marker);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // PATCH /markers/:markerId
  // Batch Update multiple markers, ensuring the marker's event is owned by the logged-in organizer
  updateMultipleMarkers: async (req, res) => {
    try {
      const { id } = req.params;
      const { markers } = req.body; // An array of marker updates: [{ markerId, x, y, type }, ...]
  
      const event = await Event.findOne({ _id: id, organizerId: req.user.userId });
      if (!event) return res.status(404).json({ message: 'Event not found or not owned by you' });

      for (const markerData of markers) {
        const marker = await Marker.findById(markerData.markerId).populate('eventId');
        if (marker && marker.eventId.organizerId.toString() === req.user.userId) {
          if (markerData.x !== undefined) marker.x = markerData.x;
          if (markerData.y !== undefined) marker.y = markerData.y;
          if (markerData.type !== undefined) marker.type = markerData.type;
          await marker.save();
        }
      }

      const updatedMarkers = await Marker.find({ eventId: event._id });
      res.json(updatedMarkers);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
};
