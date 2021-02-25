// var express = require('express');
// var app = express();
// var bodyParser = require('body-parser');
// var mysql = require('mysql');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: true
// }));

// app.get('/', function (req, res) {
//     return res.send({ error: true, message: 'hello' })
// });

// // Connection to database MySql
// var db = mysql.createConnection({
//     host: 'localhost',
//     user: 'chanchal',
//     password: 'karmayoga',
//     database: 'testdb'
// });

// // connect to database
// db.connect((err) => {
//     if (!err)
//         console.log('DB connection succeded.');
// });

// //I created a table named crud in database testdb with id,name,email,created_at(date).

// // To display all the users present in the database
// app.get('/users', function (req, res) {
//     db.query('SELECT * FROM crud', function (error, results, fields) {
//         if (error) throw error;
//         return res.send({ error: false, data: results, message: 'All Users list.' });
//     });
// });

// // Retrieve user with given id
// app.get('/user/:id', function (req, res) {
//     let user_id = req.params.id;
//     if (!user_id) {
//         return res.status(400).send({ error: true, message: 'Please provide user id' });
//     }

//     db.query('SELECT * FROM crud where id=?', user_id, function (error, results, fields) {
//         if (error) throw error;
//         return res.send({ error: false, data: results[0], message: 'All Users list.' });
//     });

// });

// // To add to user with given information
// app.post('/user', function (req, res) {
//     if (!req.body) {
//       return res.status(400).send({ error:true, message: 'Please provide data' });
//     }
//     var sql="INSERT INTO crud (name,email) VALUES ('"+ req.body.name +"','"+ req.body.email +"');"
//    db.query(sql, function (error, results, fields) {
//   if (error) throw error;
//     return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
//     });
// });

// // To update a user with given information
// app.put('/user', function (req, res) {
//     let user_id = req.body.user_id;
//     let user = req.body.user;
//     if (!user_id || !user) {
//       return res.status(400).send({ error: user, message: 'Please provide user and user_id' });
//     }
//     db.query("UPDATE crud SET user = ? WHERE id = ?", [user, user_id], function (error, results, fields) {
//       if (error) throw error;
//       return res.send({ error: false, data: results, message: 'user has been updated successfully.' });
//      });
//     });

// // To delete a particular user with given id    
// app.delete('/user/:id', function (req, res) {
//     let user_id = req.params.id;
//     if (!user_id) {
//         return res.status(400).send({ error: true, message: 'Please provide user_id' });
//     }
//     db.query('DELETE FROM crud WHERE id = ?', [user_id], function (error, results, fields) {
//         if (error) throw error;
//         return res.send({ error: false, data: results, message: 'User has been deleted successfully.' });
//     });
// }); 

// // set port
// app.listen(3000, function () {
//     console.log('Node app is running on port 3000');
// });

var http = require("http");
var express = require('express');
var app = express();
var mysql      = require('mysql');
var bodyParser = require('body-parser');

//start mysql connection
var connection = mysql.createConnection({
  host     : 'localhost', //mysql database host name
  user     : 'chanchal', //mysql database user name
  password : 'karmayoga', //mysql database password
  database : 'testdb' //mysql database name
});

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
})
//end mysql connection

//start body-parser configuration
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//end body-parser configuration

//create app server
var server = app.listen(3000,function (err) { bb
    if(!err)
  console.log("Your server is running at port 3000")
});

//rest api to get all results are ryeb
app.get('/employees', function (req, res) {
   connection.query('select * from chanchal', function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

//rest api to get a single employee data
app.get('/employees/:id', function (req, res) {
   console.log(req);
   connection.query('select * from chanchal where id=?', [req.params.id], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

//rest api to create a new record into mysql database
app.post('/employees', function (req, res) {
   var data  = req.body;
   connection.query('INSERT INTO chanchal SET ?', data, function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

//rest api to update record into mysql database
app.put('/employees', function (req, res) {
   connection.query('UPDATE `chanchal` SET `employee_name`=?,`employee_salary`=?,`employee_age`=? where `id`=?', [req.body.employee_name,req.body.employee_salary, req.body.employee_age, req.body.id], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

//rest api to delete record from mysql database
app.delete('/employees', function (req, res) {
   console.log(req.body);
   connection.query('DELETE FROM `chanchal` WHERE `id`=?', [req.body.id], function (error, results, fields) {
	  if (error) throw error;
	  res.end('Record has been deleted!');
	});
});
