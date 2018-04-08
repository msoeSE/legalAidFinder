import Agencies from '../models/agencies';
const mongoose = require('mongoose');

/**
 * Get all agencies
 * @param req
 * @param res
 * @returns void
 */
export function getAgencies(req, res) {
  Agencies.find() // { parent: { $exists: false } }
    .populate('agencies')
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
  const email_array = [];

  req.body.emails.forEach((email) => {
    email_array.push(email.address);
  });

  const newAgency = new Agencies({
    name: req.body.name,
    phone: req.body.phone,
    url: req.body.url,
    emails: email_array,
    address: req.body.address,
    operation: req.body.operation,
    _id: mongoose.Types.ObjectId(),
  });

  newAgency.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ agency: saved });
    }
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
  Agencies.remove({ _id: req.body.id }, (err) => {
    if (!err) {
      res.status(200).send(JSON.stringify(req.body));
    } else {
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
  const email_array = [];

  req.body.emails.forEach((email) => {
    email_array.push(email.address);
  });

  req.body
  .Agencies.findOneAndUpdate(req.body.query,
    { name: req.body.name,
      phone: req.body.phone,
      url: req.body.url,
      emails: email_array,
      address: req.body.address,
      operation: req.body.operation,
    }, { upsert: true }, (err, doc) => {
      if (err) { return res.send(500, { error: err }); }
      return res.status(200).send(JSON.stringify(req.body));
    });
}
