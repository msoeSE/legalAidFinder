import { Router } from 'express';
import * as CategoryController from '../controllers/categories.controller';
const router = new Router();

// Get all ParentPosts
router.route('/categories').get(CategoryController.getCategories);

// Get one category by _id
router.route('/categories/:_id').get(CategoryController.getCategory);

// Add a new Category
router.route('/categories').post(CategoryController.addCategory);

// Delete a category by cuid
router.route('/categories/:_id').delete(CategoryController.deleteCategory);

export default router;
