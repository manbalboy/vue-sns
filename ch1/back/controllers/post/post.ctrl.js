/**
 * @author : manbalboy <manbalboy@hanmail.net>
 * @version 0.0.1
 */

const dotenv = require('dotenv');
dotenv.config(); //LOAD CONFIG

exports.post_post = async (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            //로그인검사
        }
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

exports.post_images = async (req, res, next) => {
    try {
        return res.json(req.files.map(v => v.filename));
    } catch (error) {
        console.error(error);
        return next(error);
    }
};
