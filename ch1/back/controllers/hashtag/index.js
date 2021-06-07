/**
 * @author : manbalboy <manbalboy@hanmail.net>
 * @version 0.0.1
 */

const { Router } = require('express');

const ctrl = require('./hashtag.ctrl');

/**
 * @swagger
 * tags:
 * - name: "Post"
 *   description: "post 관련 API"
 */

const router = Router();

router.get('/:tag', ctrl.get_tag);

module.exports = router;
