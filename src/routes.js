const express = require('express');
const routes = express.Router();
const multer = require('multer');

const uploadConfig = require('./config/upload');

const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

const upload = multer(uploadConfig);

routes.get('/api/posts', PostController.index);
routes.post('/api/posts', upload.single('image'), PostController.store);

routes.post('/api/posts/:id/like', LikeController.store);

module.exports = routes;