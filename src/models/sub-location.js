/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';

const SubLocationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  maleCount: {
    type: Number,
    required: [true, 'Male count is required'],
  },
  femaleCount: {
    type: Number,
    required: [true, 'Female count is required'],
  },
  locationId: {
    type: mongoose.Types.ObjectId,
    ref: 'Location',
    required: [true, 'Location ID is required'],
  },
});

SubLocationSchema.path('locationId').validate(async (value) => {
  const locationCount = await mongoose.models.Location.countDocuments({ _id: value });
  return locationCount;
}, 'Location with ID does not exists!');


const transformingReturn = (ret) => {
  const transformObj = ret;
  delete transformObj.__v;
  transformObj.id = transformObj._id.toString();
  delete transformObj._id;
  return transformObj;
};

SubLocationSchema.set('toJSON', {
  virtuals: true,
  getters: true,
  transform: (_doc, ret) => transformingReturn(ret),
});

SubLocationSchema.set('toObject', {
  virtuals: true,
  getters: true,
  transform: (_doc, ret) => transformingReturn(ret),
});

const SubLocation = mongoose.model('SubLocation', SubLocationSchema);

export default SubLocation;
