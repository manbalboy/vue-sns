/**
 * @author : manbalboy <manbalboy@hanmail.net>
 * @version 0.0.1
 */

const Sequelize = require('sequelize');
const User = require('./User');
const Comment = require('./Comment');
const Hashtag = require('./Hashtag');
const Post = require('./Post');
const Image = require('./Image');
const dotenv = require('dotenv');

dotenv.config(); //LOAD CONFIG

const db = {};

const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mariadb',
    timezone: '+09:00', //한국 시간 셋팅
    operatorsAliases: Sequelize.Op,
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
    },
    port: process.env.DB_PORT,
});

db.sequelize = sequelize;
db.User = User;
db.Comment = Comment;
db.Image = Image;
db.Post = Post;
db.Hashtag = Hashtag;

User.init(sequelize);
Comment.init(sequelize);
Image.init(sequelize);
Hashtag.init(sequelize);
Post.init(sequelize);

User.associate(db);
Comment.associate(db);
Image.associate(db);
Hashtag.associate(db);
Post.associate(db);

// User.sync({ force: true });
// Comment.sync({ force: true });

module.exports = db;
