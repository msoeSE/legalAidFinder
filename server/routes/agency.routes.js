import { Router } from 'express';
import * as AgencyController from '../controllers/agencies.controller';
const router = new Router();

// Get all ParentPosts
router.route('/agencies').get(AgencyController.getAgencies);

// Get one category by _id
router.route('/agencies/:_id').get(AgencyController.getAgency);

export default router;
