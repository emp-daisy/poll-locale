import mongoose from 'mongoose';

import Location from './location';
import SubLocation from './sub-location';

const connection = () => mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const models = { Location, SubLocation };

export { connection };

export default models;
