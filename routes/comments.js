const express = require('express');
const router = express.Router();

const commentController = require('../controllers/commentController');
const authenticationService = require('../services/authentication');

// we just need a route to create a comment, the other data fetching will be done in the game/console route
// adding the middleware manually to all the functions, so we can control specific routes to be protected
router.post('/', authenticationService.authenticateJWT, commentController.createComment);
router.post('/:id', authenticationService.authenticateJWT, commentController.deleteComment);


module.exports = router;