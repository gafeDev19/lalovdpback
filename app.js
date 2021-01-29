const https = require('https')
const fs = require('fs')
import express from 'express';
import session from 'express-session';
import redis from 'redis';
const client  = redis.createClient();
const redisStore = require('connect-redis')(session);
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// import path from 'path';

const app = express();
dotenv.config();
// Middleware
app.use(cookieParser());
app.use(session({
  secret: '5c539542c5f33a5cbe00eb71265e1ba3',
  name: '_redisLalo',
  store: new redisStore({ host: '127.0.0.1', port: 6379, client: client, ttl : 604800}),
  saveUninitialized: false,
  resave: false,
  cookie: { secure: true, maxAge: 604800000, domain: 'lalovdp' }
}));
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', require('./src/routes/user'))
app.use('/api', require('./src/routes/product'))
app.use('/api', require('./src/routes/budget'))
app.use('/api', require('./src/routes/order'))

//Handle production
if(process.env.NODE_ENV === 'production') {
  //Static folder
  app.use(express.static(__dirname + '/public'))

  // Handle SPA
  app.get(/.*/)
}


app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
  console.log(`Lalo VDP app listening on ${app.get('port')}`)
});