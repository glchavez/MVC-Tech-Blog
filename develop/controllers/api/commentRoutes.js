const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Add a comment to a post
router.post('/', withAuth, async (req, res) => {
  try {
    const postData = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      // Need to pull post id from url
    });

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
