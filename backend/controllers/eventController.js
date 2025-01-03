const Event = require('../models/Event');

module.exports = {
  listEvents: async (req, res) => {
    try {
      const events = await Event.find({ organizerId: req.user.userId });
      res.json(events);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },

  getEventById: async (req, res) => {
    try {
      const { id } = req.params;
      const event = await Event.findOne({ _id: id, organizerId: req.user.userId });
      if (!event) {
        return res.status(404).json({ message: 'Event not found or not owned by you' });
      }
      res.json(event);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },

  createEvent: async (req, res) => {
    try {
      const { name, description, startDate, endDate, mapType } = req.body;
      if (!name || (!startDate && !endDate)) {
        return res.status(400).json({ message: 'Name and dates are required' });
      }

      const newEvent = new Event({
        organizerId: req.user.userId,
        name,
        description: description || '',
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        mapType: mapType ? mapType : null
      });

      await newEvent.save();
      res.status(201).json(newEvent);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },

  updateEvent: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, startDate, endDate, mapType } = req.body;

      const event = await Event.findOne({ _id: id, organizerId: req.user.userId });
      if (!event) {
        return res.status(404).json({ message: 'Event not found or not owned by you' });
      }

      if (name !== undefined) event.name = name;
      if (description !== undefined) event.description = description;
      if (startDate !== undefined) event.startDate = startDate ? new Date(startDate) : null;
      if (endDate !== undefined) event.endDate = endDate ? new Date(endDate) : null;
      if (mapType !== undefined) event.mapType = mapType;

      await event.save();
      res.json(event);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
};
