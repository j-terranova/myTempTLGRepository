import ConstructPreferences from "../models/constructPreferences.model";
import fs from "fs";
import errorHandler from "./../helpers/dbErrorHandler";
import createUsageLogEntry from "./../helpers/usageLogHandler";
import createErrorLogEntry from "./../helpers/errorLogHandler";

//const path = require("path");
//const rootPath = path.normalize(__dirname + "/../../");

const create = async (req, res) => {
  console.log("ConstructPreferences.controller - Create - Start");
  try {
    const constructPreferencesData = new ConstructPreferences(req.body)   
    let result = await constructPreferencesData.save()
     
    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Create" ,
      type: "Component" ,
      subType:"Preferences" ,
      object_id: constructPreferencesData._id ,
      description:  "Create new Construct Preferences Record" ,
      email: req.profile.email ,
      dateTimeStamp: Date.now() ,
    };
    createUsageLogEntry(newUsageLogData);
    
    res.json(result)
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "Create" ,
      type: "Component" ,
      subType:"Preferences" ,
      object_id: "",
      description:  "Create new Preferences Record" ,
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
  console.log("ConstructPreferences.controller - Update - Start");
  try {
    const constructPreferencesData = ConstructPreferences(req.body)
    let updatedConstructPreferencesData = {  
      user_id:  constructPreferencesData.user_id , 
      topic: constructPreferencesData.topic ,
      myClass: constructPreferencesData.myClass ,
      category:constructPreferencesData.category ,
      subject: constructPreferencesData.subject ,
      type: constructPreferencesData.type ,
      subType: constructPreferencesData.subType ,
      difficultyLevel: constructPreferencesData.difficultyLevel ,
      ageRange: constructPreferencesData.ageRange ,
      group_id: constructPreferencesData.group_id ,
      keepPrivate: constructPreferencesData.keepPrivate ,
      rowsPerPage: constructPreferencesData.rowsPerPage ,
      themeBrightness: constructPreferencesData.themeBrightness ,
      primaryButtonColor: constructPreferencesData.primaryButtonColor ,
      primaryBackgroundColor: constructPreferencesData.primaryBackgroundColor, 
      createDate:  constructPreferencesData.createDate,
      updatedBy: constructPreferencesData.updatedBy ,
      updateDate:  constructPreferencesData.updateDate,
    };

    let result = await ConstructPreferences.replaceOne({_id: constructPreferencesData._id},updatedConstructPreferencesData)
    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Update" ,
      type: "Component" ,
      subType:"Preferences" ,
      object_id: constructPreferencesData._id ,
      description:  "Update Construct Preferences Record" ,
      email: req.profile.email ,
      dateTimeStamp: Date.now() ,
    };
    createUsageLogEntry(newUsageLogData);

    res.json(result)
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "Update" ,
      type: "Component" ,
      subType:"Preferences" ,
      object_id: "",
      description:  "Update new Preferences Record" ,
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
  console.log("ConstructPreferences.controller - readById - Start");
  const findQuery = createQueryObject(req.query);
  //const id = req.query.id;
  try {
    let constructPreferences = await ConstructPreferences.findOne(findQuery);
    return res.json(constructPreferences);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "readById" ,
      type: "Component" ,
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
    let constructPreferences = req.constructPreferences;
    let deleteConstructPreferences = await constructPreferences.remove();
    res.json(deleteConstructPreferences);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const listByOwner = async (req, res) => {
  console.log("ConstructPreferences.controller - listByOwner - Start");
  try {
    let constructPreferences = await ConstructPreferences.find({
      owner_id: req.params.userId,
    });

    res.json(constructPreferences);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByOwner" ,
      type: "Component" ,
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



