const express = require("express");
const userController = require("../controllers/userController");
const authenticationService = require("../services/authentication");
const gameModel = require("../models/gameModel");
const router = express.Router();
const { v6: uuidv6 } = require("uuid");
const multer = require('multer');
const path = require('path');
const upload = multer({
    dest: path.join(__dirname, '../static/tmpImage'), // temporary upload directory
});
const fs = require("node:fs");

// Home page route to render index.ejs
router.get("/", (req, res) => {
    res.render('index');
});

// Route for /login
router.route('/login')
    // GET request to render login.ejs
    .get((req, res) => {
        res.render('login');
    })

    // POST request to authenticate user
    .post((req, res, next) => {
        userController.getAllUsers()
            .then((users) => {
                authenticationService.authenticateUser(req.body, users, res)
            })
            .catch((err) => {
                res.status(404)
                next(err)
            })
    });

// Route for /logout, clear the accessToken cookie and redirect to home page
router.get('/logout', (req, res, next) => {
    res.cookie('accessToken', '', { maxAge: 0 })
    res.redirect('/');
})

// Route for /register
router.route("/register")
    // GET request to render register.ejs
    .get((req, res) => {
        res.render('register');
    })

    // POST request to create a new user
    .post(upload.single('profile_pic'), async (req, res, next) => {

        //overwrite the password with the hashed password
        req.body.password = authenticationService.hashPassword(req.body.password)

        // upload profile picture
        // filename line: uuid generated + .jpg (passed original file name)
        // tmpPath = where we store the name for now, target = where we send it
        const fileName = uuidv6() + path.extname(req.file.originalname).toLowerCase();
        const tmpPath = req.file.path;
        const targetDirectory = path.join(__dirname, '../static/uploads');

        // need a check to make the uploads directory (first time)
        if(!fs.existsSync(targetDirectory)){
            console.log('create directory')
            fs.mkdirSync(targetDirectory, {recursive: true});
        }
        const targetPath = path.join(__dirname, '../static/uploads' , fileName);
        // rename = moving to new path
        await fs.promises.rename(tmpPath, targetPath);

        // save fileName to user db
        req.body.profile_pic = fileName;
        userController.createUser(req, res, next)
    })

// Route for /chat
router.get("/chat", (req, res, next) => {
    //gets all games from the database for the chatrooms
    gameModel.getAllGames()
        //renders the chat.ejs page with the games
        .then((games) => {
            res.render('chat', {games})
        })
        .catch((err)=>{
            console.log(err)
            res.status(404)
            next(err)
        })
});

// Route to the profile page of the logged in user
router.get("/profile", authenticationService.authenticateJWT, userController.getUserProfile)

module.exports = router;