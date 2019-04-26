var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


  const asyncMiddleware = fn =>
  (req, res, next) => {
      async function go(){
        try{
          await fn(req, res, next)
        }catch(e){
          console.log('catch');
          console.log(e);
          res.send(e)
        }
      }
      go()  
  };
  const post = async (req, res, next)=>{
    await timeout(req, res,next)
    await timeout2(req, res,next)
  }
  const timeout2 = async (req, res, next)=>{
   
    console.log('timeout2');
    setTimeout(()=>{
      res.send('timeout2')
    },1000)
    
  }
  const timeout = async (req, res, next)=>{
    
   return new Promise(async function(resolve,reject){
    setTimeout(()=>{
      console.log(234355);
      
      return reject('error')
     },5500)
     setTimeout(()=>{
      console.log(111);
      return resolve('test info')
     },3000)
     
   })
 }
var router = express.Router();
app.use(router)
router.get('/test', asyncMiddleware(post));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
