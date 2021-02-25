var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});

// Connection to database MySql
var db = mysql.createConnection({
    host: 'localhost',
    user: 'chanchal',
    password: 'karmayoga',
    database: 'testdb'
});

// connect to database
db.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
});

//I created a table named crud in database testdb with id,name,email,created_at(date).

// To display all the users present in the database
app.get('/users', function (req, res) {
    dbConn.query('SELECT * FROM crud', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'All Users list.' });
    });
});

// Retrieve user with given id
app.get('/user/:id', function (req, res) {
    let user_id = req.params.id;
    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide user id' });
    }

    dbConn.query('SELECT * FROM crud where id=?', user_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'All Users list.' });
    });

});

// To add to user with given information
app.post('/user', function (req, res) {
    let user = req.body.user;
    if (!user) {
      return res.status(400).send({ error:true, message: 'Please provide data' });
    }
   dbConn.query("INSERT INTO crud SET ? ", { user: user }, function (error, results, fields) {
  if (error) throw error;
    return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
    });
});

// To update a user with given information
app.put('/user', function (req, res) {
    let user_id = req.body.user_id;
    let user = req.body.user;
    if (!user_id || !user) {
      return res.status(400).send({ error: user, message: 'Please provide user and user_id' });
    }
    dbConn.query("UPDATE users SET user = ? WHERE id = ?", [user, user_id], function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'user has been updated successfully.' });
     });
    });

// To delete a particular user with given id    
app.delete('/user/:id', function (req, res) {
    let user_id = req.params.id;
    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
    dbConn.query('DELETE FROM crud WHERE id = ?', [user_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'User has been deleted successfully.' });
    });
}); 

// set port
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});

