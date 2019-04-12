import { pickBy, identity } from 'lodash';
import Models from '../models';

const { SubLocation } = Models;

const SubLocationController = {
  getSubLocation: async (req, res) => {
    const locations = SubLocation.find();
    res.status(200).json({ locations, message: 'All sub-locations' });
  },
  getOneSubLocation: async (req, res) => {
    const { name, id } = req.params;
    const location = SubLocation.findOne({ $or: [{ name }, { _id: id }] });
    res.status(200).json({ location, message: 'Get one sub-location' });
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
      const message = (err.name === 'MongoError' && err.code === 11000) ? 'Sub-Location name already exist!' : 'Failed to create a sub-location';
      return res.status(500).json({ message });
    }
  },
  updateSubLocation: async (req, res) => {
    const { id } = req.params;
    const {
      name, maleCount, femaleCount, locationId,
    } = req.body;
    try {
      const updatedLocation = await SubLocation.findByIdAndUpdate(
        id, pickBy({
          name, maleCount, femaleCount, locationId,
        }, identity), { new: true },
      );
      if (updatedLocation == null) { return res.status(500).json({ message: 'Sub-Location does not exist' }); }
      return res.status(200).json({ location: updatedLocation, message: 'Updated a sub-location' });
    } catch (err) {
      const message = (err.name === 'MongoError' && err.code === 11000) ? 'Location name already exist!' : 'Failed to update a location';
      return res.status(500).json({ message });
    }
  },
  deleteSubLocation: async (req, res) => {
    const { id } = req.params;
    const location = SubLocation.findById(id);
    try {
      const deletedLocation = location.remove();
      if (deletedLocation == null) { return res.status(500).json({ message: 'Sub-Location does not exist' }); }
      return res.status(200).json({ location: deletedLocation, message: 'Deleted a sub-location' });
    } catch (err) {
      return res.status(500).json({ message: 'Failed to delete a sub-location' });
    }
  },

};

export default SubLocationController;
