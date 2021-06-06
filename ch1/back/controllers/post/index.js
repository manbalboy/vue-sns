/**
 * @author : manbalboy <manbalboy@hanmail.net>
 * @version 0.0.1
 */

const { Router } = require('express');
const ctrl = require('./post.ctrl');
const path = require('path');
const { isLoggedIn } = require('../../middlewares');

const multer = require('multer');
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            const basename = path.basename(file.originalname, ext);
            done(null, basename + Date.now() + ext);
        },
    }),
    limit: {
        fileSize: 20 * 1024 * 1024,
    },
});

/**
 * @swagger
 * tags:
 * - name: "Post"
 *   description: "post 관련 API"
 */

const router = Router();

/**
 * @swagger
 *  paths:
 *  /post:
 *    post:
 *      tags:
 *      - Post
 *      description: 회원가입 API
 *      requestBody:
 *       required: true
 *       description: request body
 *       content:
 *        application/json:
 *         schema:
 *           $ref: '#/components/schemas/TB_POST'
 *      consumes:
 *      - applicaion/json
 *      produces:
 *      - applicaion/json
 *      responses:
 *       200:
 *        description: ok
 */
router.post('/', isLoggedIn, ctrl.post_post);

router.post('/images', isLoggedIn, upload.array('image'), ctrl.post_images);

module.exports = router;
