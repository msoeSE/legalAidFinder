import mongoose from 'mongoose';
import Eligibility from '../models/eligibility';

export function getAllEligibilities(req, res) {
  Eligibility.find()
    .exec((err, eligibilities) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ eligibilities });
      }
    });
}


/**
 * Get all eligibility for an agency
 * @param req
 * @param res
 * @returns void
 */
export function getAgencyEligibility(req, res) {
  Eligibility.find({ agency: req.body.agency })
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
  if (!req.body.agencyId || !req.body.categoryId || !req.body.data || req.body.data.length === 0) {
    res.status(403).end();
  }

  Eligibility.findOne({ agency: req.body.agencyId, category: req.body.categoryId })
    .exec((err, elig) => {
      if (err) {
        res.status(500).send(err);
      } else {
        if (elig === null) {
          const newEligibility = new Eligibility({
            _id: new mongoose.Types.ObjectId(),
            agency: req.body.agencyId,
            category: req.body.categoryId,
            key_comparator_value: req.body.data,
          });

          newEligibility.save((error) => {
            if (error) {
              res.status(500).send(err);
            }
            res.json({ eligibilities: newEligibility });
            return true;
          });
        } else {
          elig.key_comparator_value = req.body.data;

          elig.save((error, x) => {
            if (error) {
              res.status(500).send(err);
            }
            res.json({ eligibilities: x });
            return true;
          });
        }
      }
    }
  );
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
