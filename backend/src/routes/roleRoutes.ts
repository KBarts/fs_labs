import { Router } from 'express';
import roleController from '../controllers/roleController';

const router = Router();

router.get('/roles', roleController.getRoles);
router.post('/roles', roleController.createRole);

export default router;