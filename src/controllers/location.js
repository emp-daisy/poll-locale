import { pickBy, identity } from 'lodash';
import Models from '../models';
import ErrorHandling from '../utils/error-handling';
import { isMongoId } from '../utils/validation';

const { Location } = Models;

const LocationController = {
  getLocation: async (_req, res) => {
    const locations = await Location.find();
    res.status(200).json({ locations, message: 'All locations' });
  },
  getOneLocation: async ({ params: { search } }, res) => {
    const searchObject = isMongoId(search) ? { _id: search } : { name: new RegExp(search, 'i') };
    const location = await Location.findOne(searchObject);
    if (location === null) { return res.status(404).json({ message: 'Location not found' }); }
    return res.status(200).json({ location, message: 'Get one location' });
  },
  addLocation: async (req, res) => {
    const { name, description } = req.body;
    try {
      const data = await new Location({ name, description }).save();
      return res.status(201).json({ location: data, message: 'Created a location' });
    } catch (err) {
      const message = ErrorHandling(err) || 'Failed to create a location';
      return res.status(500).json({ message });
    }
  },
  updateLocation: async (req, res) => {
    const { params: { id }, body: { name, description } } = req;
    try {
      const location = await Location.findByIdAndUpdate(
        id, pickBy({ name, description }, identity), { new: true, runValidators: true },
      );
      if (location == null) { return res.status(500).json({ message: 'Location does not exist' }); }
      return res.status(200).json({ location, message: 'Updated a location' });
    } catch (err) {
      const message = ErrorHandling(err) || 'Failed to update a location';
      return res.status(500).json({ message });
    }
  },
  deleteLocation: async (req, res) => {
    const { id } = req.params;
    const location = Location.findById(id);
    if (location == null) { return res.status(500).json({ message: 'Location does not exist' }); }
    try {
      const deletedLocation = location.remove();
      return res.status(200).json({ location: deletedLocation, message: 'Deleted a location' });
    } catch (err) {
      return res.status(500).json({ message: 'Failed to delete a location' });
    }
  },
};

export default LocationController;
