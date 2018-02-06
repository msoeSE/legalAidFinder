import Admins from '../models/admins';

/**
 * Get all admins
 * @param req
 * @param res
 * @returns void
 */
export function getAdmins(req, res) {
  Admins.find()
    .populate('admins')
    .exec((err, admins) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ admins });
    });
}
