const router = require('express').Router();
import { LocationController } from '../controllers';

router.get('/', LocationController.getLocation);

export default router;