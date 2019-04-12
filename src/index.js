import dotenv from 'dotenv';
import app from './app';
import { connection } from './models';

dotenv.config();

const PORT = process.env.PORT || 4000;

connection().then(async () => {
  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
});
