const express = require('express');
require('express-async-errors');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const blogListRouter = require('./controllers/bloglist');
const usersRouter = require('./controllers/users');

app.use('/api/blogs', blogListRouter);
app.use('/api/users', usersRouter);

module.exports = app;
