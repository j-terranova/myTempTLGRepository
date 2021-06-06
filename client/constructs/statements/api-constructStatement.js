import Fetch from "../../utilities/FetchUtility.js";
import auth from "./../../auth/auth-helper";

const create = async (userId, credentials, constructStatementData) => {
  console.log("api-constructStatement - enter create component ");
  console.log(
    "api-constructStatement - constructStatementData =  ",
    constructStatementData
  );
  try {
    let response = await fetch("/api/constructs/statements/by/" + userId.userId, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t
      },
      body: JSON.stringify(constructStatementData)
    })
      return await response.json()
    } catch(err) { 
      console.log(err);
      return {
        error: err,
      };
    }
}

const update = async (userId, credentials, constructStatementData) => {
  console.log("api-constructStatement - enter update component ");
  console.log(
    "api-constructStatement - constructStatementData =  ",
    constructStatementData
  );
  try {
    let response = await fetch("/api/constructs/statements/by/" + userId.userId, {
      method: 'PUT',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + credentials.t
        },
      body: JSON.stringify(constructStatementData)
    })
    console.log("api-constructStatement - update - response =  ", response);
    return await response.json()
  } catch(err) {
    console.log("api-constructStatement - update - ERROR!!! =  ", err);
    console.log(err);
    return {
      error: err,
    };
  }
}

const listByCriteria = async (userId, params, credentials, signal) => {
  console.log("api-constructStatement - enter listByCriteria ");
  console.log("api-constructStatement - listByCriteria - params =  ", params);
  try {
    let response = await Fetch.get(
      "/api/constructs/statements/byCriteria/" + userId.userId,
      params,
      credentials
    );
    return await response;
  } catch (err) {
    console.log("api-constructStatement - listByCriteria - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const readById = async (userId, params, credentials, signal) => {
  console.log("api-constructStatement - readById - params = ", params)
  try {
  let response = await Fetch.get(
    "/api/constructs/statements/byId/" + userId.userId,
    params,
    credentials,
    signal
  );
    console.log("api-constructStatement - readById - response = ", response);
    return await response;
  } catch (err) {
    console.log("api-constructStatement - readById - There is an error");
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
      "/api/constructs/statements/byMaxUpdateDate/" + userId.userId,
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

const remove = async (params, credentials) => {
  try {
    let response = await fetch(
      "/api/constructs/statements/" + params.constructStatementId,
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
    let response = await fetch("/api/constructs/statements/by/" + params.userId, {
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
    let response = await fetch("/api/constructs/statements/approvedPublic", {
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
  //params =userId, fileName, skeletonStatement
  console.log("api-constructStatement - load constructStatements function");
  console.log("api-constructStatement - load constructStatements params.userId = ", params.userId);
  console.log("api-constructStatement - load constructStatements params.skeletonStatement = ", params.skeletonStatement);
  console.log("api-constructStatement - load constructStatements credentials = ",credentials);
  console.log("api-referenceData - constructStatement function");

  const jwt = auth.isAuthenticated();
  console.log("api-referenceData - jwt.token = " + jwt.token);
  const abortController = new AbortController();
  const signal = abortController.signal;
  console.log("api-referenceData - signal = " + signal);
  try {
    let response = await fetch("/api/constructs/statements/load/by/" + params.userId,
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
  readById,
  update,
  load,
  remove,
  listByOwner,
  listApprovedPublic,
};
