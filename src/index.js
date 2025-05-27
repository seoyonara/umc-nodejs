import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import {
  handleUserSignUp,
  handlePostReviews,
  handlePostMissons,
  handleStoreReviewList,
  handleUserReviewList,
  handleStoreMissionList,
  handleUserMissionList,
  handleMissionClear,
} from './controllers/user.controllers.js';
import swaggerAutogen from 'swagger-autogen';
import swaggerUiExpress from 'swagger-ui-express';

import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import session from 'express-session';
import passport from 'passport';
import { googleStrategy } from './auth.config.js';
import { prisma } from './db.config.js';

dotenv.config();

passport.use(googleStrategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

const app = express();
const port = process.env.PORT;

app.use(cors()); // cors 방식 허용
app.use(express.static('public')); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: 'SUCCESS', error: null, success });
  };

  res.error = ({ errorCode = 'unknown', reason = null, data = null }) => {
    return res.json({
      resultType: 'FAIL',
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});

app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, // ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  console.log(req.user);
  res.send('Hello World!');
});

app.post('/signin', handleUserSignUp);
app.post('/reviews', handlePostReviews);
app.post('/missions', handlePostMissons);

app.get('/reviews/stores/:storeId', handleStoreReviewList);
app.get('/reviews/users/:userId', handleUserReviewList);
app.get('/missions/stores/:storeId', handleStoreMissionList);
app.get('/missions/users/:userId', handleUserMissionList);
app.patch('/missions/:userMissionId/clear', handleMissionClear);

app.get('/oauth2/login/google', passport.authenticate('google'));
app.get(
  '/oauth2/callback/google',
  passport.authenticate('google', {
    failureRedirect: '/oauth2/login/google',
    failureMessage: true,
  }),
  (req, res) => res.redirect('/')
);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || 'unknown',
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use(
  '/docs',
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(
    {},
    {
      swaggerOptions: {
        url: '/openapi.json',
      },
    }
  )
);

app.get('/openapi.json', async (req, res, next) => {
  // #swagger.ignore = true
  const options = {
    openapi: '3.0.0',
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = '/dev/null'; // 파일 출력은 사용하지 않습니다.
  const routes = ['./src/index.js'];
  const doc = {
    info: {
      title: 'UMC 8th',
      description: 'UMC 8th Node.js 테스트 프로젝트입니다.',
    },
    host: 'localhost:3000',
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});
