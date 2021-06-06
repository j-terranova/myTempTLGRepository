import Fetch from "../../utilities/FetchUtility.js";
import auth from "../../auth/auth-helper";

const create = async (userId, credentials, frameworkComponent) => {
  console.log("api-gamerTicTacToe - enter create component ");
  console.log(
    "api-gamerTicTacToe - frameworkComponent =  ",
    frameworkComponent
  );
  try {
    let response = await fetch("/api/frameworks/ticTacToes/by/" + userId.userId, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t
      },
      body: JSON.stringify(frameworkComponent)
    })
      return await response.json()
    } catch(err) { 
      console.log(err);
      return {
        error: err,
      };
    }
}

const update = async (userId, credentials, frameworkComponent) => {
  console.log("api-gamerTicTacToe - enter update component ");
  console.log(
    "api-gamerTicTacToe - frameworkComponent =  ",
    frameworkComponent
  );
  try {
    let response = await fetch("/api/frameworks/ticTacToes/by/" + userId.userId, {
      method: 'PUT',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + credentials.t
        },
      body: JSON.stringify(frameworkComponent)
    })
    console.log("api-gamerTicTacToe - update - response =  ", response);
    return await response.json()
  } catch(err) {
    console.log("api-gamerTicTacToe - update - ERROR!!! =  ", err);
    console.log(err);
    return {
      error: err,
    };
  }
}

const listByCriteria = async (userId, params, credentials, signal) => {
  console.log("api-gamerTicTacToe - enter listByCriteria ");
  console.log("api-gamerTicTacToe - listByCriteria - params =  ", params);
  try {
    let response = await Fetch.get(
      "/api/frameworks/ticTacToes/byCriteria/" + userId.userId,
      params,
      credentials,
      signal,
    );
    return await response;
  } catch (err) {
    console.log("api-gamerTicTacToe - listByCriteria - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const readById = async (userId, params, credentials, signal) => {
  console.log("api-gamerTicTacToe - readById - params = ", params)
  try {
  let response = await Fetch.get(
    "/api/frameworks/ticTacToes/by/" + userId.userId,
    params,
    credentials,
    signal
  );
    console.log("api-gamerTicTacToe - readById - response = ", response);
    return await response;
  } catch (err) {
    console.log("api-gamerTicTacToe - readById - There is an error");
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


const listTicTacToesByCriteriaByStudent = async (selectedCriteriaFramework, userId, params, credentials) => {
  console.log("api-gamerTicTacToe - enter listTicTacToesByCriteriaByStudent ");
  console.log(
    "api-gamerTicTacToe - listTicTacToesByCriteriaByStudent -selectedCriteriaFramework =  ",
    selectedCriteriaFramework
  );
  console.log(
    "api-gamerTicTacToe - listTicTacToesByCriteriaByStudent - params.url =  ",
    params.url
  );
  console.log("api-gamerTicTacToe - listTicTacToesByCriteriaByStudent - params =  ", params);
  console.log(
    "api-gamerTicTacToe - listTicTacToesByCriteriaByStudent - just before get component "
  );

  const apiRoute = "/api/frameworks/ticTacToes/gamerByCriteria/" + userId.userId;
  console.log("api-gamerTicTacToe - listTicTacToesByCriteriaByStudent - apiRoute ", apiRoute);
  
  try {
    let response = await Fetch.get(
      apiRoute,
      params,
      credentials
    );
    console.log(
      "api-gamerTicTacToe - listTicTacToesByCriteriaByStudent - just after get component "
    );

    console.log(
      "api-gamerTicTacToe - listTicTacToesByCriteriaByStudent - response ",
      response
    );

    return await response;
  } catch (err) {
    console.log("api-gamerTicTacToe - listTicTacToesByCriteriaByStudent - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const getSelectedLearning = async (selectedCriteriaFramework, userId, params, credentials) => {
  console.log("api-gamerTicTacToe - enter getSelectedLearning ");
  console.log(
    "api-gamerTicTacToe - getSelectedLearning -selectedCriteriaFramework =  ",
    selectedCriteriaFramework
  );
  console.log(
    "api-gamerTicTacToe - getSelectedLearning - params.url =  ",
    params.url
  );
  console.log("api-gamerTicTacToe - getSelectedLearning - params =  ", params);
  console.log(
    "api-gamerTicTacToe - getSelectedLearning - just before get component "
  );

  const apiRoute = "/api/frameworks/ticTacToes/frameworkById/" + userId.userId;
  console.log("api-gamerTicTacToe - getSelectedLearning - apiRoute ", apiRoute);
  
  try {
    let response = await Fetch.get(
      apiRoute,
      params,
      credentials
    );
    console.log(
      "api-gamerTicTacToe - getSelectedLearning - just after get component "
    );

    console.log(
      "api-gamerTicTacToe - getSelectedLearning - response ",
      response
    );

    return await response;
  } catch (err) {
    console.log("api-gamerTicTacToe - getSelectedLearning - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const read = async (params, signal) => {
  try {
    let response = await fetch(
      "/api/frameworks/components/" + params.frameworkComponentId,
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

const load = async (params, credentials) => {
  //params =userId, fileName, skeletonComponent
  console.log("api-gamerTicTacToe - load frameworkComponents function");
  console.log("api-gamerTicTacToe - load frameworkComponents params.userId = ", params.userId);
  console.log("api-gamerTicTacToe - load frameworkComponents params.skeletonComponent = ", params.skeletonComponent);
  console.log("api-gamerTicTacToe - load frameworkComponents credentials = ",credentials);
  console.log("api-referenceData - frameworkComponent function");

  const jwt = auth.isAuthenticated();
  console.log("api-referenceData - jwt.token = " + jwt.token);
  const abortController = new AbortController();
  const signal = abortController.signal;
  console.log("api-referenceData - signal = " + signal);
  try {
    let response = await fetch("/api/frameworks/components/load/by/" + params.userId,
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

const remove = async (params, credentials) => {
  try {
    let response = await fetch(
      "/api/frameworks/components/" + params.frameworkComponentId,
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
    let response = await fetch("/api/frameworks/components/by/" + params.userId, {
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
      
const getCurrentFrameworkComponentByMaxUpdateDateAndUserID = async (
  userId,
  credentials,
  signal
) => {
  console.log("api-referenceData - getCurrentFrameworkComponentByMaxUpdateDateAndUserID userId.userId", userId.userId);
  try {
    let response = await fetch(
      "/api/frameworkComponentsForMaxUpdateDate/by/" + userId.userId,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + credentials.t,
        },
        signal: signal,
      }
    );
    console.log("api-referenceData - getCurrentFrameworkComponentByMaxUpdateDateAndUserID-after query-response", response);
    return response.json();
  } catch (err) {
    console.log(err);
    return {
      error: err,
    };
  }
};
const newUserWithAccess = async (params, credentials, userWithAccess) => {
  try {
    let response = await fetch(
      "/api/frameworks/components/" +
        params.frameworkComponentId +
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
};
const listApprovedPublic = async (signal) => {
  try {
    let response = await fetch("/api/frameworks/components/approvedPublic", {
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

export {
  create,
  update,
  listByCriteria,
  readById,
  listByDifficultyLevelRange,
  listTicTacToesByCriteriaByStudent,
  getSelectedLearning,
  getCurrentFrameworkComponentByMaxUpdateDateAndUserID,
  read,
  load,
  remove,
  listByOwner,
  newUserWithAccess,
  listApprovedPublic,
};
