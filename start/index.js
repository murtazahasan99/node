const express = require("express");
const path = require("path");
const app = express();
var appRoutes = require("./routes/app");

//to be able to receive json data 
app.use(express.json());
//to be able to recevie x-www-form-data
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

//to route requestes
app.use("/", appRoutes);

const port = 5000;
app.listen(port, () => {
  console.log(`servier listening on prot ${port}`);
});
