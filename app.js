var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});
// connection configurations
var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'chanchal',
    password: 'karmayoga',
    database: 'testdb'
});

// connect to database
dbConn.connect(); 

// Retrieve all users 
app.get('/users', function (req, res) {
    dbConn.query('SELECT * FROM crud', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
});

// Retrieve user with id 
app.get('/user/:id', function (req, res) {
    let user_id = req.params.id;
    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }

    dbConn.query('SELECT * FROM crud where id=?', user_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'users list.' });
    });

});
app.post('/user', function (req, res) {
    let user = req.body.user;
    if (!user) {
      return res.status(400).send({ error:true, message: 'Please provide user' });
    }
   dbConn.query("INSERT INTO crud SET ? ", { user: user }, function (error, results, fields) {
  if (error) throw error;
    return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
    });
});

//  Update user with id
// app.put('/user', function (req, res) {
//     let user_id=re.params.id;
//     let name = req.body.name;
//     let email=req.body.email;
//     let date=req.body.created_at;
//     if (!user_id) {
//         return res.status(400).send({ error: user, message: 'Please provide user and user_id' });
//     }
//     var sql="UPDATE crud SET name = '"+ name +"', email='"+ email +"', created_at='"+ date +"' WHERE id = user_id"
//     dbConn.query(sql, function (error, results, fields) {
//         if (error) throw error;
//         return res.send({ error: false, data: results, message: 'user has been updated successfully.' });
//     });
// });

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

