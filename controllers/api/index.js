const router = require('express').Router();
const commentRoutes = require('./commentRoutes');
const postRoutes = require('./postRoutes');
const accessRoutes = require('./accessRoutes');

router.use('/users', accessRoutes);
router.use('/posts', postRoutes);
router.use('/comment', commentRoutes);

module.exports = router;
