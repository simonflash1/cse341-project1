const express = require("express");
const mongodb = require("./routes/data/database");
const app = express();

app.use("/", require("./routes"));

const port = process.env.PORT || 8080;

mongodb.initDB((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(
        "Database connected and node server is running on port " + port
      );
    });
  }
});
