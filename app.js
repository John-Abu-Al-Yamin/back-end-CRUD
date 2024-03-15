const express = require("express");
require("dotenv").config();
const configDb = require("./config/configDb");
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors())
// Routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api", require("./routes/usersRoute")); 
app.use("/api/product", require("./routes/productRoute")); 

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`);
})
