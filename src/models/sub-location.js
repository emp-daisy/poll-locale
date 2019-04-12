import mongoose from 'mongoose';

const subLocationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  maleCount: {
    type: Number,
    required: true,
  },
  femaleCount: {
    type: Number,
    required: true,
  },
  locationId: {
    type: mongoose.Types.ObjectId,
    ref: 'Location',
    required: true,
  },
});

const SubLocation = mongoose.model('SubLocation', subLocationSchema);

export default SubLocation;
