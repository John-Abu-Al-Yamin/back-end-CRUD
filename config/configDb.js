const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("mongoose DB connected ^_^");
  })
  .catch((err) => {
    console.error(err, "Failed to connect to the database");
    process.exit(1); // Terminate the Node.js process
  });
