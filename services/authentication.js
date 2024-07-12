const jwt = require('jsonwebtoken');
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const bcrypt = require('bcrypt');
const {getUserById} = require("../models/userModel");

async function authenticateUser({ username, password }, users, res) {
    const user = users.find(u => {
        return u.dataValues.username === username
    });
    // compare the password with the hashed password & check if there was a user found in the database result
    if (user && await checkPassword(password, user.password)) {
        const accessToken = jwt.sign({ id: user.userId, name: user.username, admin: user.is_admin}, ACCESS_TOKEN_SECRET);
        // set the cookie with the token
        res.cookie('accessToken', accessToken, { maxAge: 900000000 });
        res.redirect('/consoles');
    } else {
        res.send('Username or password incorrect');
    }
}

async function authenticateUserEdit({ username, password }, users, res) {
    const user = users.find(u => {
        return u.dataValues.username === username
    });
    // compare the password with the hashed password & check if there was a user found in the database result
    if (user && (password === user.password)) {
        const accessToken = jwt.sign({ id: user.userId, name: user.username , admin: user.is_admin}, ACCESS_TOKEN_SECRET);
        // set the cookie with the token
        res.cookie('accessToken', accessToken, { maxAge: 900000000 });
        res.redirect('/profile');
    } else {
        res.send('Username or password incorrect');
    }
}


function authenticateJWT(req, res, next) {
    /*
    This function will validate the JWT token that is stored in the cookie.
    If the token is valid, the user object will be added to the request object and the next middleware function will be called.
    If the token is invalid, a 403 status code will be sent.
    If there is no token, a 401 status code will be sent.
    */
    const token = req.cookies["accessToken"];

    if (token) {
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.redirect("/login");
    }
}

async function checkPassword(password, hash) {
    /*
    This function will compare the password with the hashed password.
     */
    let pw = await bcrypt.compare(password, hash);
    return pw;
}

function hashPassword(password) {
    /*
    This function will hash a given password.
     */
    return bcrypt.hashSync(password, 10);
}


function checkUser (req, res, next){
    /*
        checks if user is logged in and passes user object to views
        used in app.js
        needed for the header, but also to check if the users an admin for some buttons
     */
    const token = req.cookies["accessToken"];

    if (token) {
        jwt.verify(token, ACCESS_TOKEN_SECRET, async (err, user) => {
            if (err) {
                console.log(err.message);
                res.locals.currentuser = null;
                next();
            } else {
                user = await getUserById(user.id)
                res.locals.currentuser = user;
                next();
            }
        });
    } else {
        res.locals.currentuser = null;
        next();
    }
}


function checkAdmin (req, res, next) {
    /*
       checks if user is admin
       protects the /users/admin route
    */
    const token = req.cookies["accessToken"];

    if (token) {
        jwt.verify(token, ACCESS_TOKEN_SECRET, async (err, admin) => {
            if (err) {
                console.log(err.message);
                res.redirect('/consoles');
            } else {
                admin = await getUserById(admin.id)
                if (admin.is_admin) {
                    next();
                } else {
                    res.redirect('/consoles');
                }
            }
        });
    }
}

function checkPermission (req, res, next) {
    /*
       checks if user is admin or the user they are editing
       protects the /users/edit route
    */
    const token = req.cookies["accessToken"];

    if (token) {
        jwt.verify(token, ACCESS_TOKEN_SECRET, async (err, user) => {
            if (err) {
                res.redirect('/');
            } else if (user.id === parseInt(req.params.id) || user.admin) {
                next();
            } else {
                res.redirect('/');
            }
        });
    }
}

module.exports = {
    authenticateUser,
    authenticateUserEdit,
    authenticateJWT,
    hashPassword,
    checkUser,
    checkAdmin,
    checkPermission
}