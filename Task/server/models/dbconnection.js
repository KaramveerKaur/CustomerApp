var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : 'MERCHANT',
});
pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
  });

module.exports = pool;
