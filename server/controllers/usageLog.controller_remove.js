import UsageLog from "../models/usageLog.model";
import fs from "fs";
import errorHandler from "./../helpers/dbErrorHandler";
import defaultImage from "./../../client/assets/images/default.png";
const url = require("url-parse");

const path = require("path");
const rootPath = path.normalize(__dirname + "/../../");

const create = async (req, res) => {
  try {
    const usageLogData = new UsageLog(req.body)
    console.log("Server Side - usageLog.controller - Create  before save - usageLogData  = ",usageLogData);
    let result = await usageLogData.save()
    console.log("Server Side - usageLog.controller - Create  after save - result  = ",result);
    console.log("Server Side - usageLog.controller - Create  usage log entry created!");
    res.json(result)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const update = async (req, res) => {
  try {
    console.log(
      "Server Side - usageLog.controller - inside try update "
    );
    const usageLogData = UsageLog(req.body)
    console.log(
      "Server Side - usageLog.controller - inside try update - usageLogData = ", usageLogData
    );
    /*
    userId: 
    activity: 
    type: 
    subType: 
    object_id: 
    description: 
    dateTimeStamp:
    */
    let updatedUsageLogData = {   

      userId: usageLogData.userId ,
      activity:  usageLogData.activity ,
      type: usageLogData.type ,
      subType:usageLogData.subType ,
      object_id: usageLogData.object_id ,
      description: usageLogData.description ,
      dateTimeStamp: usageLogData.dateTimeStamp ,
    };

    console.log(
      "Server Side - usageLog.controller - inside try update - updatedUsageLogData = ", updatedUsageLogData
    );
    console.log(
      "Server Side - usageLog.controller - inside try update - usageLogData._id = ", usageLogData._id
    );
    let result = await UsageLog.replaceOne({_id: usageLogData._id},updatedUsageLogData)
    console.log(
      "Server Side - usageLog.controller - inside try update - UPDATE SUCCESS!!!"
    );
      console.log(
        "Server Side - usageLog.controller - inside try update - result = ", result
      );
    res.json(result)
  } catch (err) {
    console.log(
      "Server Side - usageLog.controller - ERROR!!!"
    );
    console.log(
      "Server Side - usageLog.controller - ERROR!!! err =", err
    );
    console.log(
      "Server Side - usageLog.controller - errorHandler.getErrorMessage(err)",errorHandler.getErrorMessage(err)
    );
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const listByCriteria = async (req, res) => {
  console.log(
    "usageLog.controller - server side - inside listByCriteria "
  );

  for (const key in req.query) {
    console.log("req.query - ", key, req.query[key]);
  }

  const findQuery = createQueryObject(req.query);
  console.log(
    "usageLog.controller - server side - inside listByCriteria - right before find log - findQuery " +
      findQuery
  );
  const userId = req.query.userId;
  try {
    console.log(
      "usageLog.controller - server side - inside listByCriteria - right before find log - query " +
        req.query
    );
    let listOfLogs = await UsageLog.find(findQuery).select("topic description owner_id group_id usageLog markDeleted _id");
    console.log(
      "usageLog.controller - server side - inside listByCriteria - right after find log - number of records found = listOfLogs.length " +
        listOfLogs.length
    );
    res.json(listOfLogs);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const usageLogById = async (req, res, next, id) => {
  try {
    let usageLog = await UsageLog.findById(id);
    if (!usageLog)
      return res.status("400").json({
        error: "UsageLog not found",
      });
    req.usageLog = usageLog;
    next();
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const readById = async (req, res) => {
  console.log(
    "usageLog.controller - readById -  req.params = ",req.params );
  console.log(
    "usageLog.controller - readById - req.query.ageRange " +
      req.query
  );

  const findQuery = createQueryObject(req.query);
  console.log(
    "usageLog.controller - readById - right before find log - findQuery " +
      findQuery
  );
  const id = req.query.id;
  try {
    console.log(
      "usageLog.controller - readById - right before find log - query " +
        req.query
    );
    console.log(
      "usageLog.controller - readById - right before find log - id " +
      id
    );
    let usageLog = await UsageLog.findOne({_id: id});
    console.log(
      "usageLog.controller - readById - right after find log - usageLog " +
      usageLog
    );
    return res.json(usageLog);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
}

const readAll = (req, res) => {
  req.usageLog.image = undefined;
  return res.json(req.usageLog);
};

const list = async (req, res) => {
  try {
    let usageLogs = await UsageLog.find();
    res.json(usageLogs);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  try {
    let usageLog = req.usageLog;
    let deleteUsageLog = await usageLog.remove();
    res.json(deleteUsageLog);
  } catch (err) {
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

function loadUsageLogData(req, res) {
  console.log("Load UsageLog Data - started");
  const userId=req.body.params.userId;
  const skeletonLog = req.body.params.skeletonLog;
  const filePath =
    "C:\\SourceFiles\\Logs\\logs.txt";

  console.log("Load UsageLog Data - userId = ", userId);
  console.log("Load UsageLog Data - fileName = ", filePath);
  console.log("Load UsageLog Data - req.body = ", req.body);
  console.log("Load UsageLog Data - req.body.params = ", req.body.params);
  console.log("Load UsageLog Data - req.body.params.skeletonLog = ", req.body.params.skeletonLog);
  
  console.log("Load UsageLog Data - Reading File = " + filePath);

  // Read .txt file that must be comma delimited
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  console.log(data);
  console.log("Load UsageLog Data - Reading File = ", filePath);
  // Split on row
  const dataSplit = data.split("\n");
  const headers = dataSplit.shift().split(",");
  console.log("Load UsageLog Data - Looping through File ");
  for (
    let L = headers.length;
    L--;
    headers[L] = headers[L].replace(/(\r\n|\n|\r)/gm, "")
  );
  console.log("Load UsageLog Data -Header Read ");
  console.log(headers);
  let cnt = 0;
  //var json = [];
  dataSplit.forEach(function (d) {
    console.log("Load UsageLog Data - After dataSplit ", d);
    for (let K = d.length; K--; d[K] == d[K].replace(/(\r\n|\n|\r)/gm, ""));
    d = d.replace(/(\r\n|\n|\r)/gm, "");
    console.log("Load UsageLog Data - After First for Log d= ", d);
    //console.log(d);
    let json = [];
    // Loop through each row
    cnt = cnt + 1;
    var tmp = {};
    var row = d.split(",");
    console.log("Load UsageLog Data - row =  ", row);
    for (let L = row.length; L--; L >= 0) {
      row[L] == row[L].replace(/(\r\n|\n|\r)/gm, "");
      //row[L] == row[L].replace(/(?:\\[rn])+/g, "");
    }
    console.log("Load UsageLog Data - After Second for Log ");
    console.log(row);
    for (let i = 0; i < headers.length; i++) {
      console.log("Load UsageLog Data - After 3rd for Log ");
      tmp[headers[i]] = row[i];
    }
    json.push(tmp);
    console.log(
      "Load UsageLog Data - Before Insert Log - json = ",
      json
    );
    console.log(
      "Load UsageLog Data - Before Insert Log - tmp = ",
      tmp
    );
    insertUsageLogData(userId, filePath, skeletonLog,tmp);
    console.log("Load UsageLog Data - After Insert Log ");
  });

  console.log("Load UsageLog Data - headers", headers);
  console.log("Load UsageLog Data - completed");
}

const insertUsageLogData = async (userId, fileName, skeletonLog,logData) => {
  const usageLog = new UsageLog({
    title: skeletonLog.title,
    description: skeletonLog.description,
    topic: skeletonLog.topic,
    myClass: skeletonLog.myClass,
    category: skeletonLog.category,
    subject: skeletonLog.subject,
    type: skeletonLog.type,
    subType: skeletonLog.subType,
    difficultyLevel: skeletonLog.difficultyLevel,
    ageRange: skeletonLog.ageRange,
    image_id: skeletonLog.image_id ,
    imageFileName: skeletonLog.imageFileName ,
    owner_id: skeletonLog.owner_id ,
    group_id: skeletonLog.group_id ,
    groupName: skeletonLog.groupName ,
    keepPrivate: skeletonLog.keepPrivate ,
    approvedForPublicUse: skeletonLog.approvedForPublicUse ,
    usageLog: logData.usageLog ,
    markDeleted: skeletonLog.markDeleted ,
    createDate:  skeletonLog.createDate,
    updatedBy: skeletonLog.updatedBy ,
    updateDate:  skeletonLog.updateDate,

  });
  console.log("InsertUsageLogData - usageLog = " + usageLog);
  try {
    let result = await usageLog.save();
    console.log(result);
    return result;
  } catch (err) {
    if (err.toString().indexOf("E11000") > -1) {
      err = new Error("Duplicate UsageLog Data");
    }
    console.log(result);
  }
};

export default {
  create,
  usageLogById,
  readById,
  readAll,
  list,
  listByCriteria,
  remove,
  update,
  loadUsageLogData,
};




