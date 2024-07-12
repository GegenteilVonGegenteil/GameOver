const express = require("express");
const app = express();
const port = 3000;
const db = require('./services/database.js')
const ws = require('./services/websockets.js')
const fs = require('fs');
const morgan = require('morgan');

const path = require('path');
const ejs = require('ejs');

//info for views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//so cookies can be used (in all routes)
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//for logging in the right directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, './logs/request.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('short'));

//for parsing the body of the request
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//sets routes for the website
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const consolesRouter = require("./routes/consoles");
const gamesRouter = require("./routes/games");
const commentsRouter = require("./routes/comments");
const {checkUser} = require("./services/authentication");

//checks on all pages if the user is logged in (this is for the header)
app.get('*', checkUser)

//sets the routes
app.use('/', indexRouter);
app.use('/users/', usersRouter);
app.use('/consoles/', consolesRouter);
app.use('/games/', gamesRouter);
app.use('/comments/', commentsRouter);

//error handling
function errorHandler(err, req, res, next) {
  res.render('error', { error: err })
}

app.use(errorHandler);

//sets the static folder
app.use(express.static('static'));

//logs the port of instance
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

