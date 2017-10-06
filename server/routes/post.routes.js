import { Router } from 'express';
import * as PostController from '../controllers/post.controller';
const router = new Router();

// Get all Posts
router.route('/posts').get(PostController.getPosts);

// Get one category by cuid
router.route('/posts/:cuid').get(PostController.getPost);

// Add a new Post
router.route('/posts').category(PostController.addCategory);

// Delete a category by cuid
router.route('/posts/:cuid').delete(PostController.deleteCategory);

export default router;
