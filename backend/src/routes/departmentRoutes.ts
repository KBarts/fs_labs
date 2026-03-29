import { Router } from 'express';
import departmentController from '../controllers/departmentController';

const router = Router();

router.get('/departments', departmentController.getDepartments);
router.post('/employees', departmentController.createEmployee);

export default router;