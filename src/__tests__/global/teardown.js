import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export default async () => {
  /* Connect to the DB  and Drop the DB */
  const conn = await mongoose.connect(
    process.env.TEST_DATABASE_URL,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
    },
  );

  await conn.connection.db.dropDatabase();
  process.exit();
};
