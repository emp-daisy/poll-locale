import validator from 'validator';

const Middleware = {
  validateId: (req, res, next) => {
    if (!validator.isMongoId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid id parameter' });
    }
    return next();
  },
  validateLocationId: (req, res, next) => {
    if (!validator.isMongoId(req.body.id)) {
      return res.status(400).json({ message: 'Invalid location ID in parameter' });
    }
    return next();
  },
};

export default Middleware;
