import Categories from '../models/categories';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all parent categories
 * @param req
 * @param res
 * @returns void
 */
export function getCategories(req, res) {
  Categories.find() // { parent: { $exists: false } }
    .populate({
      path: 'subcategories',
      // Populate categories in subcategories
      populate: { path: 'subcategories agencies' },
    })
    .populate({
      path: 'parent',
      // Populate parents in subcategories
      populate: { path: 'parent' },
    })
    .populate({
      path: 'agencies',
      // Populate parents in subcategories
      populate: { path: 'agencies' },
    })
    .exec((err, categories) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ categories });
      }
    });
}

/**
 * Save a category
 * @param req
 * @param res
 * @returns void
 */
export function addCategory(req, res) {
  if (!req.body.category.name) {
    res.status(403).end();
  }
  // TODO: Check??
  const newCategory = new Categories(req.body.category);

  // Let's sanitize inputs
  newCategory.name = sanitizeHtml(newCategory.name);

  Categories.findOne({ name: req.body.category.parent }).exec((err, parent) => {
    if (err) {
      res.status(500).send(err);
    }

    newCategory.parent = parent.id;

    newCategory.save((err2, saved) => {
      if (err2) {
        res.status(500).send(err2);
      }
      res.json({ category: saved });
    });
  });
}

/**
 *
 * @param req
 * @param res
 */
export function addAgencyToCategory(req, res) {
  if (!req.body.categoryId || !req.body.agencyId || req.body.pushAgency === null) {
    res.status(403).end();
  }

  Categories.findById(req.body.categoryId, function (err, category) {
    if (err) return handleError(err);

    if (req.body.pushAgency){
      category.agencies.addToSet(req.body.agencyId);
    } else {
      category.agencies.pull(req.body.agencyId);
    }

    category.save(function (err, saved) {
      if (err) return handleError(err);
      res.send(saved);
    });
  });

  // if(req.body.pushAgency){ // If we want to add agency to category
  //   Categories.update(
  //     { _id: req.body.categoryId },
  //     { $addToSet: { agencies: req.body.agencyId } }
  //   )
  // } else { // We want to remove agencyId from category
  //   Categories.update(
  //     { _id:req.body.categoryId },
  //     { $pull: { agencies: req.body.agencyId }}
  //   )
  // }
}

/**
 * Get a single category
 * @param req
 * @param res
 * @returns void
 */
export function getCategory(req, res) {
  Categories.findById(req.params._id)
    .populate({
      path: 'subcategories',
      // Get friends of friends - populate the 'friends' array for every friend
      populate: { path: 'subcategories' },
    })
    .populate({
      path: 'parent',
      // Get friends of friends - populate the 'friends' array for every friend
      populate: { path: 'parent' },
    })
    .populate({
      path: 'agencies',
      // Populate parents in subcategories
      populate: { path: 'agencies' },
    })
    .exec((err, category) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ category });
    });
}

/**
 * Delete a category
 * @param req
 * @param res
 * @returns void
 */
export function deleteCategory(req, res) {
  Categories.findById(req.params.category._id).exec((err, category) => {
    if (err) {
      res.status(500).send(err);
    }

    category.remove(() => {
      res.status(200).end();
    });
  });
}
