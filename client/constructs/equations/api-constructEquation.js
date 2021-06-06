import Fetch from "../../utilities/FetchUtility.js";
import auth from "./../../auth/auth-helper";

const create = async (userId, credentials, constructEquationData) => {
  console.log("api-constructEquation - enter create component ");
  console.log(
    "api-constructEquation - constructEquationData =  ",
    constructEquationData
  );
  try {
    let response = await fetch("/api/constructs/equations/by/" + userId.userId, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t
      },
      body: JSON.stringify(constructEquationData)
    })
      return await response.json()
    } catch(err) { 
      console.log(err);
      return {
        error: err,
      };
    }
}

const update = async (userId, credentials, constructEquationData) => {
  console.log("api-constructEquation - enter update component ");
  console.log(
    "api-constructEquation - constructEquationData =  ",
    constructEquationData
  );
  try {
    let response = await fetch("/api/constructs/equations/by/" + userId.userId, {
      method: 'PUT',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + credentials.t
        },
      body: JSON.stringify(constructEquationData)
    })
    console.log("api-constructEquation - update - response =  ", response);
    return await response.json()
  } catch(err) {
    console.log("api-constructEquation - update - ERROR!!! =  ", err);
    console.log(err);
    return {
      error: err,
    };
  }
}

const listByCriteria = async (userId, params, credentials, signal) => {
  console.log("api-constructEquation - enter listByCriteria ");
  console.log("api-constructEquation - listByCriteria - params =  ", params);
  try {
    let response = await Fetch.get(
      "/api/constructs/equations/byCriteria/" + userId.userId,
      params,
      credentials,
      signal,
    );
    return await response;
  } catch (err) {
    console.log("api-constructEquation - listByCriteria - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const readById = async (userId, params, credentials, signal) => {
  console.log("api-constructEquation - readById - params = ", params)
  try {
  let response = await Fetch.get(
    "/api/constructs/equations/byId/" + userId.userId,
    params,
    credentials,
    signal
  );
    console.log("api-constructEquation - readById - response = ", response);
    return await response;
  } catch (err) {
    console.log("api-constructEquation - readById - There is an error");
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
      "/api/constructs/equations/byMaxUpdateDate/" + userId.userId,
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
      "/api/constructs/equations/" + params.constructEquationId,
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
    let response = await fetch("/api/constructs/equations/by/" + params.userId, {
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
    let response = await fetch("/api/constructs/equations/approvedPublic", {
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


const loadGutenbergEquationData = async (params, credentials) => {
  //params =userId, fileName, skeletonEquation
  console.log("api-constructEquation - load constructEquations function");
  console.log("api-constructEquation - load constructEquations params.userId = ", params.userId);
  console.log("api-constructEquation - load constructEquations params.skeletonEquation = ", params.skeletonEquation);
  console.log("api-constructEquation - load constructEquations credentials = ",credentials);
  console.log("api-referenceData - constructEquation function");

  const jwt = auth.isAuthenticated();
  console.log("api-referenceData - jwt.token = " + jwt.token);
  const abortController = new AbortController();
  const signal = abortController.signal;
  console.log("api-referenceData - signal = " + signal);
  try {
    let response = await fetch("/api/constructs/equations/load/by/" + params.userId,
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
  loadGutenbergEquationData,
  remove,
  listByOwner,
  listApprovedPublic,
};
