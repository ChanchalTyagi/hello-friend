var http = require("http");
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

//start mysql connection
var connection = mysql.createConnection({
  host     : 'localhost', 
  user     : 'chanchal', 
  password : 'karmayoga', 
  database : 'testdb' 
});

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
});

app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({     
  extended: true
}));

var server = app.listen(3000,function (err) {
    if(!err)
  console.log("Your server is running at 3000")
});

//rest api to get all results
app.get('/employees', function (req, res) {
   connection.query('select * from employee', function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

//rest api to get a single employee data
app.get('/employees/:id', function (req, res) {
   console.log(req);
   connection.query('select * from employee where id=?', [req.params.id], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

//rest api to create a new record into mysql database
app.post('/employees', function (req, res) {
   var postData  = req.body;
   connection.query('INSERT INTO employee SET ?', postData, function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

//rest api to update record into mysql database
app.put('/employees', function (req, res) {
   connection.query('UPDATE `employee` SET `employee_name`=?,`employee_salary`=?,`employee_age`=? where `id`=?', [req.body.employee_name,req.body.employee_salary, req.body.employee_age, req.body.id], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

//rest api to delete record from mysql database
app.delete('/employees', function (req, res) {
   console.log(req.body);
   connection.query('DELETE FROM `employee` WHERE `id`=?', [req.body.id], function (error, results, fields) {
	  if (error) throw error;
	  res.end('Record has been deleted!');
	});
});



