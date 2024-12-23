const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api.controller');

// Define routes
router.get('/posts', apiController.getAllPosts);
router.post('/posts', apiController.createPost);
router.get('/posts/:id', apiController.getPostById);
router.put('/posts/:id', apiController.updatePost);
router.delete('/posts/:id', apiController.deletePost);

module.exports = router;