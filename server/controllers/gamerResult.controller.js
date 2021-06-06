import GamerResult from "../models/gamerResult.model";

import errorHandler from "../helpers/dbErrorHandler";
import createUsageLogEntry from "../helpers/usageLogHandler";
import createErrorLogEntry from "../helpers/errorLogHandler";

//const path = require("path");
//const rootPath = path.normalize(__dirname + "/../../");


const create = async (req, res) => {
  console.log("GamerResult.controller - Create - Start");
  try {
    const gamerResult = new GamerResult(req.body)
    const newGamerResult = GamerResult({
      userId: gamerResult.userId,
      framework_id: gamerResult.framework_id,
      title: gamerResult.title,
      description: gamerResult.description,
      topic: gamerResult.topic,
      myClass: gamerResult.myClass,
      category:gamerResult.category,
      subject: gamerResult.subject,
      type: gamerResult.type,
      subType: gamerResult.subtype,
      playerLevel: gamerResult.playerLevel,
      gamerLevel: gamerResult.gamerLevel,
      playTime: gamerResult.playTime,
      gamerScore: gamerResult.gamerScore,
      gamerLevelMaxScore: gamerResult.gamerLevelMaxScore,     
      inCorrectAttempts: gamerResult.inCorrectAttempts,
      numberCorrect: gamerResult.numberCorrect,
      gamerStatus: gamerResult.gamerStatus,
      opponent: gamerResult.opponent,
      winLossDraw: gamerResult.winLossDraw,
      includeConstructs: gamerResult.includeConstructs,
      startDate: gamerResult.startDate,
      completedDate: gamerResult.completedDate,
      updateDate: gamerResult.updateDate,
    });
    let result = await newGamerResult.save()   
    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Create" ,
      type: "Framework" ,
      subType:"GamerResult" ,
      object_id: gamerResult._id ,
      description:  "Create new GamerResult Record" ,
      email: req.profile.email ,
      dateTimeStamp: Date.now() ,
    };
    createUsageLogEntry(newUsageLogData);

    res.json(result)
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "Create" ,
      type: "Framework" ,
      subType:"GamerResult" ,
      object_id: "",
      description:  "Create new GamerResult Record" ,
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
  console.log("GamerResult.controller - Update - Start");
  try {   
    const gamerResult = GamerResult(req.body)
    console.log("GamerResult.controller - gamerResult = ",gamerResult);
    let updatedGamerResult = {  
      userId: gamerResult.userId,
      framework_id: gamerResult.framework_id,
      description: gamerResult.description,
      topic: gamerResult.topic,
      myClass: gamerResult.myClass,
      category:gamerResult.category,
      subject: gamerResult.subject,
      type: gamerResult.type,
      subType: gamerResult.subType,
      playerLevel: gamerResult.playerLevel,
      gamerLevel: gamerResult.gamerLevel,
      playTime: gamerResult.playTime,
      gamerScore: gamerResult.gamerScore,
      gamerLevelMaxScore: gamerResult.gamerLevelMaxScore,     
      inCorrectAttempts: gamerResult.inCorrectAttempts,
      numberCorrect: gamerResult.numberCorrect,
      gamerStatus: gamerResult.gamerStatus,
      opponent: gamerResult.opponent,
      winLossDraw: gamerResult.winLossDraw,
      includeConstructs: gamerResult.includeConstructs,
      startDate: gamerResult.startDate,
      completedDate: gamerResult.completedDate,
      updateDate: gamerResult.updateDate,
    };

    console.log("gamerResult.controller - update - updatedGamerResult = ", updatedGamerResult);
    console.log("gamerResult.controller - update - gamerResult._id = ", gamerResult._id);
    let result = await GamerResult.replaceOne({_id: gamerResult._id},updatedGamerResult)

    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Update" ,
      type: "Framework" ,
      subType:"GamerResult" ,
      object_id: gamerResult._id ,
      description:  "Update GamerResult Record" ,
      email: req.profile.email ,
      dateTimeStamp: Date.now() ,
    };
    createUsageLogEntry(newUsageLogData);

    res.json(result)
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "Update" ,
      type: "Framework" ,
      subType:"GamerResult" ,
      object_id: "",
      description:  "Update GamerResult Record" ,
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
  console.log("GamerResult.controller - readById - Start");
  const findQuery = createQueryObject(req.query);
  try {
    let learnerLesson = await GamerResult.findOne(findQuery);
    if (!learnerLesson)
      return res.status("400").json({
        error: "GamerResult not found",
      });
      return res.json(learnerLesson);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "readById" ,
      type: "Framework" ,
      subType:"GamerResult" ,
      object_id: "",
      description:  "readById GamerResult Record" ,
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

const readOneByCriteria = async (req, res) => {
  console.log("GamerResult.controller - readGamerResultByCriteria -Start ");
  const findQuery = createQueryObject(req.query);
  try {

    let learnerLesson = await GamerResult.findOne(findQuery).sort({ updateDate: -1 }).select("topic description subType difficultyLevel gamerLevel playTime gamerScore gamerStatus framework_id _id");
    
    return res.json(learnerLesson);

  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "readGamerResultByCriteria" ,
      type: "Framework" ,
      subType:"GamerResult" ,
      object_id: "",
      description:  "readGamerResultByCriteria GamerResult Record" ,
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

const listByCriteria = async (req, res) => {
  //for (const key in req.query) {
  //  console.log("req.query - ", key, req.query[key]);
  //}
  const findQuery = createQueryObject(req.query);
  const userId = req.query.userId;
  try {
    let response = await GamerResult.find(findQuery).sort({ updateDate: -1 }).select("topic description subType difficultyLevel gamerLevel playTime gamerScore gamerStatus framework_id _id");
    res.json(response);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listAll" ,
      type: "Framework" ,
      subType:"GamerResult" ,
      object_id: "",
      description:  "listAll GamerResult Records" ,
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

const getInProgressGamerPlayedBySubType = async (req, res) => {
  console.log("GamerResult.controller - getInProgressGamerPlayedBySubType - Start");
  const findQuery = createQueryObject(req.query);
  try {

    let learnerLesson = await GamerResult.findOne(findQuery).sort({ updateDate: -1 });
    return res.json(learnerLesson);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "getInProgressGamerPlayedBySubType" ,
      type: "Component" ,
      subType:"GamerResult" ,
      object_id: "",
      description:  "getInProgressGamerPlayedBySubType GamerResult Record" ,
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
  readOneByCriteria,
  readById,
  listByCriteria,
  getInProgressGamerPlayedBySubType,
};






