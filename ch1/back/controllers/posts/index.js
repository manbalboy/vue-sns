/**
 * @author : manbalboy <manbalboy@hanmail.net>
 * @version 0.0.1
 */

const { Router } = require('express');
const ctrl = require('./posts.ctrl');

/**
 * @swagger
 * tags:
 * - name: "Posts"
 *   description: "posts 관련 API 복수"
 */

const router = Router();

router.get('/', ctrl.post_posts);

module.exports = router;
