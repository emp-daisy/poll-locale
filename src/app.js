import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

routes(app);

// Wild card
app.all('*', (_req, res) => {
  res.status(404).json({ message: 'URL not found!' });
});

export default app;
