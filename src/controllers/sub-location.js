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
    if (location === null) { return res.status(404).json({ message: 'Sub-Location does not exist' }); }
    location = location.toJSON({ getters: false, virtuals: false });
    return res.status(200).json({ location, message: 'Sub-Location found' });
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
      return res.status(201).json({ location: data, message: 'New sub-location created' });
    } catch (error) {
      const message = ErrorHandling(error);
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
      if (location === null) { return res.status(404).json({ message: 'Sub-Location does not exist' }); }
      return res.status(200).json({ location, message: 'Sub-Location updated' });
    } catch (error) {
      const message = ErrorHandling(error);
      return res.status(500).json({ message });
    }
  },
  deleteSubLocation: async (req, res) => {
    const { id } = req.params;
    const location = await SubLocation.findById(id);
    try {
      if (location == null) { return res.status(404).json({ message: 'Sub-Location does not exist' }); }
      const deletedLocation = await location.remove();
      return res.status(200).json({ location: deletedLocation, message: 'Sub-Location deleted' });
    } catch (error) {
      const message = ErrorHandling(error);
      return res.status(500).json({ message });
    }
  },

};

export default SubLocationController;
