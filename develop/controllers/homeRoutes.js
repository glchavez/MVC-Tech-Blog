const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Display all posts on homepage
router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Display a specific post on homepage to add comment
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const posts = postData.get({ plain: true });

    res.render('comment-Post', {
      ...posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

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

// Display user dashboard, update/delete post form

// Display login page
router.get('/login', (req, res) => {

  res.render('login');
});

// Display sign-up page
router.get('/signup', (req, res) => {

  res.render('sign-Up');
});

// Display logout page
router.get('/logout', (req, res) => {
  
  res.render('logout');
});


module.exports = router;
