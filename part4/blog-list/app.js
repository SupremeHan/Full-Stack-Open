const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const blogListRouter = require('./controllers/bloglist');
app.use('/api/blogs', blogListRouter);

module.exports = app;
