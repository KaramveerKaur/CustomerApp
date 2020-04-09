const pool = require('./dbconnection');
//const bcrypt = require('bcrypt');
var passwordhash = require('password-hash-and-salt');
//const saltRounds = 10;
const jwt = require('jsonwebtoken');

var resultsNotFound = {
  "errorCode": "0",
  "errorMessage": "Operation not successful.",
  "rowCount": "0",
  "data": ""
};
var resultsFound = {
  "errorCode": "1",
  "successMessage": "Operation successful.",
  "rowCount": "1",
  "data": ""
};

module.exports = {
  createCustomer: function (req, res) {
    
    pool.getConnection(function (err, connection) {
      //console.log("error------------pp"+ err +"ppp--------------ppppp");
      //console.log("bodyyyyyyyyyyyyyyy-----8--yyyyy---"+ connection);
      if (err) throw err; // not connected!

      var sqlChk = 'select * from customer where `emailId` = ?';
      var valueschk = [req.body.emailId];
      connection.query(sqlChk, valueschk, function (error, results, fields) {
        if (results != "") {
          resultsNotFound["errorMessage"] = "Email Id aleready exist please sign in to proceed.";
          return res.send(resultsNotFound);
        }
      });
      passwordhash(req.body.password).hash(function (error, hash) {
        var sql = 'INSERT INTO customer SET ?';
        var values = { 'fullName': req.body.fullName, 'emailId': req.body.emailId, 'password': hash, 'gender': req.body.gender,
        'orgName':req.body.orgName,'createdDate': new Date(), 'updatedDate': new Date() }
        
        // Use the connection
        connection.query(sql, values, function (error, results, fields) {
          
          if (error) {
            //console.log(error);
            resultsNotFound["errorMessage"] = "Query error";
            return res.send(resultsNotFound);
          } else return res.send(resultsFound);

          // When done with the connection, release it.
          connection.release(); // Handle error after the release.
          if (error) throw error; // Don't use the connection here, it has been returned to the pool.
        });
      });
    });
  },
  signIn: function (req, res) {
    
    pool.getConnection(function (err, connection) {
      if (err) throw err; // not connected!
        var sql = 'select * from customer where `emailId` = ?';
        //console.log("form bodyyyy----"+req.body.emailId);
        var values = [req.body.emailId];
        connection.query(sql, values, function (error, results, fields) {
          if (error) {
            console.log(error);
            resultsNotFound["errorMessage"] = "Query error";
            return res.send(resultsNotFound);
          } 
          if (results =="") {
            resultsNotFound["errorMessage"] = "User Id not found.";
            return res.send(resultsNotFound);
          }
          console.log("form bodyyyy----"+results[0].password);
          //console.log("form bodyyyy----"+results[0].password);
          //bcrypt.compare(req.body.password, results[0].password, function (err, result) {
            passwordhash(req.body.password).verifyAgainst(results[0].password, function (error, result) {
            if (result == true) {
              var token = {
                "token": jwt.sign(
                  { email: req.body.emailId },
                  process.env.JWT_SECRET,
                  { expiresIn: '30d' }
                )
              }
              resultsFound["data"] = token;
              res.send(resultsFound);
            } else {
              resultsNotFound["errorMessage"] = "Incorrect Password.";
              return res.send(resultsNotFound);
            }

          });        

          // When done with the connection, release it.
          connection.release(); // Handle error after the release.
          if (error) throw error; // Don't use the connection here, it has been returned to the pool.
        });
    });
  },
  getUser: function (input, res) {
    pool.getConnection(function (err, connection) {
      if (err) throw err; // not connected!

        var sql = 'SELECT * FROM `customer` WHERE `emailId` = ?';
        var values = [input]
        // Use the connection
        connection.query(sql, values, function (error, results, fields) {
          if (error) {
            resultsNotFound["errorMessage"] = "Something went wrong with Server.";
            return res.send(resultsNotFound);
          }
          if (results =="") {
            resultsNotFound["errorMessage"] = "User Id not found.";
            return res.send(resultsNotFound);
          }
          resultsFound["data"] = results[0];
          res.send(resultsFound);
          // When done with the connection, release it.
          connection.release(); // Handle error after the release.
          if (error) throw error; // Don't use the connection here, it has been returned to the pool.
        });
      });
  },
  updateUser: function (fileName,userEmail,req, res) {
    
    pool.getConnection(function (err, connection) {
      if (err) throw err; // not connected!
      if (userEmail != req.body.emailId){
          var sqlChk = 'select * from customer where `emailId` = ?';
          var valueschk = [req.body.emailId];
          connection.query(sqlChk, valueschk, function (error, results, fields) {
            if (results != "") {
              resultsNotFound["errorMessage"] = "Email Id aleready exist please update with correct one.";
              return res.send(resultsNotFound);
            }
          });
        }
        //console.log("imageeeee---"+ req.file);
        //console.log("consoleeeeeeeeee-----------"+ req.body.profilePic);
        var sql = 'UPDATE `customer` SET ? where `emailId` = ?';
        var values = { 'fullName': req.body.fullName, 'emailId': req.body.emailId,'gender': req.body.gender,'profilePic':fileName,
        'orgName':req.body.orgName,'updatedDate': new Date() }
        connection.query(sql, [values,userEmail], function (error, results, fields) {
          if (error) {
            console.log(error);
            resultsNotFound["errorMessage"] = "Query error";
            return res.send(resultsNotFound);
          } else {
            return res.send(resultsFound);
          }

          // When done with the connection, release it.
          connection.release(); // Handle error after the release.
          if (error) throw error; // Don't use the connection here, it has been returned to the pool.
        });
    });
  }
};