import Admins from '../models/admins';
var mongoose = require('mongoose');

/**
 * Get all admins
 * @param req
 * @param res
 * @returns void
 */
export function getAdmins(req, res) {
  Admins.find() // { parent: { $exists: false } }
    .populate('admins')
    .exec((err, admins) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ admins });
    });
}
