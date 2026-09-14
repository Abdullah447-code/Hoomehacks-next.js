const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;
console.log("Connecting to:", uri.replace(/:([^@]+)@/, ":***@"));
mongoose.connect(uri).then(() => {
  console.log("SUCCESS: Connected to MongoDB Atlas!");
  process.exit(0);
}).catch(err => {
  console.log("ERROR:", err.message);
  process.exit(1);
});
