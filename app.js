const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt')
const db = require('./models/models');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const moment = require('moment');
const config = require('./others/config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');
const webpack = require('webpack');

const compiler = webpack(webpackConfig);


mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost/shop`);




app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname,'app/src')));

app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: webpackConfig.output.publicPath}));
app.use(webpackHotMiddleware(compiler));


app.use(session({ 
	secret: 'hijklfjef{-+kijhyddss',
	resave: true,
	saveUninitialized: false,
	store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'app/src/uploads'+req.path);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg') 
  }
})

app.get('/*', (req,res)=>{
  res.sendFile(path.join(__dirname, 'app/index.html'))
})

app.post('/logged', (req, res)=>{
  jwt.verify(req.body.token, 'Iamafuckingcat',(err)=> {
    if(err){
      res.json({
        logged: false
      });
    }else
      res.json({
        logged: true
      });
  })
});

app.get('/inscription', function(req, res){
  if(!req.session.user){
	res.render('inscription', {
	  url : req.url
	});
  }
  else {
	res.redirect('/');
  }
});

app.post('/inscription', multer({storage: storage}).single('photo'), function(req, res){
  var user = new db.user({
  	email: req.body.email,
	password: req.body.password,
	name: req.body.name,
	lastName: req.body.lastName,
	lycee: req.body.lycee,
	photo: req.file.filename
  });
  user.save((err) => {
  	if(err) res.json({
      err: true,
      message: err});
  	else {
      res.json({
      err: false,
      message: 'account has been created successfuly'});
    }
  })
});




app.post('/login', function(req, res){
  db.user.findOne({email: req.body.email}).catch((err) => {if(err)console.log(err);}).then((user) => {
  	if(user) {
  		if(user.compPass(req.body.password)){
  			var token = jwt.sign({token: user._id}, 'Iamafuckingcat');
  			res.json({
          err: false,
          message: 'logged in successfuly',
          token: token,
          user: user
        });
  		}
  		else {
  			res.json({
          err: true,
          message: 'password is wrong'
        });
  		}
  	}
  	else {
  		res.json({
        err: true,
        message: 'email does not exist'
      });
  	}
  });

});


app.use(expressjwt({secret:'Iamafuckingcat'}),(req, res, next)=>{
  var duration = moment.utc(new Date()).diff(moment.unix(req.user.iat), 'minutes');
  if(duration > 15) {
     req.newtoken = jwt.sign({token: req.user.token}, 'Iamafuckingcat', {expiresIn: 60*30});
  } 
  next();   
});

app.get('/test', (req, res)=>{
  res.json({
    test: 'test',
    token: req.newtoken
  });
});



app.get('/time', (req, res)=>{
  console.log(moment.utc(new Date()).diff(moment.unix(req.user.iat), 'minutes'));
  res.send('hey');
});


app.get('/logout', function(req, res){
  delete req.session.destroy((err)=>{
  	if(err) console.log(err);
  	res.redirect('/login')
  });
});


app.get('/home', function(req, res){
  	db.user.findOne({_id: req.user.token}).then((user) => {
  		user.password = undefined;
  		db.item.find().populate('user').catch((err) => {if(err)console.log(err);}).then((items) => {
  			res.json({
  				user: user,
  				items: items,
          token: req.newtoken
  			});
  		});
	});	
});

app.get('/add', function(req, res){
  if(req.session.user){
	res.render('add', {
	url: req.url
	});
  }
  else {
	res.redirect('/login');
  }

});

app.post('/item', multer({storage: storage}).single('photo'), function(req, res){
  db.item.create({
  	user: req.user.token,
  	title: req.body.title,
  	description: req.body.description,
	price: req.body.price,
	category: req.body.category,
	photo: req.file.filename
  }).then(() => {
  	res.json({
      err: false,
      message: 'success',
      token: req.newtoken
    });
  });
});

app.get('/:category', function(req, res){
	db.user.findOne({_id: req.user.token}).catch((err) => {if(err)console.log(err);}).then((user) => {
		db.item.find({
			category: req.params.category.toLowerCase()
		}).populate('user').catch((err)=>{if(err)console.log(err);}).then((items) => {
			res.json({
        err: false,
				items: items,
				user: user
			})
		});
	});

});

mongoose.connection.once('open', () => {	
  app.listen(5000, function(){
	console.log('Server listening on port 5000')
  });
});
