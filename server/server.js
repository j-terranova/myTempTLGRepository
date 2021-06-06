import config from "./../config/config";
import app from "./express";
import express from "express";
import mongoose from "mongoose";
import path from "path";

import { loadData } from "./../utilities/initialLoadData";

// Connection URL
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`);
});

console.log("server - before call to initial load");
//loadData();
console.log("server - after call to initial load");

// Serve static assets if in production
if (process.env.NODE_ENV === 'production')
{
  // Set Static folder
  app.use(express.static('client/build'));

  app.get("*", (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
}

const port = process.env.PORT || config.port;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", port);
});
