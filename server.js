var user;
var express = require('express');
var app = express();
var connect = require('connect');
//var session = require('express-session');
//var cookieparser = require('cookie-parser');
var bodyparser = require('body-parser');
//var passport = require('passport')
//  , LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
mongoose.connect('mongodb://sfora444:shodan12@ds051750.mongolab.com:51750/heroku_app30554203');
mongoose.connection.on('error', function(err){console.log('to jest blad' + err)});

var memoSchema = mongoose.Schema({
    waga: Number,
    prioryt: Number,
    priorytet: String,
    czaskreacji: Number,
    czasdeadlinu: Number,
    nowyid: Number,
    tytul: String,
    idnad: Number,
    posx: Number,
    posy: Number,
    kolor: {r:Number,g: Number,b:Number,a:Number},
    datalancuch: String,
    user: String
})


var Notkat = mongoose.model('Notkat', memoSchema);

var userSchema = mongoose.Schema({
    iduser: String,
    password: String
})

var Uzytkownik = mongoose.model('Uzytkownik', userSchema);

//tu pieprzony passport
//passport.use(new LocalStrategy(
//  function(username, password, done) {
//    Uzytkownik.findOne({ iduser: username }, function (err, user) {
//      if (err) { return done(err); }
//      if (!user) {
//        return done(null, false);
//      }
//      if (user.password!=password) {// tu zjebane
//        return done(null, false);
//      }
//      return done(null, user);
//    });
//  }
//));


app.use(connect.json());
//app.use(cookieparser());
app.use(bodyparser());
//app.use(session({ secret: 'winter15coming' }));
//app.use(passport.initialize());
//app.use(passport.session());

//passport.serializeUser(function(user, done) {
//  done(null, user);
//});
// 
//passport.deserializeUser(function(user, done) {
//  done(null, user);
//});


app.get('/test', function(req, res, next){
  res.sendfile("./test.html");
});

app.get('/wpisywanie', function(req, res) {
  res.sendfile('wpisywanie.html');
});

//app.get('/kasuj', function(req,res,next) {
//    Notkat.remove({'idnad':req.query.id},function(err,Notkat){console.log(err+"blad kasowania")})
//res.end();}       
//)

app.get('/',function(req, res) {
    res.sendfile('./index.html');
});

app.get('/memor',function(req, res) {
    res.sendfile('./index.html');
});

app.get('/hider',function(req, res, next) {
//    for (var keys in req.hiders){
//    console.log(req.headers['user-agent']+" takietam");
//    res.end();}
    console.log(req.headers['user-agent']+" takietam")
    res.end();
});

app.get("/dawajusera", function(req,res){
    res.send(req.user)})

app.get('/notkiget', function(req, res)
        {Notkat.find({'user':req.user.iduser},function(err, notkatab)
                     {if (err)
                     {console.log(err+"taki err przy notkiget")}                 
                    
                        res.send(notkatab);}
                     
                     
                     )});

app.get('/logika.js', function(req, res) {
    res.sendfile('./logika.js');
});

//
//app.post('/wpis',passport.authenticate('local'),
//         function(req,res,user){
//if (user)
//{     res.sendfile('./index.html');}
//         
//         });




//
//function isLogged(req,res,user){
//if (user)
//{res.redirect('/memor');}}



app.listen(process.env.PORT || 8080);
