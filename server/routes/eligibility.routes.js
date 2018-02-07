import { Router } from 'express';
import * as EligibilityController from '../controllers/eligibility.controller';

const router = new Router();

// Get all
router.route('/eligibilities').get(EligibilityController.getAllEligibilities);

router.route('/agency_eligibilities/:_id').get(EligibilityController.getAgencyEligibility);

// Get one category by _id
router.route('/eligibility/:_id').get(EligibilityController.getEligibility);

// Add a new Category
router.route('/eligibility').post(EligibilityController.addEligibility);

// Delete a category by cuid
router.route('/eligibility/:_id').delete(EligibilityController.deleteEligibility);

export default router;
