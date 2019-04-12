import { LocationController } from '../controllers';
import Middleware from '../utils/validation';

const router = require('express').Router();

router.get('/', LocationController.getLocation);
router.get('/:search', LocationController.getOneLocation);

router.post('/', LocationController.addLocation);

router.put('/:id', Middleware.validateId, LocationController.updateLocation);

router.delete('/:id', Middleware.validateId, LocationController.deleteLocation);

export default router;
