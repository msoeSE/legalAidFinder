import mongoose from 'mongoose';
import Eligibility from '../models/eligibility';
import KeyComparatorValue from '../models/keyComparatorValue';

/**
 * Get all eligibility for an agency
 * @param req
 * @param res
 * @returns void
 */
export function getAgencyEligibility(req, res) {
  Eligibility.find({ agency: req.body.agency})
    .populate('agency')
    .populate('category')
    .exec((err, eligibility) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ eligibility });
      }
    });
}

/**
 * add an eligibility
 * @param req
 * @param res
 * @returns void
 */
export function addEligibility(req, res) {
  if (!req.body.category || !req.body.agency || !req.body.key || !req.body.comparator || !req.body.value) {
    res.status(403).end();
  }

  const newKCV = new KeyComparatorValue({
    key: req.body.key,
    comparator: req.body.comparator,
    value: req.body.value,
  });

  const newEligibility = new Eligibility({
    _id: new mongoose.Types.ObjectId(),
    agency: req.body.agency,
    category: req.body.category,
    key_comparator_value: newKCV,
  });

  newEligibility.save((err) => {
    if (err) {
      return err;
    }
    return true;
  });
}

/**
 * Get a single eligibility
 * @param req
 * @param res
 * @returns void
 */
export function getEligibility(req, res) {
  Eligibility.findById(req.params._id)
    .populate('agency')
    .populate('category')
    .exec((err, eligibility) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ eligibility });
    });
}

/**
 * Delete an eligibility
 * @param req
 * @param res
 * @returns void
 */
export function deleteEligibility(req, res) {
  Eligibility.findById(req.params._id).exec((err, eligibility) => {
    if (err) {
      res.status(500).send(err);
    }
    eligibility.remove(() => {
      res.status(200).end();
    });
  });
}
