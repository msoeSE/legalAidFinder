import Post from '../models/post';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all categories
 * @param req
 * @param res
 * @returns void
 */
export function getPosts(req, res) {
  Post.find().sort('-dateAdded').exec((err, posts) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ posts });
  });
}

/**
 * Save a category
 * @param req
 * @param res
 * @returns void
 */
export function addPost(req, res) {
  if (!req.body.category.name || !req.body.category.parent || !req.body.category.subcategories) {
    res.status(403).end();
  }

  const newPost = new Post(req.body.category);

  // Let's sanitize inputs
  newPost.parent = sanitizeHtml(newPost.parent);
  newPost.name = sanitizeHtml(newPost.name);
  newPost.subcategories = sanitizeHtml(newPost.subcategories);

  newPost.slug = slug(newPost.parent.toLowerCase(), { lowercase: true });
  newPost.cuid = cuid();
  newPost.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post: saved });
  });
}

/**
 * Get a single category
 * @param req
 * @param res
 * @returns void
 */
export function getPost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post });
  });
}

/**
 * Delete a category
 * @param req
 * @param res
 * @returns void
 */
export function deletePost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }

    post.remove(() => {
      res.status(200).end();
    });
  });
}
