var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "nitro",
    debug:true
});
const log = console.log;

connection.connect();

// var query = connection.query('SELECT * FROM waset_v1.orders_log_old');
// query
//     .on('error', function (err) {
//         console.log("error event fired");
//         // Handle error, an 'end' event will be emitted after this as well
//     })
//     .on('fields', function (fields) {
       
//         // the field packets for the rows to follow
//     })
//     .on('result', function (row) {
//         console.log("result event fired");
//         // Pausing the connnection is useful if your processing involves I/O
//         connection.pause();
//         console.log(row);
//         connection.resume();
//     })
//     .on('end', function () {
//         // all rows have been received
//         connection.end();
//     });


// connection.query('SELECT * FROM waset_v1.orders_log_old', function (error, results, fields) {
//     if (error) throw error;
// console.log(results);  });