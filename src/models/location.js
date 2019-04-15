/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';

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
    transformObj.totalCount = transformObj.maleCount + transformObj.femaleCount;
  }
  return transformObj;
};

const LocationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
  },
  description: {
    type: String,
  },
}, {
  toJSON: {
    virtuals: true,
    getters: true,
    transform: (_doc, ret) => transformingReturn(ret),
  },
  toObject: {
    virtuals: true,
    getters: true,
    transform: (_doc, ret) => transformingReturn(ret),
  },
});

LocationSchema.path('name').validate(async (value) => {
  const nameCount = await mongoose.models.Location.countDocuments({ name: value });
  return !nameCount;
}, 'Location name already exists!');

LocationSchema.pre('find', function find() {
  this.populate('subLocations');
});

LocationSchema.pre('findOne', function findOne() {
  this.populate('subLocations')
    .populate('maleCount')
    .populate('femaleCount');
});

LocationSchema.post('findOneAndDelete', async (location, next) => {
  if (location !== null) {
    await mongoose.models.SubLocation.deleteMany({
      locationId: location.id,
    });
  }
  next();
});

// LocationSchema.statics.getSubLocation = function getSubLocation(id, callback) {
//   return mongoose.models.Location.findById(id, callback);
// };

LocationSchema.virtual('subLocations', {
  ref: 'SubLocation',
  localField: '_id',
  foreignField: 'locationId',
  justOne: false,
});

const Location = mongoose.model('Location', LocationSchema);

export default Location;
