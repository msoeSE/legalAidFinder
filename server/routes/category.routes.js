import { Router } from 'express';
import * as CategoryController from '../controllers/categories.controller';
const router = new Router();

// Get all ParentPosts
router.route('/categories').get(CategoryController.getCategories);

// Get one category by cuid
router.route('/categories/:categoryId').get(CategoryController.getCategory);

// Add a new Category
router.route('/categories').post(CategoryController.addCategory);

// Delete a category by cuid
router.route('/categories/:categoryId').delete(CategoryController.deleteCategory);

export default router;
