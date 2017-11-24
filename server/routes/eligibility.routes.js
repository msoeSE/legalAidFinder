import { Router } from 'express';
import * as EligibilityController from '../controllers/eligibility.controller';

const router = new Router();

// Get all ParentPosts
router.route('/agency_eligibities/:_id').get(EligibilityController.getAgencyEligibility);

// Get one category by _id
router.route('/eligibity/:_id').get(EligibilityController.getEligibility);

// Add a new Category
router.route('/eligibity').post(EligibilityController.addEligibility);

// Delete a category by cuid
router.route('/eligibity/:_id').delete(EligibilityController.deleteEligibility);

export default router;
