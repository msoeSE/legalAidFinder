import Counties from '../models/counties';

/**
 * Get all counties
 * @param req
 * @param res
 * @returns void
 */
export function getCounties(req, res) {
    Counties.find()
        .populate('counties')
        .exec((err, counties) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json({ counties });
        });
}

/**
 * Get a single county
 * @param req
 * @param res
 * @returns void
 */
export function getCounty(req, res) {
    Counties.findById(req.params._id)
        .populate('counties')
        .exec((err, county) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json({ county });
        });
}


/**
 * Get a single county by name
 * @param req
 * @param res
 * @returns void
 */
export function getCountyByName(req, res) {
    Counties.findOne({ name: req.params.name })
        .populate('counties')
        .exec((err, county) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json({ county });
        });
}


/**
 * Get all counties by state
 * @param req
 * @param res
 * @returns void
 */
export function getCountiesByState(req, res) {
    Counties.find({'state' : req.params.state})
        .populate('counties')
        .exec((err, counties) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json({ counties });
        });
}