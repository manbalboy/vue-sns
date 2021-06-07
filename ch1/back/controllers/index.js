/**
 * @author : manbalboy <manbalboy@hanmail.net>
 * @version 0.0.1
 */

const { Router } = require('express');
const router = Router();
router.use('/auth', require('./auth'));
router.use('/user', require('./user'));
router.use('/post', require('./post'));
router.use('/posts', require('./posts'));
router.use('/hashtag', require('./hashtag'));

module.exports = router;
