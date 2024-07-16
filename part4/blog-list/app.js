const express = require('express');
require('express-async-errors');
const cors = require('cors');
const middleware = require('./utils/middleware');

const app = express();

app.use(cors());
app.use(express.json());
// app.use(middleware);

const blogListRouter = require('./controllers/bloglist');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

app.use('/api/blogs', middleware, blogListRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

module.exports = app;
