import app from './src/app';
import { connection } from './src/models';

const PORT = process.env.PORT || 4000;

connection().then(async () => {
  app.listen(PORT, () =>
    console.log(`Listening on port ${PORT}!`),
  );
});
