import Fetch from "../../utilities/FetchUtility.js";
import auth from "./../../auth/auth-helper";

const create = async (userId, credentials, frameworkTicTacToeData) => {
  console.log("api-frameworkTicTacToe - enter create component ");
  console.log(
    "api-frameworkTicTacToe - frameworkTicTacToeData =  ",
    frameworkTicTacToeData
  );
  try {
    let response = await fetch("/api/frameworks/ticTacToes/by/" + userId.userId, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t
      },
      body: JSON.stringify(frameworkTicTacToeData)
    })
      return await response.json()
    } catch(err) { 
      console.log(err);
      return {
        error: err,
      };
    }
}

const update = async (userId, credentials, frameworkTicTacToeData) => {
  console.log("api-frameworkTicTacToe - enter update component ");
  console.log(
    "api-frameworkTicTacToe - frameworkTicTacToeData =  ",
    frameworkTicTacToeData
  );
  try {
    let response = await fetch("/api/frameworks/ticTacToes/by/" + userId.userId, {
      method: 'PUT',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + credentials.t
        },
      body: JSON.stringify(frameworkTicTacToeData)
    })
    console.log("api-frameworkTicTacToe - update - response =  ", response);
    return await response.json()
  } catch(err) {
    console.log("api-frameworkTicTacToe - update - ERROR!!! =  ", err);
    console.log(err);
    return {
      error: err,
    };
  }
}

const listByCriteria = async (userId, params, credentials, signal) => {
  console.log("api-frameworkTicTacToe - enter listByCriteria ");
  console.log("api-frameworkTicTacToe - listByCriteria - params =  ", params);
  try {
    let response = await Fetch.get(
      "/api/frameworks/ticTacToes/byCriteria/" + userId.userId,
      params,
      credentials,
      signal,
    );
    return await response;
  } catch (err) {
    console.log("api-frameworkTicTacToe - listByCriteria - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const readById = async (userId, params, credentials, signal) => {
  console.log("api-frameworkTicTacToe - readById - params = ", params)
  try {
  let response = await Fetch.get(
    "/api/frameworks/ticTacToes/by/" + userId.userId,
    params,
    credentials,
    signal
  );
    console.log("api-frameworkTicTacToe - readById - response = ", response);
    return await response;
  } catch (err) {
    console.log("api-frameworkTicTacToe - readById - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const listByDifficultyLevelRange = async (userId, params, credentials, signal) => {
  console.log("api-frameworkTicTacToe - readById - params = ", params)
  try {
  let response = await Fetch.get(
    "/api/frameworks/ticTacToes/byDifficultyLevel/" + userId.userId,
    params,
    credentials,
    signal
  );
    console.log("api-frameworkTicTacToe - readById - response = ", response);
    return await response;
  } catch (err) {
    console.log("api-frameworkTicTacToe - readById - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const getCurrentFrameworkByMaxUpdateDateAndUserId = async (
  userId,
  credentials,
  signal
) => {
  try {
    let response = await fetch(
      "/api/frameworks/ticTacToes/byMaxUpdateDate/" + userId.userId,
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
      "/api/frameworks/ticTacToes/" + params.FrameworkTicTacToeId,
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
    let response = await fetch("/api/frameworks/ticTacToes/by/" + params.userId, {
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
    let response = await fetch("/api/frameworks/ticTacToes/approvedPublic", {
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
  //params =userId, fileName, skeletonTicTacToe
  console.log("api-frameworkTicTacToe - load FrameworkTicTacToes function");
  console.log("api-frameworkTicTacToe - load FrameworkTicTacToes params.userId = ", params.userId);
  console.log("api-frameworkTicTacToe - load FrameworkTicTacToes params.skeletonTicTacToe = ", params.skeletonTicTacToe);
  console.log("api-frameworkTicTacToe - load FrameworkTicTacToes credentials = ",credentials);
  console.log("api-referenceData - frameworkTicTacToe function");

  const jwt = auth.isAuthenticated();
  console.log("api-referenceData - jwt.token = " + jwt.token);
  const abortController = new AbortController();
  const signal = abortController.signal;
  console.log("api-referenceData - signal = " + signal);
  try {
    let response = await fetch("/api/frameworks/ticTacToes/load/by/" + params.userId,
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


const newUserWithAccess = async (params, credentials, userWithAccess) => {
  try {
    let response = await fetch(
      "/api/frameworks/ticTacToes/" +
        params.frameworkTicTacToeId +
        "/userWithAccess/new",
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + credentials.t,
        },
        body: JSON.stringify({ userWithAccess: userWithAccess }),
      }
    );
    return response.json();
  } catch (err) {
    console.log(err);
    return {
      error: err,
    };
  }
}

const read = async (params, signal) => {
  try {
    let response = await fetch(
      "/api/frameworks/ticTacToes/" + params.frameworkTicTacToeId,
      {
        method: "GET",
        signal: signal,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
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

export {
  create,
  update,
  listByCriteria,
  getCurrentFrameworkByMaxUpdateDateAndUserId,
  readById,
  listByDifficultyLevelRange,
  read,
  load,
  remove,
  listByOwner,
  listApprovedPublic,
  newUserWithAccess
};