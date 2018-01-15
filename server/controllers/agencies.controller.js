import Agencies from '../models/agencies';

/**
 * Get all parent categories
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
 * Save a category
 * @param req
 * @param res
 * @returns void
 */
export function addAgency(req, res) {
  // TODO: Not implemented correctly
  // if (!req.body.agency.name) {
  //   res.status(403).end();
  // }
  // const newAgency = new Agencies(req.body.agency);
  //
  // // Let's sanitize inputs
  // newAgency.name = sanitizeHtml(newAgency.name);
  //
  // Agencies.findOne({ name: req.body.category.parent }).exec((err, parent) => {
  //   if (err) {
  //     res.status(500).send(err);
  //   }
  //
  //   newAgency.parent = parent.id;
  //
  //   newAgency.save((err2, saved) => {
  //     if (err2) {
  //       res.status(500).send(err2);
  //     }
  //     res.json({ category: saved });
  //   });
  // });
}

/**
 * Get a single category
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
