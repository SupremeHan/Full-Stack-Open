const express = require('express');
require('express-async-errors');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const blogListRouter = require('./controllers/bloglist');
app.use('/api/blogs', blogListRouter);

module.exports = app;
