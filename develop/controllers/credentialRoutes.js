const router = require('express').Router();


// Display login page
router.get('/login', (req, res) => {

  res.render('login');
});

// Display sign-up page
router.get('/signup', (req, res) => {

  res.render('sign-Up');
});

module.exports = router;
