import validator from 'validator';

const Middleware = {
  validateId: (req, res, next) => {
    if (!validator.isMongoId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid id parameter' });
    }
    return next();
  },
};

export const isMongoId = id => validator.isMongoId(id);

export default Middleware;
