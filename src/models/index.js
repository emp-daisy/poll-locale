import mongoose from 'mongoose';

import Location from './location';

const connection = () => {
  return mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
  });
};

const models = { Location };

export { connection };

export default models;