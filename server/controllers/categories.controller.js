import Categories from '../models/categories';
import agencies from '../models/agencies';
var mongoose = require('mongoose');

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
  var newCategory = new Categories({
    name: req.body.name,
    _id: mongoose.Types.ObjectId(),
    parent: req.body.parent
  });

  newCategory.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    } else {
      let subs = req.body.parent.subcategories;
      subs.push(saved);
      Categories.findOneAndUpdate({ _id: req.body.parent._id },
      {
        name: req.body.parent.name,
        subcategories: subs
      });
      console.log(subs)
      console.log(req.body.parent._id)
      res.json({ category: saved });
    }
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
 * Delete an category
 * @param req
 * @param res
 * @returns void
 */
export function deleteCategory(req, res) {
  Categories.remove({ _id: req.body.id }, (err) => {
    if (!err) {
      res.status(200).send(JSON.stringify(req.body));
    } else {
      res.status(500).send(err);
    }
  });
}

/**
 * Save a new category
 * @param req
 * @param res
 * @returns void
 */
export function addCategories(req, res) {
  var subcategory_array = []
  req.body.subcategories.forEach((s) => {
    subcategory_array.push(s.id);
  });
  var agencies_array = []
  req.body.agencies.forEach((a) => {
    agencies_array.push(a.id);
  });

  var newCategory = new Categories({
    name: req.body.name,
    parent: req.body.parent,
    subcategories: subcategory_array,
    agencies: agencies_array,
    _id: mongoose.Types.ObjectId()
  });

  newCategory.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
      res.json({ category: saved });
  });
}

/**
 * Modify a category
 * @param req
 * @param res
 * @returns void
 */
export function modifyCategory(req, res) {
  req.body.subcategories.forEach((sub) => {
    // Update new parent for subcategory
    Categories.findOneAndUpdate({ _id: sub._id },
      {
        name: sub.name,
        parent: sub.new_parent
      });
    // Remove from parent subcategory array
    Categories.findOneAndUpdate({ _id: sub.parent._id },
      {
        name: sub.parent.name,
        subcategories: sub.parent.subcategories
      }, {upsert:true});
  });
  // Update subcategories and name for selected category
  Categories.findOneAndUpdate(req.body.query,
    { name: req.body.name,
      subcategories: req.body.subcategories
    }, {upsert:true}, function(err, doc){
    if (err)
      return res.send(500, { error: err });
    return res.status(200).send(JSON.stringify(req.body));
  });
}