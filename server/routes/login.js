var express = require("express");
var router = express.Router();
var User = require("../controllers").User;


/**
 * Go through the necessary steps to sign the user up for
 * an account.
 */
router.post("/", function(req, res) {
    User.login(req, res);
});


router.get("/", function() {
    console.log("Hello");
});

module.exports = router;