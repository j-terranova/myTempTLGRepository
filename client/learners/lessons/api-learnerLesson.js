import Fetch from "../../utilities/FetchUtility.js";
import auth from "../../auth/auth-helper";

const create = async (userId, credentials, frameworkComponent) => {
  console.log("api-learnerLesson - enter create component ");
  console.log(
    "api-learnerLesson - frameworkComponent =  ",
    frameworkComponent
  );
  try {
    let response = await fetch("/api/frameworks/lessons/by/" + userId.userId, {
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
  console.log("api-learnerLesson - enter update component ");
  console.log(
    "api-learnerLesson - frameworkComponent =  ",
    frameworkComponent
  );
  try {
    let response = await fetch("/api/frameworks/lessons/by/" + userId.userId, {
      method: 'PUT',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + credentials.t
        },
      body: JSON.stringify(frameworkComponent)
    })
    console.log("api-learnerLesson - update - response =  ", response);
    return await response.json()
  } catch(err) {
    console.log("api-learnerLesson - update - ERROR!!! =  ", err);
    console.log(err);
    return {
      error: err,
    };
  }
}

const listByCriteria = async (userId, params, credentials, signal) => {
  console.log("api-learnerLesson - enter listByCriteria ");
  console.log("api-learnerLesson - listByCriteria - params =  ", params);
  try {
    let response = await Fetch.get(
      "/api/learner/lessons/by/" + userId.userId,
      params,
      credentials,
      signal,
    );
    return await response;
  } catch (err) {
    console.log("api-learnerLesson - listByCriteria - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const readById = async (userId, params, credentials, signal) => {
  console.log("api-learnerLesson - readById - params = ", params)
  try {
  let response = await Fetch.get(
    "/api/frameworks/lessons/byId/" + userId.userId,
    params,
    credentials,
    signal
  );
    console.log("api-learnerLesson - readById - response = ", response);
    return await response;
  } catch (err) {
    console.log("api-learnerLesson - readById - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const listLessonsByCriteriaByStudent = async (selectedCriteriaFramework, userId, params, credentials) => {
  console.log("api-learnerLesson - enter listLessonsByCriteriaByStudent ");
  console.log(
    "api-learnerLesson - listLessonsByCriteriaByStudent -selectedCriteriaFramework =  ",
    selectedCriteriaFramework
  );
  console.log(
    "api-learnerLesson - listLessonsByCriteriaByStudent - params.url =  ",
    params.url
  );
  console.log("api-learnerLesson - listLessonsByCriteriaByStudent - params =  ", params);
  console.log(
    "api-learnerLesson - listLessonsByCriteriaByStudent - just before get component "
  );

  const apiRoute = "/api/frameworks/lessons/learnerByCriteria/" + userId.userId;
  console.log("api-learnerLesson - listLessonsByCriteriaByStudent - apiRoute ", apiRoute);
  
  try {
    let response = await Fetch.get(
      apiRoute,
      params,
      credentials
    );
    console.log(
      "api-learnerLesson - listLessonsByCriteriaByStudent - just after get component "
    );

    console.log(
      "api-learnerLesson - listLessonsByCriteriaByStudent - response ",
      response
    );

    return await response;
  } catch (err) {
    console.log("api-learnerLesson - listLessonsByCriteriaByStudent - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const getSelectedLearning = async (selectedCriteriaFramework, userId, params, credentials) => {
  console.log("api-learnerLesson - enter getSelectedLearning ");
  console.log(
    "api-learnerLesson - getSelectedLearning -selectedCriteriaFramework =  ",
    selectedCriteriaFramework
  );
  console.log(
    "api-learnerLesson - getSelectedLearning - params.url =  ",
    params.url
  );
  console.log("api-learnerLesson - getSelectedLearning - params =  ", params);
  console.log(
    "api-learnerLesson - getSelectedLearning - just before get component "
  );

  const apiRoute = "/api/frameworks/lessons/frameworkById/" + userId.userId;
  console.log("api-learnerLesson - getSelectedLearning - apiRoute ", apiRoute);
  
  try {
    let response = await Fetch.get(
      apiRoute,
      params,
      credentials
    );
    console.log(
      "api-learnerLesson - getSelectedLearning - just after get component "
    );

    console.log(
      "api-learnerLesson - getSelectedLearning - response ",
      response
    );

    return await response;
  } catch (err) {
    console.log("api-learnerLesson - getSelectedLearning - There is an error");
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
  console.log("api-learnerLesson - load frameworkComponents function");
  console.log("api-learnerLesson - load frameworkComponents params.userId = ", params.userId);
  console.log("api-learnerLesson - load frameworkComponents params.skeletonComponent = ", params.skeletonComponent);
  console.log("api-learnerLesson - load frameworkComponents credentials = ",credentials);
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
  listLessonsByCriteriaByStudent,
  getSelectedLearning,
  getCurrentFrameworkComponentByMaxUpdateDateAndUserID,
  read,
  load,
  remove,
  listByOwner,
  newUserWithAccess,
  listApprovedPublic,
};
