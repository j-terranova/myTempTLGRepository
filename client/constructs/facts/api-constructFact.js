import Fetch from "../../utilities/FetchUtility.js";
import auth from "./../../auth/auth-helper";

const create = async (userId, credentials, constructFactData) => {
  console.log("api-constructFact - enter create component ");
  console.log(
    "api-constructFact - constructFactData =  ",
    constructFactData
  );
  try {
    let response = await fetch("/api/constructs/facts/by/" + userId.userId, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t
      },
      body: JSON.stringify(constructFactData)
    })
      return await response.json()
    } catch(err) { 
      console.log(err);
      return {
        error: err,
      };
    }
}

const update = async (userId, credentials, constructFactData) => {
  console.log("api-constructFact - enter update component ");
  console.log(
    "api-constructFact - constructFactData =  ",
    constructFactData
  );
  try {
    let response = await fetch("/api/constructs/facts/by/" + userId.userId, {
      method: 'PUT',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + credentials.t
        },
      body: JSON.stringify(constructFactData)
    })
    console.log("api-constructFact - update - response =  ", response);
    return await response.json()
  } catch(err) {
    console.log("api-constructFact - update - ERROR!!! =  ", err);
    console.log(err);
    return {
      error: err,
    };
  }
}

const listByCriteria = async (userId, params, credentials, signal) => {
  console.log("api-constructFact - enter listByCriteria ");
  console.log("api-constructFact - listByCriteria - params =  ", params);
  try {
    let response = await Fetch.get(
      "/api/constructs/facts/byCriteria/" + userId.userId,
      params,
      credentials,
      signal,
    );
    return await response;
  } catch (err) {
    console.log("api-constructFact - listByCriteria - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const readById = async (userId, params, credentials, signal) => {
  console.log("api-constructFact - readById - params = ", params)
  try {
  let response = await Fetch.get(
    "/api/constructs/facts/byId/" + userId.userId,
    params,
    credentials,
    signal
  );
    console.log("api-constructFact - readById - response = ", response);
    return await response;
  } catch (err) {
    console.log("api-constructFact - readById - There is an error");
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
      "/api/constructs/facts/byMaxUpdateDate/" + userId.userId,
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

  console.log("api-constructFact - uid = ", uid)
  console.log("api-constructFact - difficultyLevel = ", difficultyLevel)
  console.log("api-constructFact - numberToRetrieve = ", numberToRetrieve)
  try {
    let response = await fetch(
      "/api/constructs/facts/byDifficultyLevel/" + userId.userId,
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
      "/api/constructs/facts/" + params.constructFactId,
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
    let response = await fetch("/api/constructs/facts/by/" + params.userId, {
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
    let response = await fetch("/api/constructs/facts/approvedPublic", {
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


const load = async (params, credentials) => {
  //params =userId, fileName, skeletonFact
  console.log("api-constructFact - load constructFacts function");
  console.log("api-constructFact - load constructFacts params.userId = ", params.userId);
  console.log("api-constructFact - load constructFacts params.skeletonFact = ", params.skeletonFact);
  console.log("api-constructFact - load constructFacts credentials = ",credentials);
  console.log("api-referenceData - constructFact function");

  const jwt = auth.isAuthenticated();
  console.log("api-referenceData - jwt.token = " + jwt.token);
  const abortController = new AbortController();
  const signal = abortController.signal;
  console.log("api-referenceData - signal = " + signal);
  try {
    let response = await fetch("/api/constructs/facts/load/by/" + params.userId,
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
  load,
  remove,
  listByOwner,
  listApprovedPublic,
};
