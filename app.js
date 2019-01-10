require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const hbs = require('express-handlebars')
const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const bookRouter = require('./routes/book')
const commentRouter = require('./routes/comment')
const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(expressSession({secret: "helloworld", saveUninitialized: true, resave: true}))

app.engine('handlebars', hbs({
  defaultLayout: 'main',
  helpers: {
    section: function(name, options) {
      if(!this._sections) this._sections = {}
      this._sections[name] = options.fn(this)
      return null
    },
    choose: (a, b) => (a ? a : b)
  }
}))
app.set('view engine', 'handlebars')

app.use('/user', userRouter)

app.use('/book', bookRouter)

app.use('/api/comment', commentRouter)

app.use('/', indexRouter)

// app.use((err, req, res, next) => res.render('404'))

app.listen(port, () => console.log(`App listening on port ${port}!`))
