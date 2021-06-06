import ConstructQuote from "../models/constructQuote.model";
import fs from "fs";

import errorHandler from "./../helpers/dbErrorHandler";
import createUsageLogEntry from "./../helpers/usageLogHandler";
import createErrorLogEntry from "./../helpers/errorLogHandler";
import defaultImage from "./../../client/assets/images/default.png";

//const path = require("path");
//const rootPath = path.normalize(__dirname + "/../../");

const create = async (req, res) => {
  console.log("Server Side - constructQuote.controller - Create - Start");
  try {
    const constructQuoteData = new ConstructQuote(req.body)  
    let result = await constructQuoteData.save()
    
    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Create" ,
      type: "Component" ,
      subType:"Quote" ,
      object_id: constructQuoteData._id ,
      description:  "Create new Quote Record" ,
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
      subType:"Quote" ,
      object_id: "",
      description:  "Create new Quote Record" ,
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
  console.log("ConstructQuote.controller - Update - Start");
  try {
    const constructQuoteData = ConstructQuote(req.body)
    let updatedConstructQuoteData = {   
      topic: constructQuoteData.topic ,
      description:  constructQuoteData.description ,
      myClass: constructQuoteData.myClass ,
      category:constructQuoteData.category ,
      subject: constructQuoteData.subject ,
      type: constructQuoteData.type ,
      subType: constructQuoteData.subType ,
      difficultyLevel: constructQuoteData.difficultyLevel ,
      ageRange: constructQuoteData.ageRange ,
      image_id: constructQuoteData.image_id ,
      imageFileName: constructQuoteData.imageFileName ,
      owner_id: constructQuoteData.owner_id ,
      group_id: constructQuoteData.group_id ,
      groupName: constructQuoteData.groupName ,
      keepPrivate: constructQuoteData.keepPrivate ,
      approvedForPublicUse: constructQuoteData.approvedForPublicUse ,
      constructQuote: constructQuoteData.constructQuote ,
      markDeleted: constructQuoteData.markDeleted ,
      createDate:  constructQuoteData.createDate,
      updatedBy: constructQuoteData.updatedBy ,
      updateDate:  constructQuoteData.updateDate,
    };

    let result = await ConstructQuote.replaceOne({_id: constructQuoteData._id},updatedConstructQuoteData)   
    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Update" ,
      type: "Component" ,
      subType:"Quote" ,
      object_id: constructQuoteData._id ,
      description:  "Update Quote Record" ,
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
      subType:"Quote" ,
      object_id: "",
      description:  "Update Quote Record" ,
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
  console.log("ConstructQuote.controller - listByCriteria - Start");
  //for (const key in req.query) {
  //  console.log("req.query - ", key, req.query[key]);
  //}
  const findQuery = createQueryObject(req.query);
  //const userId = req.query.userId;
  try {
    let listOfQuotes = await ConstructQuote.find(findQuery).select("topic description owner_id group_id constructQuote markDeleted _id");
    res.json(listOfQuotes);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByCriteria" ,
      type: "Component" ,
      subType:"Quote" ,
      object_id: "",
      description:  "listByCriteria Quote Records" ,
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

const constructQuoteById = async (req, res, next, id) => {
  console.log("ConstructQuote.controller - constructQuoteById - Start");
  try {
    let constructQuote = await ConstructQuote.findById(id);
    if (!constructQuote)
      return res.status("400").json({
        error: "ConstructQuote not found",
      });
    req.constructQuote = constructQuote;
    next();
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "constructQuoteById" ,
      type: "Component" ,
      subType:"Quote" ,
      object_id: "",
      description:  "get constructQuoteById Quote Record" ,
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

const readById = async (req, res) => {
  console.log("ConstructQuote.controller - readById - Start");
  const id = req.query.id;
  try {
    let constructQuote = await ConstructQuote.findOne({_id: id});
    return res.json(constructQuote);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "readById" ,
      type: "Component" ,
      subType:"Quote" ,
      object_id: "",
      description:  "get readById Quote Record" ,
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

const readAll = (req, res) => {
  req.constructQuote.image = undefined;
  return res.json(req.constructQuote);
};

const list = async (req, res) => {
  try {
    let constructQuotes = await ConstructQuote.find();
    res.json(constructQuotes);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const newUserWithAccess = async (req, res) => {
  try {
    let usersWithAccess = req.body.usersWithAccess;
    let result = await ConstructQuote.findByIdAndUpdate(
      req.constructQuote._id,
      { $push: { UsersWithAccess: usersWithAccess }, updated: Date.now() },
      { new: true }
    ).exec();
    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  try {
    let constructQuote = req.constructQuote;
    let deleteConstructQuote = await constructQuote.remove();
    res.json(deleteConstructQuote);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const isOwner = (req, res, next) => {
  const isOwner =
    req.constructQuote &&
    req.auth &&
    req.constructQuote.owner._id == req.auth._id;
  if (!isOwner) {
    return res.status("403").json({
      error: "User is not the Owner",
    });
  }
  next();
};

const listByOwner = async (req, res) => {
  console.log("ConstructQuote.controller - listByOwner - Start");
  try {
    let constructQuotes = await ConstructQuote.find({
      owner_id: req.params.userId,
    });
    res.json(constructQuotes);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByOwner" ,
      type: "Component" ,
      subType:"Quote" ,
      object_id: "",
      description:  "listByOwner new Quote Records" ,
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

const getCurrentConstructByMaxUpdateDateAndUserId = async (req, res) => {
  console.log("ConstructQuote.controller - getCurrentConstructByMaxUpdateDateAndUserId - Start");
  try {
    let currentConstructQuote = await ConstructQuote.findOne({
      owner_id: req.params.userId,
    }).sort({ updateDate: -1 });
    res.json(currentConstructQuote);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "getCurrentConstructByMaxUpdateDateAndUserId" ,
      type: "Component" ,
      subType:"Quote" ,
      object_id: "",
      description:  "getCurrentConstructByMaxUpdateDateAndUserId Quote Records" ,
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

const getRandomOptions = async (req, res) => {
  console.log("ConstructQuote.controller - getRandomOptions - Start");
  
  try {
    let definitionList = await ConstructQuote.aggregate([
      { $match:  { difficultyLevel: { $lt: 9 } },  },
      { "$project": {"constructQuote.quote": 1, "constructQuote.author": 1,  "constructQuote.sourceOrSituation": 1, "constructQuote.year": 1,}},
      {$sample: {size: 50}},
    ])
    res.json(definitionList);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "getRandomOptions" ,
      type: "Component" ,
      subType:"Quote" ,
      object_id: "",
      description:  "getRandomOptions Quote List" ,
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

const listApprovedPublic = (req, res) => {
  ConstructQuote.find(
    { approvedPublic: true },
    (err, constructQuotes) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err),
        });
      }
      res.json(constructQuotes);
    }
  );
};

const photo = (req, res, next) => {
  if (req.constructQuote.image.data) {
    res.set("Content-Type", req.constructQuote.image.contentType);
    return res.send(req.constructQuote.image.data);
  }
  next();
};
const defaultPhoto = (req, res) => {
  return res.sendFile(process.cwd() + defaultImage);
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
  constructQuoteById,
  readById,
  readAll,
  list,
  getCurrentConstructByMaxUpdateDateAndUserId,
  getRandomOptions,
  listByCriteria,
  remove,
  update,
  isOwner,
  listByOwner,
  photo,
  defaultPhoto,
  newUserWithAccess,
  listApprovedPublic,
};



