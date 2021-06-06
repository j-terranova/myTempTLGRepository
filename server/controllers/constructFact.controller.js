import ConstructFact from "../models/constructFact.model";
import fs from "fs";
import readline   from 'readline';

import errorHandler from "./../helpers/dbErrorHandler";
import createUsageLogEntry from "./../helpers/usageLogHandler";
import createErrorLogEntry from "./../helpers/errorLogHandler";
import defaultImage from "./../../client/assets/images/default.png";

//const path = require("path");
//const rootPath = path.normalize(__dirname + "/../../");

const create = async (req, res) => {
  console.log("ConstructFact.controller - Create -Start");
  try {
    const constructFactData = new ConstructFact(req.body)
    let result = await constructFactData.save()

    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Create" ,
      type: "Component" ,
      subType:"Fact" ,
      object_id: constructFactData._id ,
      description:  "Create new Fact Record" ,
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
      subType:"Fact" ,
      object_id: "",
      description:  "Create new Fact Record" ,
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
  console.log("ConstructFact.controller - Update - Start " );
  try {
    const constructFactData = ConstructFact(req.body)
    let updatedConstructFactData = {   
      topic: constructFactData.topic ,
      description:  constructFactData.description ,
      myClass: constructFactData.myClass ,
      category:constructFactData.category ,
      subject: constructFactData.subject ,
      type: constructFactData.type ,
      subType: constructFactData.subType ,
      difficultyLevel: constructFactData.difficultyLevel ,
      ageRange: constructFactData.ageRange ,
      image_id: constructFactData.image_id ,
      imageFileName: constructFactData.imageFileName ,
      owner_id: constructFactData.owner_id ,
      group_id: constructFactData.group_id ,
      keepPrivate: constructFactData.keepPrivate ,
      approvedForPublicUse: constructFactData.approvedForPublicUse ,
      constructFact: constructFactData.constructFact ,
      markDeleted: constructFactData.markDeleted ,
      createDate:  Date.now(),
      updatedBy: constructFactData.updatedBy ,
      updateDate:  Date.now(),
    };

    let result = await ConstructFact.replaceOne({_id: constructFactData._id},updatedConstructFactData)
    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Update" ,
      type: "Component" ,
      subType:"Fact" ,
      object_id: constructFactData._id ,
      description:  "Update Fact Record" ,
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
      subType:"Fact" ,
      object_id: "",
      description:  "Update new Fact Record" ,
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
  console.log("ConstructFact.controller - listByCriteria - Start");
  for (const key in req.query) {
    console.log("req.query - ", key, req.query[key]);
  }
  const findQuery = createQueryObject(req.query);
  console.log("ConstructFact.controller - listByCriteria - findQuery = ", findQuery);
  const userId = req.query.userId;
  try {
    //let listOfFacts = await ConstructFact.find(findQuery).select("topic description owner_id group_id constructFact markDeleted _id");
    let listOfFacts = await ConstructFact.find(findQuery).select("topic description owner_id group_id markDeleted _id");
    res.json(listOfFacts);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByCriteria" ,
      type: "Component" ,
      subType:"Fact" ,
      object_id: "",
      description:  "listByCriteria Fact Records" ,
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

const constructFactById = async (req, res, next, id) => {
  console.log("ConstructFact.controller - constructFactById - Start");
  try {
    let constructFact = await ConstructFact.findById(id);
    if (!constructFact)
      return res.status("400").json({
        error: "ConstructFact not found",
      });
    req.constructFact = constructFact;
    next();
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "constructFactById" ,
      type: "Component" ,
      subType:"Fact" ,
      object_id: "",
      description:  "get constructFactById Record" ,
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
  console.log("ConstructFact.controller - readById - Start");
  const id = req.query.id;
  try {
    let constructFact = await ConstructFact.findOne({_id: id});
    return res.json(constructFact);
} catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "readById" ,
      type: "Component" ,
      subType:"Fact" ,
      object_id: "",
      description:  "get readById Fact Record" ,
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
  req.constructFact.image = undefined;
  return res.json(req.constructFact);
};

const list = async (req, res) => {
  try {
    let constructFacts = await ConstructFact.find();
    res.json(constructFacts);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const newUserWithAccess = async (req, res) => {
  try {
    let usersWithAccess = req.body.usersWithAccess;
    let result = await ConstructFact.findByIdAndUpdate(
      req.constructFact._id,
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
    let constructFact = req.constructFact;
    let deleteConstructFact = await constructFact.remove();
    res.json(deleteConstructFact);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const isOwner = (req, res, next) => {
  const isOwner =
    req.constructFact &&
    req.auth &&
    req.constructFact.owner._id == req.auth._id;
  if (!isOwner) {
    return res.status("403").json({
      error: "User is not the Owner",
    });
  }
  next();
};

const listByOwner = async (req, res) => {
  console.log("constructFact.controller - listByOwner - Start");
  try {
    let constructFacts = await ConstructFact.find({
      owner_id: req.params.userId,
    });
    res.json(constructFacts);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByOwner" ,
      type: "Component" ,
      subType:"Fact" ,
      object_id: "",
      description:  "listByOwner Fact Records" ,
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
  console.log("ConstructFact.controller - getCurrentConstructByMaxUpdateDateAndUserId - Start");
  try {
    let currentConstructFact = await ConstructFact.findOne({
      owner_id: req.params.userId,
    }).sort({ updateDate: -1 });
    res.json(currentConstructFact);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "getCurrentConstructByMaxUpdateDateAndUserId" ,
      type: "Component" ,
      subType:"Fact" ,
      object_id: "",
      description:  "getCurrentConstructByMaxUpdateDateAndUserId Fact Record" ,
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
  console.log("ConstructFact.controller - getRandomOptions - Start");
  
  try {
    let definitionList = await ConstructFact.aggregate([
      { $match:  { difficultyLevel: { $lt: 9 } },  },
      { "$project": {"constructFact.fact": 1, "constructFact.source": 1, "constructFact.proof": 1, "constructFact.contraryStatements": 1}},
      {$sample: {size: 50}},
    ])
    res.json(definitionList);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "getRandomOptions" ,
      type: "Component" ,
      subType:"Fact" ,
      object_id: "",
      description:  "getRandomOptions Fact List" ,
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
  ConstructFact.find(
    { approvedPublic: true },
    (err, constructFacts) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err),
        });
      }
      res.json(constructFacts);
    }
  );
};

const photo = (req, res, next) => {
  if (req.constructFact.image.data) {
    res.set("Content-Type", req.constructFact.image.contentType);
    return res.send(req.constructFact.image.data);
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

function searchForWord(wordToMatch, lookupArray){
  for (var i=0; i < lookupArray.length; i++) {
      if (lookupArray[i].wordToDefine === wordToMatch) {
          return lookupArray[i];
      }
  }
  return null;
}

function loadArrayOfLookupData(filePath) {
  console.log("Load loadArrayOfLookup Data - started");
  let lookupArray = [];
  // Read .txt file that must be comma delimited
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  // Split on row
  const dataSplit = data.split("\n");
  const headers = dataSplit.shift().split(",");
  //console.log("Load loadArrayOfLookup Data - Set Headers ");
  for (
    let L = headers.length;
    L--;
    headers[L] = headers[L].replace(/(\r\n|\n|\r)/gm, "")
  );

  let cnt = 0;
  dataSplit.forEach(function (d) {
    for (let K = d.length; K--; d[K] == d[K].replace(/(\r\n|\n|\r)/gm, ""));
    d = d.replace(/(\r\n|\n|\r)/gm, "");

    // Loop through each row
    cnt = cnt + 1;
    var tmp = {};
    var row = d.split(",");
    for (let L = row.length; L--; L >= 0) {
      row[L] == row[L].replace(/(\r\n|\n|\r)/gm, "");
    }

    for (let i = 0; i < headers.length; i++) {
      tmp[headers[i]] = row[i];
    }
    lookupArray.push(tmp);
  });
  console.log("Load loadArrayOfLookup Data - completed");
  return lookupArray;
}

function loadGutenbergFactData(req, res) {
  // This version allows the keyword to appear one time with
  // each keyword having a different matching word.
    console.log("Load GutenbergFact Data - started");
    const userId=req.body.params.userId;
    const skeletonFact = req.body.params.skeletonFact;
    const lookupFilePath =
    "C:\\TeachLearnGame\\SourceFiles\\K-12WordList.csv";
    let lookupWordArray = loadArrayOfLookupData(lookupFilePath);

    const filePath =
    "C:\\TeachLearnGame\\Facts\\GutenbergFactsKeyOnly.csv";
   
    console.log("Load GutenbergFact Data - userId = ", userId);
    console.log("Load GutenbergFact Data - fileName = ", filePath);
    console.log("Load GutenbergFact Data - req.body = ", req.body);
    console.log("Load GutenbergFact Data - req.body.params = ", req.body.params);
    console.log("Load GutenbergFact Data - req.body.params.skeletonFact = ", req.body.params.skeletonFact);
  
    console.log("Load GutenbergFact Data - Reading File = " + filePath);
  
    var lineReader = readline.createInterface({
      input: fs.createReadStream(filePath)
    });
    
    let constructFact = {};
    let fact = "";
    let factType = "";
    let contraryStatements = [];
    
    let criteria = {};
    var totalCnt = 0;
    var cnt = 0;
    let factArray = [];

    lineReader.on('line', function (line) {
      cnt = cnt+1
      totalCnt = totalCnt + 1;
      factType = "";
      factArray = [];
      contraryStatements = [];
      if (cnt >= 500)
      {
        console.log("Total Count Processed : ", totalCnt );
        lineReader.pause();
        setTimeout(_ => {
          //console.log(line);
          cnt=0;
          lineReader.resume();
      }, 30000);
      }
      totalCnt = totalCnt + 1;
      //if (totalCnt > 44115)
      //{
        //console.log("first 4 chars = ", line.substring(0,4))
        if (line.substring(0,4) == "ANT:")
        {
          factType = "Antonym";
          factArray = line.substring(4).trim().split(",");
          contraryStatements = [];
        } else if (line.substring(0,4) == "SYN:")
        {
          factType = "Synonym";
          factArray = line.substring(4).trim().split(",");
          contraryStatements = [];
        }  else
        {
          factType = "";
          factArray = [];
          contraryStatements = [];
        }
        if (factType != "" && factArray.length > 1)
        {
          criteria = searchForWord(factArray[0], lookupWordArray)
          for (let i = 1; i < factArray.length; i++)
          {   
            if (factArray[i].trim().length > 0)
            {
              contraryStatements.push(factArray[i]);
            }
          }
          constructFact = {
            fact: factArray[0],
            factType: factType,
            contraryStatements: contraryStatements
          }
          insertGutenbergFactData(userId, skeletonFact,constructFact,criteria)
        } 
      //}
    });
  }

  const insertGutenbergFactData = async (userId, skeletonFact,constructFactDetails,criteria) => {
    if (constructFactDetails && constructFactDetails.fact) 
    {
      //console.log( "insertGutenbergFactData -  inside the if statement creating a new Fact");
      const newConstructFact = new ConstructFact({
        topic: constructFactDetails.fact,
        description:  constructFactDetails.factType + " : " +
                      constructFactDetails.contraryStatements[0] + " - " +
                      constructFactDetails.fact,                 
        myClass: skeletonFact.myClass,
        category: skeletonFact.category,
        subject: (criteria && criteria.subject)? criteria.subject: skeletonFact.subject,
        type: skeletonFact.type,
        subType: skeletonFact.subType,
        difficultyLevel: (criteria && criteria.difficultyLevel)? criteria.difficultyLevel: skeletonFact.difficultyLevel,
        ageRange: (criteria && criteria.ageRange)? criteria.ageRange: skeletonFact.ageRange,
        image_id: skeletonFact.image_id ,
        imageFileName: skeletonFact.imageFileName ,
        owner_id: skeletonFact.owner_id ,
        group_id: skeletonFact.group_id ,
        groupName: skeletonFact.groupName ,
        keepPrivate: skeletonFact.keepPrivate ,
        approvedForPublicUse: skeletonFact.approvedForPublicUse ,
        constructFact: constructFactDetails,
        markDeleted: skeletonFact.markDeleted ,
        createDate:  skeletonFact.createDate,
        updatedBy: skeletonFact.updatedBy ,
        updateDate:  skeletonFact.updateDate,
    
      });
      try {
        let result = await newConstructFact.save();

      } catch (err) {
        let newErrorLogData = {   
          userId: req.profile._id ,
          activity:  "insertGutenbergFactData" ,
          type: "Component" ,
          subType:"Fact" ,
          object_id: "",
          description:  "Bulk load Fact Records" ,
          email: req.profile.email ,
          errorCode: err,
          errorMessage: errorHandler.getErrorMessage(err),
          serverOrClient: "Server",
          dateTimeStamp: Date.now() ,
        };
        createErrorLogEntry(newErrorLogData);  
        if (err.toString().indexOf("E11000") > -1) {
          const error = new Error("Duplicate GutenbergFact Data");
          console.log(error);
          return;
        } else
        {
          const error = errorHandler.getErrorMessage(err)
          console.log(error);
          return;
        }
        
      }
    } else
    {
      console.log("Problem with the data - constructFactDetails = ", constructFactDetails )
    }

  };

export default {
  create,
  constructFactById,
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
  loadGutenbergFactData,
};




