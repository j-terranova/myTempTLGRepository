import ConstructSuffix from "../models/constructSuffix.model";
import fs from "fs";
import readline   from 'readline';

import errorHandler from "./../helpers/dbErrorHandler";
import createUsageLogEntry from "./../helpers/usageLogHandler";
import createErrorLogEntry from "./../helpers/errorLogHandler";
import defaultImage from "./../../client/assets/images/default.png";

//const path = require("path");
//const rootPath = path.normalize(__dirname + "/../../");

const create = async (req, res) => {
  console.log("ConstructSuffix.controller - Create -Start");
  try {
    const constructSuffixData = new ConstructSuffix(req.body)
    let result = await constructSuffixData.save()

    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Create" ,
      type: "Component" ,
      subType:"Suffix" ,
      object_id: constructSuffixData._id ,
      description:  "Create new Suffix Record" ,
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
      subType:"Suffix" ,
      object_id: "",
      description:  "Create new Suffix Record" ,
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
  console.log("ConstructSuffix.controller - Update - Start " );
  try {
    const constructSuffixData = ConstructSuffix(req.body)
    let updatedConstructSuffixData = {   
      topic: constructSuffixData.topic ,
      description:  constructSuffixData.description ,
      myClass: constructSuffixData.myClass ,
      category:constructSuffixData.category ,
      subject: constructSuffixData.subject ,
      type: constructSuffixData.type ,
      subType: constructSuffixData.subType ,
      difficultyLevel: constructSuffixData.difficultyLevel ,
      ageRange: constructSuffixData.ageRange ,
      image_id: constructSuffixData.image_id ,
      imageFileName: constructSuffixData.imageFileName ,
      owner_id: constructSuffixData.owner_id ,
      group_id: constructSuffixData.group_id ,
      keepPrivate: constructSuffixData.keepPrivate ,
      approvedForPublicUse: constructSuffixData.approvedForPublicUse ,
      constructSuffix: constructSuffixData.constructSuffix ,
      markDeleted: constructSuffixData.markDeleted ,
      createDate:  Date.now(),
      updatedBy: constructSuffixData.updatedBy ,
      updateDate:  Date.now(),
    };

    let result = await ConstructSuffix.replaceOne({_id: constructSuffixData._id},updatedConstructSuffixData)
    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Update" ,
      type: "Component" ,
      subType:"Suffix" ,
      object_id: constructSuffixData._id ,
      description:  "Update Suffix Record" ,
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
      subType:"Suffix" ,
      object_id: "",
      description:  "Update new Suffix Record" ,
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
  console.log("ConstructSuffix.controller - listByCriteria - Start");
  for (const key in req.query) {
    console.log("req.query - ", key, req.query[key]);
  }
  const findQuery = createQueryObject(req.query);
  console.log("ConstructSuffix.controller - listByCriteria - findQuery = ", findQuery);
  const userId = req.query.userId;
  try {
    //let listOfSuffixs = await ConstructSuffix.find(findQuery).select("topic description owner_id group_id constructSuffix markDeleted _id");
    let listOfSuffixs = await ConstructSuffix.find(findQuery).select("topic description owner_id group_id markDeleted _id");
    res.json(listOfSuffixs);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByCriteria" ,
      type: "Component" ,
      subType:"Suffix" ,
      object_id: "",
      description:  "listByCriteria Suffix Records" ,
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

const constructSuffixById = async (req, res, next, id) => {
  console.log("ConstructSuffix.controller - constructSuffixById - Start");
  try {
    let constructSuffix = await ConstructSuffix.findById(id);
    if (!constructSuffix)
      return res.status("400").json({
        error: "ConstructSuffix not found",
      });
    req.constructSuffix = constructSuffix;
    next();
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "constructSuffixById" ,
      type: "Component" ,
      subType:"Suffix" ,
      object_id: "",
      description:  "get constructSuffixById Record" ,
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
  console.log("ConstructSuffix.controller - readById - Start");
  const id = req.query.id;
  try {
    let constructSuffix = await ConstructSuffix.findOne({_id: id});
    return res.json(constructSuffix);
} catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "readById" ,
      type: "Component" ,
      subType:"Suffix" ,
      object_id: "",
      description:  "get readById Suffix Record" ,
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
  req.constructSuffix.image = undefined;
  return res.json(req.constructSuffix);
};

const list = async (req, res) => {
  try {
    let constructSuffixs = await ConstructSuffix.find();
    res.json(constructSuffixs);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const newUserWithAccess = async (req, res) => {
  try {
    let usersWithAccess = req.body.usersWithAccess;
    let result = await ConstructSuffix.findByIdAndUpdate(
      req.constructSuffix._id,
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
    let constructSuffix = req.constructSuffix;
    let deleteConstructSuffix = await constructSuffix.remove();
    res.json(deleteConstructSuffix);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const isOwner = (req, res, next) => {
  const isOwner =
    req.constructSuffix &&
    req.auth &&
    req.constructSuffix.owner._id == req.auth._id;
  if (!isOwner) {
    return res.status("403").json({
      error: "User is not the Owner",
    });
  }
  next();
};

const listByOwner = async (req, res) => {
  console.log("constructSuffix.controller - listByOwner - Start");
  try {
    let constructSuffixs = await ConstructSuffix.find({
      owner_id: req.params.userId,
    });
    res.json(constructSuffixs);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByOwner" ,
      type: "Component" ,
      subType:"Suffix" ,
      object_id: "",
      description:  "listByOwner Suffix Records" ,
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
  console.log("ConstructSuffix.controller - getCurrentConstructByMaxUpdateDateAndUserId - Start");
  try {
    let currentConstructSuffix = await ConstructSuffix.findOne({
      owner_id: req.params.userId,
    }).sort({ updateDate: -1 });
    res.json(currentConstructSuffix);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "getCurrentConstructByMaxUpdateDateAndUserId" ,
      type: "Component" ,
      subType:"Suffix" ,
      object_id: "",
      description:  "getCurrentConstructByMaxUpdateDateAndUserId Suffix Record" ,
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
  console.log("ConstructSuffix.controller - getRandomOptions - Start");
  
  try {
    let definitionList = await ConstructSuffix.aggregate([
      { $match:  { difficultyLevel: { $lt: 18 } },  },
      { "$project": {"constructSuffix.suffix": 1, "constructSuffix.meaning": 1}},
      {$sample: {size: 50}},
    ])
    res.json(definitionList);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "getRandomOptions" ,
      type: "Component" ,
      subType:"Suffix" ,
      object_id: "",
      description:  "getRandomOptions Suffix List" ,
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
  ConstructSuffix.find(
    { approvedPublic: true },
    (err, constructSuffixs) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err),
        });
      }
      res.json(constructSuffixs);
    }
  );
};

const photo = (req, res, next) => {
  if (req.constructSuffix.image.data) {
    res.set("Content-Type", req.constructSuffix.image.contentType);
    return res.send(req.constructSuffix.image.data);
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

function loadGutenbergSuffixData(req, res) {
  // This version allows the keyword to appear one time with
  // each keyword having a different matching word.
    console.log("Load GutenbergSuffix Data - started");
    const userId=req.body.params.userId;
    const skeletonSuffix = req.body.params.skeletonSuffix;
    const lookupFilePath =
    "C:\\TeachLearnGame\\Lookups\\K-12WordList.csv";
    let lookupWordArray = loadArrayOfLookupData(lookupFilePath);

    const filePath =
    "C:\\TeachLearnGame\\PrefixesANDSuffixes\\GuttenbergConsolidatedSuffixes.csv";
   
    console.log("Load GutenbergSuffix Data - userId = ", userId);
    console.log("Load GutenbergSuffix Data - fileName = ", filePath);
    console.log("Load GutenbergSuffix Data - req.body = ", req.body);
    console.log("Load GutenbergSuffix Data - req.body.params = ", req.body.params);
    console.log("Load GutenbergSuffix Data - req.body.params.skeletonSuffix = ", req.body.params.skeletonSuffix);
  
    console.log("Load GutenbergSuffix Data - Reading File = " + filePath);
  
    var lineReader = readline.createInterface({
      input: fs.createReadStream(filePath)
    });
    
    let constructSuffix = {};
    let suffix = "";
    let meaning = "";
    let etymology = "";
    let type = "";
    let difficultyLevel = 0;
    let ageRange = 0;
    let examples = [];
    let description = "";

    let criteria = {};
    var totalCnt = 0;
    var cnt = 0;
    let suffixArray = [];

    lineReader.on('line', function (line) {
      cnt = cnt+1
      totalCnt = totalCnt + 1;
      suffix = "";
      meaning = "";
      etymology = "";
      type = "";
      difficultyLevel = 0;
      ageRange = 0;
      examples = [];
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

      let newLine = line.replace(/"/g, "")
      suffixArray = newLine.toLowerCase().trim().split(",");
      
      suffix = suffixArray[0].toLowerCase().trim().replace(/-/g, "");

      if (suffix.length > 0)
      {
        suffix = "-" + suffix.trim(); 
        type = suffixArray[1].toLowerCase().trim();
        meaning = suffixArray[2].toLowerCase().trim();

        difficultyLevel = parseInt(suffixArray[4].trim());
        ageRange = parseInt(suffixArray[5].trim());
        criteria = searchForWord(suffix, lookupWordArray)

        if (suffixArray.length >= 7)
        {
          for (let i = 6; i < suffixArray.length; i++)
          {   
            if (suffixArray[i].trim().length > 0)
            {
              examples.push(suffixArray[i]);
            }
          }
        }
        if (meaning.length > 0)
        {
          description = "Suffix: " +  suffix + "; Meaning: " +  meaning;
        } else
        {
          description = "Suffix: " +  suffix
        }

        if (type.length > 0)
        {
          description = description + "; Word Type: " +  type
        }

        constructSuffix = {
          suffix: suffix,
          meaning: meaning,
          etymology: etymology,
          type: type,
          examples: examples
        }

        console.log("Load GutenbergSuffix Data - suffixArray = " + suffixArray);
        console.log("Load GutenbergSuffix Data - constructSuffix = " + constructSuffix);
        console.log("Load GutenbergSuffix Data - suffix = " + suffix);
        
        getExistingGutenbergSuffix(userId, suffix, type, meaning,skeletonSuffix, constructSuffix,criteria,difficultyLevel, ageRange,description);
      } 
    });
  }

  
  const getExistingGutenbergSuffix = async (userId, suffix, type, meaning,skeletonSuffix, constructSuffix,criteria,difficultyLevel, ageRange,description) => {
    let existingSuffix = null

    console.log("Load getExistingGutenbergSuffix Data - constructSuffix = " + constructSuffix);
    console.log("Load getExistingGutenbergSuffix Data - suffix = " + suffix);
    try {    
      let listOfSuffixs = await ConstructSuffix.find({"constructSuffix.suffix": suffix});
      if (listOfSuffixs.length > 0)
      {
        for (let i=0; i<listOfSuffixs.length; i++ )
        {
          if (type.trim().length > 0 && listOfSuffixs[i].constructSuffix.type.trim() === type.trim())
          {
            existingSuffix = listOfSuffixs[i];
            console.log("Load GutenbergSuffix Data - existingSuffix = " + existingSuffix);
            updateGutenbergSuffixData(userId, existingSuffix,constructSuffix,criteria,difficultyLevel, ageRange,description)
            return;
          } else if (meaning.trim().length > 0  && listOfSuffixs[i].constructSuffix.meaning.trim() === meaning.trim() )
          {
            existingSuffix = listOfSuffixs[i];
            console.log("Load GutenbergSuffix Data - existingSuffix = " + existingSuffix);
            updateGutenbergSuffixData(userId, existingSuffix,constructSuffix,criteria,difficultyLevel, ageRange,description)
            return;
          }
        }
        existingSuffix = listOfSuffixs[0];
        console.log("Load GutenbergSuffix Data - existingSuffix = " + existingSuffix);
        updateGutenbergSuffixData(userId, existingSuffix,constructSuffix,criteria,difficultyLevel, ageRange,description)
        return;
      }
      if (existingSuffix === null)
      {
        insertGutenbergSuffixData(userId,skeletonSuffix,constructSuffix,criteria,difficultyLevel, ageRange, description)
      } 

      return null;
    } catch (err) {
      let newErrorLogData = {   
        userId: userId,
        activity:  "getGutenbergSuffix" ,
        type: "Component" ,
        subType:"Suffix" ,
        object_id: "",
        description:  "getGutenbergSuffix Suffix Records" ,
        email: "" ,
        errorCode: err,
        errorMessage: errorHandler.getErrorMessage(err),
        serverOrClient: "Server",
        dateTimeStamp: Date.now() ,
      };
      createErrorLogEntry(newErrorLogData);  
    };
    if (existingSuffix === null)
    {
      insertGutenbergSuffixData(userId,skeletonSuffix,constructSuffix,criteria,difficultyLevel, ageRange, description)
    } 
    return null;
  }

  const updateGutenbergSuffixData = async (userId,existingGutenbergSuffix,constructSuffixDetails,criteria,difficultyLevel, ageRange,description) => {
    console.log("ConstructSuffix.controller - Update - Start " );
    try {
      let updatedConstructSuffixData = {   
        topic: constructSuffixDetails.suffix,
        description: description,                 
        myClass: existingGutenbergSuffix.myClass,
        category: existingGutenbergSuffix.category,
        subject: (criteria && criteria.subject)? criteria.subject: existingGutenbergSuffix.subject,
        type: "Component",
        subType: "Suffix",
        difficultyLevel: difficultyLevel ? difficultyLevel : (criteria && criteria.difficultyLevel)? criteria.difficultyLevel: existingGutenbergSuffix.difficultyLevel,
        ageRange: ageRange ? ageRange : (criteria && criteria.ageRange)? criteria.ageRange: existingGutenbergSuffix.ageRange,
        image_id: existingGutenbergSuffix.image_id ,
        imageFileName: existingGutenbergSuffix.imageFileName ,
        owner_id: existingGutenbergSuffix.owner_id ,
        group_id: existingGutenbergSuffix.group_id ,
        groupName: existingGutenbergSuffix.groupName ,
        keepPrivate: false ,
        approvedForPublicUse: true,
        constructSuffix: constructSuffixDetails,
        markDeleted: false ,
        createDate:  existingGutenbergSuffix.createDate,
        updatedBy: existingGutenbergSuffix.updatedBy ,
        updateDate:  Date.now(),
      };
  
      let result = await ConstructSuffix.replaceOne({_id: existingGutenbergSuffix._id},updatedConstructSuffixData)
     
    } catch (err) {
      let newErrorLogData = {   
        userId: userId ,
        activity:  "Update" ,
        type: "Component" ,
        subType:"Suffix" ,
        object_id: "",
        description:  "Update new Suffix Record" ,
        email: "" ,
        errorCode: err,
        errorMessage: errorHandler.getErrorMessage(err),
        serverOrClient: "Server",
        dateTimeStamp: Date.now() ,
      };
      createErrorLogEntry(newErrorLogData);
    }
  }
  
  const insertGutenbergSuffixData = async (userId,skeletonSuffix,constructSuffixDetails,criteria,difficultyLevel, ageRange,description) => {

    if (constructSuffixDetails && constructSuffixDetails.suffix) 
    {
      //console.log( "insertGutenbergSuffixData -  inside the if statement creating a new Suffix");
      const newConstructSuffix = new ConstructSuffix({
        topic: constructSuffixDetails.suffix,
        description: description,                 
        myClass: skeletonSuffix.myClass,
        category: skeletonSuffix.category,
        subject: (criteria && criteria.subject)? criteria.subject: skeletonSuffix.subject,
        type: "Component",
        subType: "Suffix",
        difficultyLevel: difficultyLevel ? difficultyLevel : (criteria && criteria.difficultyLevel)? criteria.difficultyLevel: skeletonSuffix.difficultyLevel,
        ageRange: ageRange ? ageRange : (criteria && criteria.ageRange)? criteria.ageRange: skeletonSuffix.ageRange,
        image_id: skeletonSuffix.image_id ,
        imageFileName: skeletonSuffix.imageFileName ,
        owner_id: skeletonSuffix.owner_id ,
        group_id: skeletonSuffix.group_id ,
        groupName: skeletonSuffix.groupName ,
        keepPrivate: false ,
        approvedForPublicUse: true,
        constructSuffix: constructSuffixDetails,
        markDeleted: false ,
        createDate:  Date.now(),
        updatedBy: skeletonSuffix.updatedBy ,
        updateDate:  Date.now(),
    
      });
      try {
        let result = await newConstructSuffix.save();

      } catch (err) {
        let newErrorLogData = {   
          userId: userId ,
          activity:  "insertGutenbergSuffixData" ,
          type: "Component" ,
          subType:"Suffix" ,
          object_id: "",
          description:  "Bulk load Suffix Records" ,
          email: "" ,
          errorCode: err,
          errorMessage: errorHandler.getErrorMessage(err),
          serverOrClient: "Server",
          dateTimeStamp: Date.now() ,
        };
        createErrorLogEntry(newErrorLogData);  
        if (err.toString().indexOf("E11000") > -1) {
          const error = new Error("Duplicate GutenbergSuffix Data");
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
      console.log("Problem with the data - constructSuffixDetails = ", constructSuffixDetails )
    }

  };
  
export default {
  create,
  constructSuffixById,
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
  loadGutenbergSuffixData,
};




