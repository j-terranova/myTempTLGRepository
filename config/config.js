
const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri:
    process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    "mongodb://" +
      (process.env.IP || "localhost") +
      ":" +
      (process.env.MONGO_PORT || "27017") +
      "/TeachLearnGame",
};

/*
//const MongoClient = require('mongodb').MongoClient;
const  config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "GAMELearnTEACH",
  mongoUri: "mongodb+srv://TLGMasterUser:Stewart%21%40%231@cluster0.knb9r.mongodb.net/TeachLearnGame?retryWrites=true&w=majority",
};

*/

//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//client.connect(err => {
//  const collection = client.db("test").collection("devices");
//  // perform actions on the collection object
//  client.close();
//});

//mongodb+srv://TLGMasterUser:<password>@cluster0.knb9r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

export default config;
