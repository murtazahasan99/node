var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "nitro",
});
const log = console.log;

connection.connect();

connection.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
  if (error) throw error;
  console.log("first query result is ", results[0].solution);
});
log("after first query");

connection.query("SELECT sleep(10)", function (error, results, fields) {
  if (error) throw error;
  log("returned from sleep 10");
});
log("after 2nd query sleep10 query");

connection.query("SELECT sleep(5)", function (error, results, fields) {
  if (error) throw error;
  log("returned from sleep 5");
});

log("after third query sleep5 query");

connection.query("SELECT * from level1", function (error, results, fields) {
  if (error) throw error;
  console.log("The solution is: ", results[0].student_name);
});

log("after 4th query select mouzy query");

connection.on("connect", () => {
  log("connected to mysql-8");
});
var i = 0;
connection.end();
setInterval(() => {
  i++;
  log(`hi from set interval: it has been ${i} seconds`);
}, 1000);
