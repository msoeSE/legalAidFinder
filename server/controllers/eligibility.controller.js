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
  if (!req.body.eligibilities || req.body.eligibilities.length === 0) {
    res.status(403).end();
  }

  this.req.body.eligibilities.map((eligibility) => {
    if (!req.body.category || !req.body.agency || !req.body.key || !req.body.comparator || !req.body.value) {
      res.status(403).end();
    }

    const newKCV = {
      key: eligibility.key,
      comparator: eligibility.comparator,
      value: eligibility.value,
    };

    Eligibility.findOne({ agency: eligibility.agency, category: eligibility.category })
      .exec((err, elig) => {
        if (err) {
          res.status(500).send(err);
        } else {
          if (elig === null) {
            const newEligibility = new Eligibility({
              _id: new mongoose.Types.ObjectId(),
              agency: req.body.agency,
              category: req.body.category,
              key_comparator_value: newKCV,
            });

            newEligibility.save((error) => {
              if (error) {
                return error;
              }
              res.json({ newEligibility });
              return true;
            });
          } else {
            eligibility.key_comparator_value.push(newKCV);
            eligibility.save((error) => {
              if (error) {
                return error;
              }
              res.json({ eligibility });
            });
          }
        }
      });
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
