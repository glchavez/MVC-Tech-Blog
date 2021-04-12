const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');


// Display user dashboard
router.get('/:id', async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

console.log(user)

    res.render('dashboard', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Display user dashboard, create post form
router.get('/create/:id', async (req, res) => {
    try {
    const userData = await Post.findByPk(req.params.id);

    const user = userData.get({ plain: true });

    res.render('create-Post', {
      user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Display user dashboard, update/delete post form
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    const posts = postData.get({ plain: true });

    res.render('edit-Post', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
