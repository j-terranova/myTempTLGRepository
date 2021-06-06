import Fetch from "../../utilities/FetchUtility.js";
import auth from "./../../auth/auth-helper";

const create = async (userId, credentials, frameworkLessonData) => {
  console.log("api-frameworkLesson - enter create component ");
  console.log(
    "api-frameworkLesson - frameworkLessonData =  ",
    frameworkLessonData
  );
  try {
    let response = await fetch("/api/frameworks/lessons/by/" + userId.userId, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t
      },
      body: JSON.stringify(frameworkLessonData)
    })
      return await response.json()
    } catch(err) { 
      console.log(err);
      return {
        error: err,
      };
    }
}

const update = async (userId, credentials, frameworkLessonData) => {
  console.log("api-frameworkLesson - enter update component ");
  console.log(
    "api-frameworkLesson - frameworkLessonData =  ",
    frameworkLessonData
  );
  try {
    let response = await fetch("/api/frameworks/lessons/by/" + userId.userId, {
      method: 'PUT',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + credentials.t
        },
      body: JSON.stringify(frameworkLessonData)
    })
    console.log("api-frameworkLesson - update - response =  ", response);
    return await response.json()
  } catch(err) {
    console.log("api-frameworkLesson - update - ERROR!!! =  ", err);
    console.log(err);
    return {
      error: err,
    };
  }
}

const listByCriteria = async (userId, params, credentials, signal) => {
  console.log("api-frameworkLesson - enter listByCriteria ");
  console.log("api-frameworkLesson - listByCriteria - params =  ", params);
  try {
    let response = await Fetch.get(
      "/api/frameworks/lessons/byCriteria/" + userId.userId,
      params,
      credentials,
      signal,
    );
    return await response;
  } catch (err) {
    console.log("api-frameworkLesson - listByCriteria - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const readById = async (userId, params, credentials, signal) => {
  console.log("api-frameworkLesson - readById - params = ", params)
  try {
  let response = await Fetch.get(
    "/api/frameworks/lessons/byId/" + userId.userId,
    params,
    credentials,
    signal
  );
    console.log("api-frameworkLesson - readById - response = ", response);
    return await response;
  } catch (err) {
    console.log("api-frameworkLesson - readById - There is an error");
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
      "/api/frameworks/lessons/byMaxUpdateDate/" + userId.userId,
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
      "/api/frameworks/lessons/" + params.FrameworkLessonId,
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
    let response = await fetch("/api/frameworks/lessons/by/" + params.userId, {
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
    let response = await fetch("/api/frameworks/lessons/approvedPublic", {
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
  //params =userId, fileName, skeletonLesson
  console.log("api-frameworkLesson - load FrameworkLessons function");
  console.log("api-frameworkLesson - load FrameworkLessons params.userId = ", params.userId);
  console.log("api-frameworkLesson - load FrameworkLessons params.skeletonLesson = ", params.skeletonLesson);
  console.log("api-frameworkLesson - load FrameworkLessons credentials = ",credentials);
  console.log("api-referenceData - frameworkLesson function");

  const jwt = auth.isAuthenticated();
  console.log("api-referenceData - jwt.token = " + jwt.token);
  const abortController = new AbortController();
  const signal = abortController.signal;
  console.log("api-referenceData - signal = " + signal);
  try {
    let response = await fetch("/api/frameworks/lessons/load/by/" + params.userId,
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
      "/api/frameworks/lessons/" +
        params.frameworkLessonId +
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
      "/api/frameworks/lessons/" + params.frameworkLessonId,
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
  read,
  load,
  remove,
  listByOwner,
  listApprovedPublic,
  newUserWithAccess
};