import { Router } from 'express';
import * as AgencyController from '../controllers/agencies.controller';
const router = new Router();

// Get all ParentPosts
router.route('/agencies').get(AgencyController.getAgencies);

// Get one category by _id
router.route('/agencies/:_id').get(AgencyController.getAgency);

// Add new agency
router.route('/agencies').post(AgencyController.addAgency);

// Delete an agency
router.route('/agencies').delete(AgencyController.deleteAgency);

export default router;