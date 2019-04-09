import location from "./location";

const routes = (app) => {
  app.use('/api/location', location);
};

export default routes;