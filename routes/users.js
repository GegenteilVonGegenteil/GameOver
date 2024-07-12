const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
//for checking if the user is logged in, protects routes
const authenticationService = require("../services/authentication");
const multer = require('multer');
const path = require('path');
const upload = multer({
    dest: path.join(__dirname, '../static/tmpImage'), // temporary upload directory
});

// Route for /users, isn't rendered anywhere, just for fetching data
router.get("/", authenticationService.authenticateJWT, userController.getAllUsers);

// Route for the /users/admin, admins can view all users, checks if the user is an admin
router.get("/admin", authenticationService.authenticateJWT, authenticationService.checkAdmin, userController.getAllUsersForView);
// Route fot /users/:id, used for viewing a user's profile
router.get("/:id", authenticationService.authenticateJWT, userController.getUser);
// Route for /users/new, used to render the form for creating a new user
router.get("/:id/edit", authenticationService.authenticateJWT, authenticationService.checkPermission, userController.editUser);
// Route for POST request to update user
router.post("/:id", authenticationService.authenticateJWT, authenticationService.checkPermission, upload.single('new_profile_pic'), userController.updatePic, userController.updateUser)
// Route for POST request to delete user
router.post("/:id/delete", authenticationService.authenticateJWT, authenticationService.checkPermission, userController.deleteUser);

module.exports = router;