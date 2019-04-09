import express from 'express';
import bodyParser from "body-parser";
import routes from './routes';

const app = express();

app.use(bodyParser.json());

routes(app);

// Wild card
app.all('*', (_req, res) => {
  res.status(404).send('URL not found!');
});

export default app;