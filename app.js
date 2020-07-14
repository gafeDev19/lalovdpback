import express from 'express';
import session from 'express-session';
import redis from 'redis';
const redisStore = require('connect-redis')(session);
const client  = redis.createClient();
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
// import path from 'path';

const app = express();
dotenv.config();
// Middleware
app.use(session({
  secret: '5c539542c5f33a5cbe00eb71265e1ba3',
  store: new redisStore({ host: 'localhost', port: 6379, client: client, ttl : 260}),
  saveUninitialized: true,
  resave: true
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

// Middleware para Vue.js router modo history
// const history = require('connect-history-api-fallback');
// app.use(history());
// app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
  console.log(`Lalo VDP app listening on ${app.get('port')}`)
});