const PORT = process.env.PORT || 3000
var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')
const https = require('https')
var fs = require('fs')
var cookieParser = require('cookie-parser')

// importing routes
var keys = require('./configs/keys')
var authRoutes = require('./routes/auth-routes')
var registerRoutes = require('./routes/register-routes')
var profileRoutes = require('./routes/profile-routes')
var addSnippetRoutes = require('./routes/addSnippet-routes')
var allSnippetsRoutes = require('./routes/allSnippets-routes')
var editSnippetRoutes = require('./routes/editSnippet-routes')
var deleteRoutes = require('./routes/delete-routes')
var loginRoutes = require('./routes/login-routes')

var app = express()

// connect to mongodb
mongoose.connect(keys.mongodb.dbURL, () => {
  console.log('Connected to mongoose')
})
mongoose.Promise = global.Promise

// set up view engine
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.static('views'))
app.use(cookieParser())

// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// set up session cookies
app.use(session({
  secret: 'abc',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}))

// using flash
app.use(flash())
app.use(function (req, res, next) {
  res.locals.success = req.flash('success')
  res.locals.errors = req.flash('error')
  next()
})

app.use(function (req, res, next) {
  if (req.secure) {
    next()
  } else {
    res.redirect('https://' + req.headers.host + req.url)
  }
})

// set up routes (middleware)
app.use('/auth', authRoutes)
app.use('/register', registerRoutes)
app.use('/profile', profileRoutes)
app.use('/add_snippet', addSnippetRoutes)
app.use('/all_snippets', allSnippetsRoutes)
app.use('/edit_snippet', editSnippetRoutes)
app.use('/delete_snippet', deleteRoutes)
app.use('/login', loginRoutes)

// route for the homepage
app.get('/', (req, res) => {
  res.render('home', { user: req.user })
})

// listen to port nb
https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app).listen(PORT, () => {
  console.log('App server running on port %s', PORT)
})
https.createServer(app).listen(8080)

module.exports = app
