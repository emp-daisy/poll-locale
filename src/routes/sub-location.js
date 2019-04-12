import { SubLocationController } from '../controllers';
import Middleware from '../utils/validation';

const router = require('express').Router();

router.get('/', SubLocationController.getSubLocation);
router.get('/:search', SubLocationController.getOneSubLocation);

router.post('/', Middleware.validateLocationId, SubLocationController.addSubLocation);

router.put('/:id', Middleware.validateId, Middleware.validateLocationId, SubLocationController.updateSubLocation);

router.delete('/:id', Middleware.validateId, SubLocationController.deleteSubLocation);

export default router;
