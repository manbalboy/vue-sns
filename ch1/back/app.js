/**
 * @author : manbalboy <manbalboy@hanmail.net>
 * @version 0.0.1
 */

const express = require('express');
const nunjucks = require('nunjucks');
const logger = require('morgan');
const db = require('./models');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerOptions = require('./swagger');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors');
const passportConfig = require('./passport');

passportConfig();

const dotenv = require('dotenv');
dotenv.config(); //LOAD CONFIG

class App {
    constructor() {
        this.app = express();

        // db 접속
        this.dbConnection();

        // 뷰엔진 셋팅
        this.setViewEngine();

        // 미들웨어 셋팅
        this.setMiddleWare();

        // 정적 디렉토리 추가
        this.setStatic();

        // 로컬 변수
        this.setLocals();

        // 라우팅
        this.getRouting();

        // 404 페이지를 찾을수가 없음
        this.status404();

        // 에러처리
        this.errorHandler();
    }

    dbConnection() {
        // DB authentication
        db.sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
                // return db.sequelize.sync();
            })
            .then(() => {
                /*
                 * User.sync() -테이블이 존재하지 않는 경우 생성합니다 (이미 존재하는 경우 아무 작업도 수행하지 않음).
                 * User.sync({ force: true }) -테이블이 생성되고 이미 존재하는 경우 먼저 삭제합니다.
                 * User.sync({ alter: true }) -데이터베이스에있는 테이블의 현재 상태 (보유 컬럼, 데이터 유형 등)를 확인한 다음 테이블에서 필요한 변경을 수행하여 모델과 일치시킵니다.
                 */
                db.sequelize.sync({ alter: true });
                console.log('DB Sync complete.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
    }

    setMiddleWare() {
        // 미들웨어 셋팅
        //swagger settting
        const specs = swaggerJsdoc(swaggerOptions);
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

        this.app.use(logger('dev'));
        //body parser setting
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));

        //cookieparser setting
        this.app.use(cookieParser(process.env.COOKIE_SECRET));

        //express-session setting
        this.app.use(
            session({
                resave: false,
                saveUninitialized: false,
                secret: process.env.COOKIE_SECRET,
                cookie: {
                    httpOnly: true,
                    secure: false,
                },
            }),
        );

        //passport setting
        this.app.use(passport.initialize());
        this.app.use(passport.session());

        //cors
        this.app.use(
            cors({
                origin: true,
                credentials: true,
            }),
        );
    }

    setViewEngine() {
        nunjucks.configure('template', {
            autoescape: true,
            express: this.app,
        });
    }

    setStatic() {
        this.app.use('/uploads', express.static('uploads'));
    }

    setLocals() {
        // 템플릿 변수
        this.app.use((req, res, next) => {
            this.app.locals.isLogin = true;
            this.app.locals.req_path = req.path;
            next();
        });
    }

    getRouting() {
        this.app.use(require('./controllers'));
        this.app.get('/favicon.ico', (req, res) => res.status(204).end());
    }

    status404() {
        // eslint-disable-next-line no-unused-vars
        this.app.use((req, res, _) => {
            res.status(404).json({ msg: 404 });
        });
    }

    errorHandler() {
        // eslint-disable-next-line no-unused-vars
        this.app.use((err, req, res, _) => {
            console.log(err);
            res.status(500).send(err);
        });
    }
}

module.exports = new App().app;
