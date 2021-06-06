import GamerPreferences from "../models/gamerPreferences.model";
import fs from "fs";

import errorHandler from "../helpers/dbErrorHandler";
import createUsageLogEntry from "../helpers/usageLogHandler";
import createErrorLogEntry from "../helpers/errorLogHandler";
import defaultImage from "./../../client/assets/images/default.png";

//const path = require("path");
//const rootPath = path.normalize(__dirname + "/../../");

const create = async (req, res) => {
  console.log("GamerPreferences.controller - Create - Start");
  try {
    const gamerPreferencesData = new GamerPreferences(req.body)
    let result = await gamerPreferencesData.save()
    
    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Create" ,
      type: "Game" ,
      subType:"Preferences" ,
      object_id: gamerPreferencesData._id ,
      description:  "Create new Game Preferences Record" ,
      email: req.profile.email ,
      dateTimeStamp: Date.now() ,
    };
    createUsageLogEntry(newUsageLogData);

    res.json(result)
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "Create" ,
      type: "Game" ,
      subType:"Preferences" ,
      object_id: "",
      description:  "Create new Game Preferences Record" ,
      email: req.profile.email ,
      errorCode: err,
      errorMessage: errorHandler.getErrorMessage(err),
      serverOrClient: "Server",
      dateTimeStamp: Date.now() ,
    };
    createErrorLogEntry(newErrorLogData);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const update = async (req, res) => {
  console.log("GamerPreferences.controller - Update - Start");
  try {
    const gamerPreferencesData = GamerPreferences(req.body)
    let updatedGamerPreferencesData = {  
      user_id:  gamerPreferencesData.user_id , 
      topic: gamerPreferencesData.topic ,
      myClass: gamerPreferencesData.myClass ,
      category:gamerPreferencesData.category ,
      subject: gamerPreferencesData.subject ,
      type: gamerPreferencesData.type ,
      subType: gamerPreferencesData.subType ,
      difficultyLevel: gamerPreferencesData.difficultyLevel ,
      ageRange: gamerPreferencesData.ageRange ,
      playerLevel: gamerPreferencesData.playerLevel ,
      preferredGamerLevel: gamerPreferencesData.preferredGamerLevel ,
      group_id: gamerPreferencesData.group_id ,
      themeBrightness: gamerPreferencesData.themeBrightness ,
      primaryButtonColor: gamerPreferencesData.primaryButtonColor ,
      primaryBackgroundColor: gamerPreferencesData.primaryBackgroundColor, 
      createDate:  gamerPreferencesData.createDate,
      updatedBy: gamerPreferencesData.updatedBy ,
      updateDate:  gamerPreferencesData.updateDate,
    };
    let result = await GamerPreferences.replaceOne({_id: gamerPreferencesData._id},updatedGamerPreferencesData)
    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Update" ,
      type: "Game" ,
      subType:"Preferences" ,
      object_id: gamerPreferencesData._id ,
      description:  "Update Game Preferences Record" ,
      email: req.profile.email ,
      dateTimeStamp: Date.now() ,
    };
    createUsageLogEntry(newUsageLogData);
    
    res.json(result)
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "Update" ,
      type: "Game" ,
      subType:"Preferences" ,
      object_id: "",
      description:  "Update Game Preferences Record" ,
      email: req.profile.email ,
      errorCode: err,
      errorMessage: errorHandler.getErrorMessage(err),
      serverOrClient: "Server",
      dateTimeStamp: Date.now() ,
    };
    createErrorLogEntry(newErrorLogData);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const readById = async (req, res) => {
  console.log("GamerPreferences.controller - readById - Start");
  const findQuery = createQueryObject(req.query);
  console.log(
    "gamerPreferences.controller - readById - right before find preferences - findQuery " +
      findQuery
  );
  try {
    let gamerPreferences = await GamerPreferences.findOne(findQuery);
    console.log("gamerPreferences.controller - readById - gamerPreferences = ", gamerPreferences );
    return res.json(gamerPreferences);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "readById" ,
      type: "Game" ,
      subType:"Preferences" ,
      object_id: "",
      description:  "get readById Preferences Record" ,
      email: req.profile.email ,
      errorCode: err,
      errorMessage: errorHandler.getErrorMessage(err),
      serverOrClient: "Server",
      dateTimeStamp: Date.now() ,
    };
    createErrorLogEntry(newErrorLogData);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
}

const remove = async (req, res) => {
  try {
    let gamerPreferences = req.gamerPreferences;
    let deleteGamerPreferences = await gamerPreferences.remove();
    res.json(deleteGamerPreferences);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const listByOwner = async (req, res) => {
  try {
    let gamerPreferences = await GamerPreferences.find({
      owner_id: req.params.userId,
    });

    res.json(gamerPreferences);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByOwner" ,
      type: "Game" ,
      subType:"Preferences" ,
      object_id: "",
      description:  "listByOwner Preferences Record" ,
      email: req.profile.email ,
      errorCode: err,
      errorMessage: errorHandler.getErrorMessage(err),
      serverOrClient: "Server",
      dateTimeStamp: Date.now() ,
    };
    createErrorLogEntry(newErrorLogData);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

function createQueryObject(obj) {
  let queryString = "{";
  let cnt = 0;
  for (const key in obj) {
    if (
      key != "false" &&
      obj[key] != undefined &&
      obj[key] != "undefined" &&
      obj[key] != null &&
      obj[key] != "" &&
      obj[key] != false &&
      obj[key] != "false" &&
      obj[key].length > 0
    ) {
      cnt > 0 ? (queryString = queryString + ",") : queryString;
      queryString = queryString + '"' + key + '": "' + obj[key] + '"';
      cnt = cnt + 1;
      console.log(
        " createQueryObj - iteration : " + cnt + "  " + key + ":  " + obj[key]
      );
    }
  }

  queryString = queryString + "}";
  console.log("createQueryObject - queryString = ", queryString);
  const queryObj = JSON.parse(queryString);
  return queryObj;
}

export default {
  create,
  update,
  readById,
  remove,
  listByOwner,
};



