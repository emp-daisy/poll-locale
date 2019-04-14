import { pickBy, identity } from 'lodash';
import Models from '../models';
import ErrorHandling from '../utils/error-handling';
import { isMongoId } from '../utils/validation';

const { SubLocation } = Models;

const SubLocationController = {
  getSubLocation: async (_req, res) => {
    const locations = await SubLocation.find();
    res.status(200).json({ locations, message: 'All sub-locations' });
  },
  getOneSubLocation: async ({ params: { search } }, res) => {
    const searchObject = isMongoId(search) ? { _id: search } : { name: new RegExp(search, 'i') };
    let location = await SubLocation.findOne(searchObject)
      .populate('locationId')
      .exec();
    location = location.toJSON({ getters: false, virtuals: false });
    if (location === null) { return res.status(404).json({ message: 'Location not found' }); }
    return res.status(200).json({ location, message: 'Get one sub-location' });
  },
  addSubLocation: async (req, res) => {
    const {
      name, maleCount, femaleCount, locationId,
    } = req.body;
    const newLocation = new SubLocation({
      name, maleCount, femaleCount, locationId,
    });
    try {
      const data = await newLocation.save();
      return res.status(201).json({ location: data, message: 'Created a sub-location' });
    } catch (err) {
      const message = ErrorHandling(err) || 'Failed to create a sub-location';
      return res.status(500).json({ message });
    }
  },
  updateSubLocation: async (req, res) => {
    const { id } = req.params;
    const {
      name, maleCount, femaleCount, locationId,
    } = req.body;
    try {
      const location = await SubLocation.findByIdAndUpdate(
        id, pickBy({
          name, maleCount, femaleCount, locationId,
        }, identity), { new: true, runValidators: true },
      );
      if (location === null) { return res.status(500).json({ message: 'Sub-Location does not exist' }); }
      return res.status(200).json({ location, message: 'Updated a sub-location' });
    } catch (err) {
      const message = ErrorHandling(err) || 'Failed to create a sub-location';
      return res.status(500).json({ message });
    }
  },
  deleteSubLocation: async (req, res) => {
    const { id } = req.params;
    const location = await SubLocation.findById(id);
    try {
      if (location == null) { return res.status(500).json({ message: 'Sub-Location does not exist' }); }
      const deletedLocation = await location.remove();
      return res.status(200).json({ location: deletedLocation, message: 'Deleted a sub-location' });
    } catch (err) {
      return res.status(500).json({ message: 'Failed to delete a sub-location' });
    }
  },

};

export default SubLocationController;
