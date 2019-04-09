import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

locationSchema.pre('remove', function(next) {
  // this.model('Message').deleteMany({
  //   $or: [
  //     {senderMobile: this.mobile},
  //     {receiverMobile: this.mobile}
  //   ]}, next);
});

//Alias _id to id virtually
locationSchema.virtual('id').get(function() { return this._id; });

const Location = mongoose.model('Location', locationSchema);

export default Location;