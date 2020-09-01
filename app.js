//use path module
const path = require('path');
var fs = require('fs');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');
//use mysql database
const mysql = require('mysql');
const app = express();
const port = 5000
const router = express.Router();

app.use(bodyParser.urlencoded({extended: false}))

app.set('view engine', 'pug')


app.get('/',function(req,res){
	res.sendfile('index.html')
});
router.get('/quiz', function(req, res){
	res.sendfile('quiz.html');

});

app.get('/',function(req,res){
	res.sendfile('thnkyou.html');
});


app.use(express.static('./public'))

	
var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'nodejs_login'
});
connection.connect(function(err){
	if (err) throw err;
	console.log('connected');
});
app.post('/submit', function (req, res) {
	console.log(req.body);
	
	var sql = "insert into login values('"+ req.body.email +"',"+ req.body.password +")";
	
	
	
	connection.query(sql, function (err){
	if (err) throw err;
	res.render('index', { title: 'data Saved',
	message: 'WELCOME TO QUIZ.'})
	});
	
	
	connection.end();
})


//add the router
app.use('/', router);

	
//server listening
app.listen(5000, () => {
  console.log('Server is running at port 5000');
});