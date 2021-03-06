var models = require('../models');
var User = models.User;


/**
 * The function attempts to log the user into the account.
 * It first checks to see that all of the required fields are there.
 *
 * If this is successful, it authenticates the information. If it
 * authenticates correctly, it redirects to the account.
 */
var login = function (req, res) {
    if (!req.body.username || !req.body.password) {
        res.status(400).json({ error: 'All fields are required' });
    }
    /* eslint consistent-return: 0 */
    User.Model.authenticate(req.body.username, req.body.password, function (err, account) {
        if (err || !account) {
            return res.status(401).json({ error: 'wrong username' });
        }
        /* eslint no-param-reassign: 0 */
        req.session.account = account.toAPI();
        res.status(200).json(account.toAPI());
    });
};


/**
 * This function attempts to sign a user into the system.
 * It first validates the inputs, ensuring that all the required
 * fields have been filled and that each of the password fields
 * match.
 *
 * If this is successful, it generates a hash and salt value and
 * saves it into the database
 */
var signup = function (req, res) {
    if (!req.body.username ||
        !req.body.name ||
        !req.body.password ||
        !req.body.password_conf) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    if (req.body.password !== req.body.password_conf) {
        return res.status(400).json({ error: 'passwords don\'t match' });
    }
    User.Model.generateHash(req.body.password, function (salt, hash) {
        var userData = {
            username: req.body.username,
            name: req.body.name,
            salt: salt,
            password: hash,
        };
        var newUser = new User.Model(userData);
        newUser.save(function (err) {
            if (err) {
                /* eslint no-console: 0 */
                console.error(err);
                return res.status(400).json({
                    error: 'an error occurred when saving your account to the database',
                });
            }
            req.session.account = newUser.toAPI();
            res.status(200).json(newUser.toAPI());
        });
    });
};


module.exports.signup = signup;
module.exports.login = login;
