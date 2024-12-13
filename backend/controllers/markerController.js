const Marker = require('../models/Marker');
const Event = require('../models/Event');

module.exports = {
  createMarker: async (req, res) => {
    try {
      const { id } = req.params;
      const { x, y, type, name, description } = req.body;

      const event = await Event.findOne({ _id: id, organizerId: req.user.userId });
      if (!event) {
        return res.status(404).json({ message: 'Event not found or not owned by you' });
      }

      if (x == null || y == null || !type || !name) {
        return res.status(400).json({ message: 'x, y, type, and name are required' });
      }

      const marker = new Marker({
        eventId: event._id,
        x,
        y,
        type,
        name,
        description: description || '',
      });
      await marker.save();
      res.status(201).json(marker);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },

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

  updateMarker: async (req, res) => {
    try {
      const { markerId } = req.params;
      const { x, y, type, name, description } = req.body;

      const marker = await Marker.findById(markerId).populate('eventId');
      if (!marker || marker.eventId.organizerId.toString() !== req.user.userId) {
        return res.status(404).json({ message: 'Marker not found or not owned by you' });
      }

      if (x !== undefined) marker.x = x;
      if (y !== undefined) marker.y = y;
      if (type !== undefined) marker.type = type;
      if (name !== undefined) marker.name = name;
      if (description !== undefined) marker.description = description;

      await marker.save();
      res.json(marker);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },

  updateMultipleMarkers: async (req, res) => {
    try {
      const { id } = req.params;
      const { markers } = req.body;

      const event = await Event.findOne({ _id: id, organizerId: req.user.userId });
      if (!event) {
        return res.status(404).json({ message: 'Event not found or not owned by you' });
      }

      for (const markerData of markers) {
        const marker = await Marker.findById(markerData.markerId).populate('eventId');
        if (marker && marker.eventId.organizerId.toString() === req.user.userId) {
          if (markerData.x !== undefined) marker.x = markerData.x;
          if (markerData.y !== undefined) marker.y = markerData.y;
          if (markerData.type !== undefined) marker.type = markerData.type;
          if (markerData.name !== undefined) marker.name = markerData.name;
          if (markerData.description !== undefined) marker.description = markerData.description;
          await marker.save();
        }
      }

      const updatedMarkers = await Marker.find({ eventId: event._id });
      res.json(updatedMarkers);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },
};
