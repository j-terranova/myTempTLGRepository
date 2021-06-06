import Fetch from "../../utilities/FetchUtility.js";
import auth from "./../../auth/auth-helper";

const create = async (userId, credentials, constructQuoteData) => {
  console.log("api-constructQuote - enter create component ");
  console.log(
    "api-constructQuote - constructQuoteData =  ",
    constructQuoteData
  );
  try {
    let response = await fetch("/api/constructs/quotes/by/" + userId.userId, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t
      },
      body: JSON.stringify(constructQuoteData)
    })
      return await response.json()
    } catch(err) { 
      console.log(err);
      return {
        error: err,
      };
    }
}

const update = async (userId, credentials, constructQuoteData) => {
  console.log("api-constructQuote - enter update component ");
  console.log(
    "api-constructQuote - constructQuoteData =  ",
    constructQuoteData
  );
  try {
    let response = await fetch("/api/constructs/quotes/by/" + userId.userId, {
      method: 'PUT',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + credentials.t
        },
      body: JSON.stringify(constructQuoteData)
    })
    console.log("api-constructQuote - update - response =  ", response);
    return await response.json()
  } catch(err) {
    console.log("api-constructQuote - update - ERROR!!! =  ", err);
    console.log(err);
    return {
      error: err,
    };
  }
}

const listByCriteria = async (userId, params, credentials, signal) => {
  console.log("api-constructQuote - enter listByCriteria ");
  console.log("api-constructQuote - listByCriteria - params =  ", params);
  try {
    let response = await Fetch.get(
      "/api/constructs/quotes/byCriteria/" + userId.userId,
      params,
      credentials,
      signal,
    );
    return await response;
  } catch (err) {
    console.log("api-constructQuote - listByCriteria - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const readById = async (userId, params, credentials, signal) => {
  console.log("api-constructQuote - readById - params = ", params)
  try {
  let response = await Fetch.get(
    "/api/constructs/quotes/byId/" + userId.userId,
    params,
    credentials,
    signal
  );
    console.log("api-constructQuote - readById - response = ", response);
    return await response;
  } catch (err) {
    console.log("api-constructQuote - readById - There is an error");
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
      "/api/constructs/quotes/byMaxUpdateDate/" + userId.userId,
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

  console.log("api-constructQuote - uid = ", uid)
  console.log("api-constructQuote - difficultyLevel = ", difficultyLevel)
  console.log("api-constructQuote - numberToRetrieve = ", numberToRetrieve)
  try {
    let response = await fetch(
      "/api/constructs/quotes/byDifficultyLevel/" + userId.userId,
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
      "/api/constructs/quotes/" + params.constructQuoteId,
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
    let response = await fetch("/api/constructs/quotes/by/" + params.userId, {
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
    let response = await fetch("/api/constructs/quotes/approvedPublic", {
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
  //params =userId, fileName, skeletonQuote
  console.log("api-constructQuote - load constructQuotes function");
  console.log("api-constructQuote - load constructQuotes params.userId = ", params.userId);
  console.log("api-constructQuote - load constructQuotes params.skeletonQuote = ", params.skeletonQuote);
  console.log("api-constructQuote - load constructQuotes credentials = ",credentials);
  console.log("api-referenceData - constructQuote function");

  const jwt = auth.isAuthenticated();
  console.log("api-referenceData - jwt.token = " + jwt.token);
  const abortController = new AbortController();
  const signal = abortController.signal;
  console.log("api-referenceData - signal = " + signal);
  try {
    let response = await fetch("/api/constructs/quotes/load/by/" + params.userId,
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
