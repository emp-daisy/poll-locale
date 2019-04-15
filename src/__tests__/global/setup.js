import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

beforeAll(async () => {
  const clearDB = async () => {
    const collections = await mongoose.connection.db.collections();

    await collections.forEach(async (collection) => { await collection.deleteOne(); });
  };

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(
      process.env.TEST_DATABASE_URL,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
      },
    );
  }
  await clearDB();
});

afterAll(async () => {
  await mongoose.disconnect();
});
