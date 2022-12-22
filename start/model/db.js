const mysql = require("mysql");
require("dotenv").config();

const db_config = {
  host: process.env.DB_host,
  user: process.env.DB_user,
  password: process.env.DB_password,
  database: process.env.DB_name,
};

let dbConn;

function handleDisconnect() {
  dbConn = mysql.createConnection(db_config);

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
    setTimeout(handleDisconnect, 2000);
  });
}

handleDisconnect();

const register = (username, password, name) => {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `insert into user (username,password,name) values (?,?,?)`,
      [username,password,name],
      (err, result, fields) => {
        if (err) reject(err);

        resolve(result.insertId);
      }
    );
  })
};

const cahngePassword = (id, password) => {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `update user set password = ? where id = ?`,
      [password,id],
      (err, result, fields) => {
        if (err) reject(err);

        resolve(result);
      }
    );
  })
};

const getUsereByUsername = (username) => {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `select * from user where username =? limit 1`,[username],
      (err, result, fields) => {
        if (err) reject(err);
        resolve(result[0]);
      }
    );
  })
};

module.exports = {
  register,
  getUsereByUsername,
  cahngePassword
};
