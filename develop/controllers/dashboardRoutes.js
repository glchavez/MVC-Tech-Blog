const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');


// Display user dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Display user dashboard, create post form
router.get('/dashboard/create',withAuth, (req, res) => {

  res.render('create-Post');
});

// Display user dashboard, update/delete post form
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    const posts = postData.get({ plain: true });

    res.render('edit-Post', {
      ...posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
