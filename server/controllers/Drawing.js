var models = require('../models');
var Drawing = models.Drawing;


/**
 * Save an image to the database
 */
/* eslint consistent-return: 0 */
var saveImage = function (req, res) {
    var saveData;
    var drawing;
    if (!req.body.dataURI) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    saveData = {
        owner: req.session.account._id,
        image: req.body.dataURI,
    };
    drawing = new Drawing.Model(saveData);
    drawing.save(function (err) {
        if (err) {
             /* eslint no-console: 0 */
            console.error(err);
            return res.status(400).json({
                error: 'an error occurred when saving your drawing to the database',
            });
        }
        return res.status(200).json({});
    });
};


/**
 * Gets all of the images from the User
 */
var getImages = function (req, res) {
    Drawing.Model.findByOwner(req.session.account._id, function (err, accounts) {
        var images = [];
        var i;
        for (i = 0; i < accounts.length; i++) {
            images.push(accounts[i].toAPI());
        }
        res.status(200).json({
            drawings: images,
        });
    });
};

module.exports.saveImage = saveImage;
module.exports.getImages = getImages;
