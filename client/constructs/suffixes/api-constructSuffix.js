import Fetch from "../../utilities/FetchUtility.js";
import auth from "./../../auth/auth-helper";

const create = async (userId, credentials, constructSuffixData) => {
  console.log("api-constructSuffix - enter create component ");
  console.log(
    "api-constructSuffix - constructSuffixData =  ",
    constructSuffixData
  );
  try {
    let response = await fetch("/api/constructs/suffixs/by/" + userId.userId, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t
      },
      body: JSON.stringify(constructSuffixData)
    })
      return await response.json()
    } catch(err) { 
      console.log(err);
      return {
        error: err,
      };
    }
}

const update = async (userId, credentials, constructSuffixData) => {
  console.log("api-constructSuffix - enter update component ");
  console.log(
    "api-constructSuffix - constructSuffixData =  ",
    constructSuffixData
  );
  try {
    let response = await fetch("/api/constructs/suffixs/by/" + userId.userId, {
      method: 'PUT',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + credentials.t
        },
      body: JSON.stringify(constructSuffixData)
    })
    console.log("api-constructSuffix - update - response =  ", response);
    return await response.json()
  } catch(err) {
    console.log("api-constructSuffix - update - ERROR!!! =  ", err);
    console.log(err);
    return {
      error: err,
    };
  }
}

const listByCriteria = async (userId, params, credentials, signal) => {
  console.log("api-constructSuffix - enter listByCriteria ");
  console.log("api-constructSuffix - listByCriteria - params =  ", params);
  try {
    let response = await Fetch.get(
      "/api/constructs/suffixs/byCriteria/" + userId.userId,
      params,
      credentials,
      signal,
    );
    return await response;
  } catch (err) {
    console.log("api-constructSuffix - listByCriteria - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const readById = async (userId, params, credentials, signal) => {
  console.log("api-constructSuffix - readById - params = ", params)
  try {
  let response = await Fetch.get(
    "/api/constructs/suffixs/byId/" + userId.userId,
    params,
    credentials,
    signal
  );
    console.log("api-constructSuffix - readById - response = ", response);
    return await response;
  } catch (err) {
    console.log("api-constructSuffix - readById - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const getCurrentConstructByMaxUpdateDateAndUserId = async (
  userId,
  credentials,
  signal
) => {
  try {
    let response = await fetch(
      "/api/constructs/suffixs/byMaxUpdateDate/" + userId.userId,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + credentials.t,
        },
        signal: signal,
      }
    );
    return response.json();
  } catch (err) {
    console.log(err);
    return {
      error: err,
    };
  }
};

const getRandomOptions = async (
  userId,
  credentials,
  params,
  signal
) => {

  let uid = userId.userId;
  let difficultyLevel = params.difficultyLevel 
  let numberToRetrieve = params.numberToRetrieve

  console.log("api-constructSuffix - uid = ", uid)
  console.log("api-constructSuffix - difficultyLevel = ", difficultyLevel)
  console.log("api-constructSuffix - numberToRetrieve = ", numberToRetrieve)
  try {
    let response = await fetch(
      "/api/constructs/suffixs/byDifficultyLevel/" + userId.userId,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + credentials.t,
        },
        signal: signal,
      },
    );
    return response.json();
  } catch (err) {
    console.log(err);
    return {
      error: err,
    };
  }
};

const remove = async (params, credentials) => {
  try {
    let response = await fetch(
      "/api/constructs/suffixs/" + params.constructSuffixId,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + credentials.t,
        },
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
    return {
      error: err,
    };
  }
};

const listByOwner = async (params, credentials, signal) => {
  try {
    let response = await fetch("/api/constructs/suffixs/by/" + params.userId, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      signal: signal,
    });
    return response.json();
  } catch (err) {
    console.log(err);
    return {
      error: err,
    };
  }
};


const listApprovedPublic = async (signal) => {
  try {
    let response = await fetch("/api/constructs/suffixs/approvedPublic", {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
    return {
      error: err,
    };
  }
};


const loadGutenbergSuffixData = async (params, credentials) => {
  //params =userId, fileName, skeletonSuffix
  console.log("api-constructSuffix - load constructSuffixs function");
  console.log("api-constructSuffix - load constructSuffixs params.userId = ", params.userId);
  console.log("api-constructSuffix - load constructSuffixs params.skeletonSuffix = ", params.skeletonSuffix);
  console.log("api-constructSuffix - load constructSuffixs credentials = ",credentials);
  console.log("api-referenceData - constructSuffix function");

  const jwt = auth.isAuthenticated();
  console.log("api-referenceData - jwt.token = " + jwt.token);
  const abortController = new AbortController();
  const signal = abortController.signal;
  console.log("api-referenceData - signal = " + signal);
  try {
    let response = await fetch("/api/constructs/suffixs/load/by/" + params.userId,
    {
      method: "PUT",
      signal: signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt.token,
      }, 
      body: JSON.stringify({ params: params }),     
     });
    return await response.json();
  } catch (err) {
    console.log("api-referenceData - ERROR");
    console.log(err);
    return {
      error: err,
    };
  }
};

export {
  create,
  listByCriteria,
  getCurrentConstructByMaxUpdateDateAndUserId,
  getRandomOptions,
  readById,
  update,
  loadGutenbergSuffixData,
  remove,
  listByOwner,
  listApprovedPublic,
};
