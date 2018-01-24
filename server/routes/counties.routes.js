import { Router } from 'express';
import * as CountyController from '../controllers/counties.controller';
const router = new Router();

// Get all counties
router.route('/counties').get(CountyController.getCounties);

// Get one county by _id
router.route('/counties/:_id').get(CountyController.getCounty);

// Get all counties by state
router.route('/counties/state/:state').get(CountyController.getCountiesByState);

// Get one county by name
router.route('/counties/name/:name').get(CountyController.getCountyByName);

export default router;