import ReferenceData from "../models/referenceData.model";
import errorHandler from "./../helpers/dbErrorHandler";

const fs = require("fs");
const path = require("path");
const rootPath = path.normalize(__dirname + "/../../");

const listAll = async (req, res, next) => {
  try {
    let referenceDatas = await ReferenceData.find({});
    if (referenceDatas.length == 0) {
      next();
    } else {
      res.json(referenceDatas[0]);
    }
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const readByTag = async (req, res) => {
  console.log("referencData.controller - server side - inside readByTag ");
  console.log(
    "referencData.controller - server side - inside readByTag - req.params.tag " +
      req.params.tag
  );
  try {
    let referenceDatas = await ReferenceData.find({
      tag: req.params.tag
    });
    res.json(referenceDatas);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};


const readByID = async (req, res, next, id) => {
  try {
    let referenceData = await ReferenceData.findById(id)
      .populate({ path: "course", populate: { path: "instructor" } })
      .populate("student", "_id name");
    if (!referenceData)
      return res.status("400").json({
        error: "ReferenceData not found",
      });
    req.referenceData = referenceData;
    next();
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve referenceData",
    });
  }
};


function loadReferenceData() {
  console.log("Load Reference Data - started");
  //let filePath = path.join(rootPath, "data\\ReferenceData.txt");
  //console.log("Load Reference Data - filePath = ", filePath);
  const filePath =
    "C:\\Users\\jterr\\Documents\\NodeProjects\\TeachLearnGame\\data\\ReferenceData.txt";
  // Read CSV
  console.log("Load Reference Data - Reading File = " + filePath);
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  console.log(data);
  console.log("Load Reference Data - Reading File = ", filePath);
  // Split on row
  const dataSplit = data.split("\n");
  const headers = dataSplit.shift().split(",");
  console.log("Load Reference Data - Looping through File ");
  for (
    let L = headers.length;
    L--;
    headers[L] = headers[L].replace(/(\r\n|\n|\r)/gm, "")
  );
  console.log("Load Reference Data -Header Read ");
  console.log(headers);
  let cnt = 0;
  //var json = [];
  dataSplit.forEach(function (d) {
    console.log("Load Reference Data - After dataSplit ", d);
    for (let K = d.length; K--; d[K] == d[K].replace(/(\r\n|\n|\r)/gm, ""));
    d = d.replace(/(\r\n|\n|\r)/gm, "");
    console.log("Load Reference Data - After First for Statement d= ", d);
    //console.log(d);
    let json = [];
    // Loop through each row
    cnt = cnt + 1;
    var tmp = {};
    var row = d.split(",");
    console.log("Load Reference Data - row =  ", row);
    for (let L = row.length; L--; L >= 0) {
      row[L] == row[L].replace(/(\r\n|\n|\r)/gm, "");
      //row[L] == row[L].replace(/(?:\\[rn])+/g, "");
    }
    console.log("Load Reference Data - After Second for Statement ");
    console.log(row);
    for (let i = 0; i < headers.length; i++) {
      console.log("Load Reference Data - After 3rd for Statement ");
      tmp[headers[i]] = row[i];
    }
    json.push(tmp);
    console.log(
      "Load Reference Data - Before Insert Statement - json = ",
      json
    );
    insertReferenceData(tmp);
    console.log("Load Reference Data - After Insert Statement ");
  });

  console.log("Load Reference Data - headers", headers);
  console.log("Load Reference Data - completed");
}

const insertReferenceData = async (refData) => {
  console.log("InsertReferenceData -  refData = ", refData);

  const referenceData = new ReferenceData({
    tag: refData.tag,
    tagValue: refData.tagValue,
    dependency: refData.dependency,
    dependencyValue: refData.dependencyValue,
    active: refData.active,
  });
  console.log("InsertReferenceData - referenceData = " + referenceData);
  console.log(referenceData);
  try {
    let result = await referenceData.save();
    console.log(result);
    return result;
  } catch (err) {
    if (err.toString().indexOf("E11000") > -1) {
      err = new Error("Duplicate Reference Data");
    }
    console.log(result);
  }
};

const create = async (req, res) => {
  if (req.body.tag != "") {
    let newReferenceData = new ReferenceData();
    newReferenceData = {
      tag: reg.body.tag,
      tagValue: reg.body.tagValue,
      dependency: reg.body.dependency,
      dependencyValue: reg.body.dependencyValue,
      active: reg.body.active,
    };

    const referenceData = new ReferenceData(newReferenceData);
    try {
      let result = await referenceData.save();
      return res.status(200).json(result);
    } catch (err) {
      if (err.toString().indexOf("E11000") > -1) {
        err = new Error("Duplicate Reference Data");
      }
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  }
};

const update = async (req, res) => {
  var referenceDataUpdates = req.body;

  req.ReferenceData.tag = referenceDataUpdates.tag;
  req.ReferenceData.tagValue = referenceDataUpdates.tagValue;
  req.ReferenceData.dependency = referenceDataUpdates.dependency;
  req.ReferenceData.dependencyValue = referenceDataUpdates.dependencyValue;
  req.ReferenceData.active = referenceDataUpdates.active;

  try {
    let result = await referenceData.save();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  try {
    let referenceData = req.referenceData;
    let deletedReferenceData = await referenceData.remove();
    res.json(deletedReferenceData);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default {
  listAll,
  readByTag,
  readByID,
  loadReferenceData,
  create,
  update,
  remove,
};
