const mysql = require("mysql");

const db_config = {
  host: "localhost",
  user: "root",
  password: "",
  database: "node_test",
};

let dbConn;

function handleDisconnect() {
  dbConn = mysql.createConnection(db_config); // Recreate the connection, since
  // the old one cannot be reused.

  dbConn.connect(function (err) {
    // The server is either down
    if (err) {
      // or restarting (takes a while sometimes).
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    } // to avoid a hot loop, and to allow our node script to
  }); // process asynchronous requests in the meantime.
  // If you're also serving http, display a 503 error.
  dbConn.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      // Connection to the MySQL server is usually
      handleDisconnect(); // lost due to either server restart, or a
    } else {
      // connnection idle timeout (the wait_timeout
      throw err; // server variable configures this)
    }
  });
}

handleDisconnect();

const register = (username, password, name) => {
    return new Promise((resolve,reject)=>{

        dbConn.query(
          `insert into users (username,password,name) values ("${username}","${password}","${name}")`,
          (err, result, fields) => {
            if (err) reject(err);
      
            resolve(result.insertId);
          }
        );
    })
};

const getUsereByUsername = (username) => {
    return new Promise((resolve,reject)=>{

        dbConn.query(
          `select * from users where username ='${username}' limit 1`,
          (err, result, fields) => {
            if (err) reject(err);
            resolve(result[0]);
          }
        );
    })
};

module.exports = {
  register,
  getUsereByUsername
};
