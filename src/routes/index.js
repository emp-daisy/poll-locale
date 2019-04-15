import swaggerUi from 'swagger-ui-express';
import location from './location';
import subLocation from './sub-location';

const documentation = require('../utils/documentation.json');

const routes = (app) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(documentation));
  app.use('/api/location', location);
  app.use('/api/sublocation', subLocation);
};

export default routes;
