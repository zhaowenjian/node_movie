
//入口编码
var _ = require('underscore')
var express = require('express')
var app = express()
var morgan = require('morgan')
var connect = require('connect')


app.locals.moment = require('moment')

var path = require('path')

var models_path = __dirname + '/app/models'

var mongoose = require('mongoose')
//var Movie = require('./app/models/movie') 
require('./app/models/movie')
require('./app/models/comment')

//body-parser
var bodyParser = require('body-parser')
//parse application/x-www-form-urlcoded
app.use(bodyParser.urlencoded({extended: true}))
//parse application.json
app.use(bodyParser.json())

var PORT = 3000
PORT = process.env.PORT || PORT

var dbUrl = 'mongodb://localhost:27017/imooc'
mongoose.connect( dbUrl, function(){
    console.log('Connect to mongodb use imooc....')
})

//解析cookie，express4.x后，session不依赖于cookieParser
var cookieParser = require('cookie-parser')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)

if( 'development' === app.get('env') ) {
    app.set('showStackError', true)
    app.use(morgan(':method :url :status :response-time ms - :res[content-length]'))
    //app.use(morgan('combined'))
    //app.use(morgan(':method :url :status'))
    app.locals.pretty = true
}

app.use(express.static( path.join( __dirname, 'public') ) )
app.set( 'view engine', 'jade')
app.set( 'views', './app/views/pages')

//app.use(cookieParser)
app.use(session({
    secret: 'imooc',
    resave: false,
    key: 'imooc',//cookie name  
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days  
    saveUninitialized: false,
    store: new MongoStore({
        url: dbUrl,
        collection: 'sessions'
    })
}))

app.listen( PORT, function(){
    console.log('Server listening at ' + PORT + '.....')
});

require('./config/route.js')(app)






