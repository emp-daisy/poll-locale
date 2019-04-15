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
    if (location === null) { return res.status(404).json({ message: 'Location does not exist' }); }
    return res.status(200).json({ location, message: 'Location found' });
  },
  addLocation: async (req, res) => {
    const { name, description } = req.body;
    try {
      const data = await new Location({ name, description }).save();
      return res.status(201).json({ location: data, message: 'New location created' });
    } catch (error) {
      const message = ErrorHandling(error);
      return res.status(500).json({ message });
    }
  },
  updateLocation: async (req, res) => {
    const { params: { id }, body: { name, description } } = req;
    try {
      const location = await Location.findByIdAndUpdate(
        id, pickBy({ name, description }, identity), { new: true, runValidators: true },
      );
      if (location === null) { return res.status(404).json({ message: 'Location does not exist' }); }
      return res.status(200).json({ location, message: 'Location updated' });
    } catch (error) {
      const message = ErrorHandling(error);
      return res.status(500).json({ message });
    }
  },
  deleteLocation: async (req, res) => {
    const { id } = req.params;
    try {
      const location = await Location.findOneAndDelete({ _id: id });
      if (location === null) { return res.status(404).json({ message: 'Location does not exist' }); }
      return res.status(200).json({ location, message: 'Location deleted' });
    } catch (error) {
      const message = ErrorHandling(error);
      return res.status(500).json({ message });
    }
  },
};

export default LocationController;
