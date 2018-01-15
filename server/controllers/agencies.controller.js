import Agencies from '../models/agencies';

/**
 * Get all agencies
 * @param req
 * @param res
 * @returns void
 */
export function getAgencies(req, res) {
  Agencies.find() // { parent: { $exists: false } }
    .populate('categories')
    .exec((err, agencies) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ agencies });
    });
}

/**
 * Save a new agency
 * @param req
 * @param res
 * @returns void
 */
export function addAgency(req, res) {
  var mongoose = require('mongoose');
  var newAgency = new Agencies({
    name: req.body.name,
    url: req.body.url,
    _id: mongoose.Types.ObjectId()
  });

  newAgency.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
      res.json({ agency: saved });
  });
}

/**
 * Get a single agency
 * @param req
 * @param res
 * @returns void
 */
export function getAgency(req, res) {
  Agencies.findById(req.params._id)
    .populate('categories')
    .exec((err, agency) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ agency });
    });
}

/**
 * Delete an agency
 * @param req
 * @param res
 * @returns void
 */
export function deleteAgency(req, res) {
  Agencies.remove({ _id: req.body.id }, function(err) {
    if (!err) {
      res.status(200);
    }
    else {
      res.status(500).send(err);
    }
  });
}

/**
 * Modify an agency
 * @param req
 * @param res
 * @returns void
 */
export function modifyAgency(req, res) {
  Agencies.put({ _id: req.body.id }, function(err) {
    if (!err) {
      res.status(200);
    }
    else {
      res.status(500).send(err);
    }
  });
}