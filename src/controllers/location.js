import { pickBy, identity } from 'lodash';
import Models from '../models';

const { Location } = Models;

const LocationController = {
  getLocation: async (_req, res) => {
    const locations = Location.find();
    res.status(200).json({ locations, message: 'All locations' });
  },
  getOneLocation: async (req, res) => {
    const { name, id } = req.params;
    const location = Location.findOne({ $or: [{ name }, { _id: id }] });
    res.status(200).json({ location, message: 'Get one location' });
  },
  addLocation: async (req, res) => {
    const { name, description } = req.body;
    const newLocation = new Location({ name, description });
    try {
      const data = await newLocation.save();
      res.status(201).json({ location: data, message: 'Created a location' });
    } catch (err) {
      const message = (err.name === 'MongoError' && err.code === 11000) ? 'Location name already exist!' : 'Failed to create a location';
      res.status(500).json({ message });
    }
  },
  updateLocation: async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
      const updatedLocation = await Location.findByIdAndUpdate(
        id, pickBy({ name, description }, identity), { new: true },
      );
      if (updatedLocation == null) { return res.status(500).json({ message: 'Location does not exist' }); }
      return res.status(200).json({ location: updatedLocation, message: 'Updated a location' });
    } catch (err) {
      const message = (err.name === 'MongoError' && err.code === 11000) ? 'Location name already exist!' : 'Failed to update a location';
      return res.status(500).json({ message });
    }
  },
  deleteLocation: async (req, res) => {
    const { id } = req.params;
    const location = Location.findById(id);
    try {
      const deletedLocation = location.remove();
      if (deletedLocation == null) { return res.status(500).json({ message: 'Location does not exist' }); }
      return res.status(200).json({ location: deletedLocation, message: 'Deleted a location' });
    } catch (err) {
      return res.status(500).json({ message: 'Failed to delete a location' });
    }
  },
};

export default LocationController;
