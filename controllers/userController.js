const userModel = require("../models/userModel");
const commentModel = require("../models/commentModel");
const gameModel = require("../models/gameModel");
const authentication = require("../services/authentication")
const authenticationService = require("../services/authentication");
const {v6: uuidv6} = require("uuid");
const multer = require('multer');
const path = require('path');
const upload = multer({
    dest: path.join(__dirname, '../static/tmpImage'), // temporary upload directory
});
const fs = require("node:fs");
const {getUserById} = require("../models/userModel");

// gets all users from the user model, used for authentication and such
function getAllUsers() {
    return userModel.getAllUsers()
}

// gets all users from the user model, used for viewing all users in admin view
function getAllUsersForView(req, res, next) {
    userModel.getAllUsers()
        .then(users => res.render('users', { users }))
        .catch((err) => {
            res.status(404)
            next(err)
        })
}

// sends new user data to the user model to create a new user, redirects to login page
function createUser(req, res, next) {
    userModel.createUser(req.body)
        .then(() => res.redirect('/login'))
        .catch((err) => {
            res.status(404)
            next(err)
        })
}

// gets all Comments of the user, all games and the user by id, for user page, renders profile instead of user if the user is the current user
function getUser(req, res, next) {
        commentModel.getCommentByUser(parseInt(req.params.id))
            .then(comments => {
            gameModel.getAllGames().then(games => {
                userModel.getUserById(parseInt(req.params.id))
                    .then(user => {
                        if (parseInt(req.params.id) === parseInt(res.locals.currentuser.userId)) {
                        res.render("profile", {user, games, comments})
                } else {
                    res.render('user', {user, games, comments})
                }
                })
                    .catch((err) => {
                        res.status(404)
                        next(err)
                    })
            })

        })

}

// Same as getUser, just uses login data instead
function getUserProfile(req, res, next) {
        commentModel.getCommentByUser(parseInt(res.locals.currentuser.userId)).then(comments => {
            gameModel.getAllGames().then(games => {
                userModel.getUserById(parseInt(res.locals.currentuser.userId))
                    .then(user => res.render("profile", {user, games, comments}))
                    .catch((err) => {
                        res.status(404)
                        next(err)
                    })
            })

        })
}

function editUser(req, res, next) {
    userModel.getUserById(parseInt(req.params.id))
        .then(user => res.render('editUser', { user }))
        .catch((err) => {
            res.status(404)
            next(err)
        })
}

async function updatePic(req, res, next) {

    if (req.file) {

        const user = await getUserById(req.params.id)

        // upload profile picture
        // filename line: uuid generated + .jpg (passed original file name)
        // tmpPath = where we store the name for now, target = where we send it
        const fileName = user.profile_pic;
        const tmpPath = req.file.path;


        const targetPath = path.join(__dirname, '../static/uploads', fileName);
        // rename = moving to new path
        await fs.promises.rename(tmpPath, targetPath);
    }

    next()
}

function updateUser(req, res, next) {
    res.cookie('accessToken', '', { maxAge: 0 })
    userModel.updateUser(req.body).then(user => {
            getAllUsers()
            .then((users) => {
                let userData = {
                    username: user.username,
                    password: user.password
                };

                authenticationService.authenticateUserEdit(userData, users, res)
           })
            })
                .catch((err) => {
                res.status(404)
                next(err)

    })

}

function deleteUser(req, res, next) {
    userModel.getUserById(parseInt(req.params.id))
        .then(user => {
            userModel.deleteUser(parseInt(req.params.id))
                .then(() => {
                    commentModel.deleteCommentByUser(parseInt(req.params.id))
                        .then(() => {
                            res.cookie('accessToken', '', { maxAge: 0 })
                            res.redirect('/')
                        })
                })
        })
        .catch((err)=>{
            res.status(404)
            next(err)
        })
}

module.exports = {
    createUser,
    getAllUsers,
    getUser,
    getUserProfile,
    editUser,
    updatePic,
    updateUser,
    deleteUser,
    getAllUsersForView
}