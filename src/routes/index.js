import location from './location';
import subLocation from './sub-location';

const routes = (app) => {
  app.use('/api/location', location);
  app.use('/api/sublocation', subLocation);
};

export default routes;
