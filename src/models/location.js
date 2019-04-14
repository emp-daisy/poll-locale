/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
  },
  description: {
    type: String,
  },
});

LocationSchema.path('name').validate(async (value) => {
  const nameCount = await mongoose.models.Location.countDocuments({ name: value });
  return !nameCount;
}, 'Location name already exists!');

LocationSchema.pre('remove', (next) => {
  this.model('SubLocation').deleteMany({
    locationId: this.locationId,
  }, next);
});

LocationSchema.pre('find', function find() {
  this.populate('subLocations');
});

LocationSchema.pre('findOne', function findOne() {
  this.populate('subLocations')
    .populate('maleCount')
    .populate('femaleCount');
});

LocationSchema.statics.getSubLocation = function getSubLocation(id, callback) {
  return mongoose.models.Location.findById(id, callback);
};

LocationSchema.virtual('subLocations', {
  ref: 'SubLocation',
  localField: '_id',
  foreignField: 'locationId',
  justOne: false,
});

const transformingReturn = (ret) => {
  const transformObj = ret;
  delete transformObj.__v;
  transformObj.id = transformObj._id.toString();
  delete transformObj._id;
  if (transformObj.subLocations) {
    transformObj.maleCount = transformObj.subLocations
      .reduce((sum, { maleCount }) => sum + maleCount, 0);
    transformObj.femaleCount = transformObj.subLocations
      .reduce((sum, { femaleCount }) => sum + femaleCount, 0);
  }
  return transformObj;
};

LocationSchema.set('toJSON', {
  virtuals: true,
  getters: true,
  transform: (_doc, ret) => transformingReturn(ret),
});

LocationSchema.set('toObject', {
  virtuals: true,
  getters: true,
  transform: (_doc, ret) => transformingReturn(ret),
});


const Location = mongoose.model('Location', LocationSchema);

export default Location;
