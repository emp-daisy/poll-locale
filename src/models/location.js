import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  decription: {
    type: String,
  },
});

locationSchema.pre('remove', (next) => {
  this.model('SubLocation').deleteMany({
    locationId: this.locationId,
  }, next);
});

const Location = mongoose.model('Location', locationSchema);

export default Location;
