var mysql = require("mysql");
var pool = mysql.createPool({
    connectionLimit: 10,
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "nitro",
    debug:true
});
const log = console.log;


pool.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
    if (error) throw error;
    console.log("first query result is ", results[0].solution);
  });
  log("after first query");
  
  pool.query("SELECT sleep(10)", function (error, results, fields) {
    if (error) throw error;
    log("returned from sleep 10");
  });
  log("after 2nd query sleep10 query");
  
  pool.query("SELECT sleep(5)", function (error, results, fields) {
    if (error) throw error;
    log("returned from sleep 5");
  });
  
  log("after third query sleep5 query");
  
  pool.query("SELECT * from level1", function (error, results, fields) {
    if (error) throw error;
    console.log("The solution is: ", results[0].student_name);
  });
  
  log("after 4th query select mouzy query");
var i = 0;
  
  setInterval(() => {
    i++;
    log(`hi from set interval: it has been ${i} seconds`);
  }, 1000);