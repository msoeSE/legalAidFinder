import { Router } from 'express';
import * as AdminsController from '../controllers/admins.controller';
const router = new Router();

// Get all admins
router.route('/admins').get(AdminsController.getAdmins);

export default router;

