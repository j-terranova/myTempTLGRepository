import Fetch from "../../utilities/FetchUtility.js";
import auth from "./../../auth/auth-helper";

const create = async (userId, credentials, imageStoreData) => {
  console.log("api-imageStore - enter create component ");
//  for (var pair of imageStoreData.entries()) {
//    console.log(pair[0] + ", " + JSON.stringify(pair[1]));
//  }
  try {
    let response = await fetch("/api/imageStores/by/" + userId.userId, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + credentials.t
      },
      body: imageStoreData,
    })
      return await response.json()
    } catch(err) { 
      console.log(err);
      return {
        error: err,
      };
    }
}

const update = async (userId, credentials, imageStoreData) => {
  console.log("api-imageStore - enter update component ");
  console.log(
    "api-imageStore - imageStoreData._id =  ",
    imageStoreData._id
  );
//  for (var pair of imageStoreData.entries()) {
//    console.log(pair[0] + ", " + JSON.stringify(pair[1]));
//  }
  try {
    let response = await fetch("/api/imageStores/by/" + userId.userId, {
      method: 'PUT',
      headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + credentials.t
        },
      body: imageStoreData,
    })
    console.log("api-imageStore - update - response =  ", response);
    return await response.json()
  } catch(err) {
    console.log("api-imageStore - update - ERROR!!! =  ", err);
    console.log(err);
    return {
      error: err,
    };
  }
}

const listByCriteria = async (userId, params, credentials, signal) => {
  console.log("api-imageStore - enter listByCriteria ");
  console.log("api-imageStore - listByCriteria - params =  ", params);
  try {
    let response = await Fetch.get(
      "/api/imageStores/byCriteria/" + userId.userId,
      params,
      credentials,
      signal,
    );
    return await response;
  } catch (err) {
    console.log("api-imageStore - listByCriteria - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};
/*
const readById = async (userId, params, credentials, signal) => {
  console.log("api-imageStore - readById - params = ", params)
  try {
    let response = await fetch("/api/imageStores/byId/" + userId.userId, {
      method: 'GET',
      signal: signal,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t
      },
      params
    })
    console.log("api-imageStore - readById - response = ", response);
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}
*/
const readById = async (userId, params, credentials, signal) => {
  console.log("api-imageStore - readById - params = ", params)
  try {
  let response = await Fetch.get(
    "/api/imageStores/byId/" + userId.userId,
    params,
    credentials,
    signal
  );
    console.log("api-imageStore - readById - response = ", response);
    return response;
  } catch (error) {
    console.log("api-imageStore - readById - There is an error");
    console.log(error);
    return {
      error: error,
    };
  }
};

const getCurrentImageByMaxUpdateDateAndUserId = async (
  userId,
  credentials,
  signal
) => {
  try {
    let response = await fetch(
      "/api/imageStores/byMaxUpdateDate/" + userId.userId,
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
      "/api/imageStores/" + params.imageStoreId,
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
    let response = await fetch("/api/imageStores/by/" + params.userId, {
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
    let response = await fetch("/api/imageStores/approvedPublic", {
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
  //params =userId, fileName, skeletonImageStores
  console.log("api-imageStore - load imageStores function");
  console.log("api-imageStore - load imageStores params.userId = ", params.userId);
  console.log("api-imageStore - load imageStores params.skeletonImageStores = ", params.skeletonImageStores);
  console.log("api-imageStore - load imageStores credentials = ",credentials);
  console.log("api-referenceData - imageStore function");

  const jwt = auth.isAuthenticated();
  console.log("api-referenceData - jwt.token = " + jwt.token);
  const abortController = new AbortController();
  const signal = abortController.signal;
  console.log("api-referenceData - signal = " + signal);
  try {
    let response = await fetch("/api/imageStores/load/by/" + params.userId,
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
  getCurrentImageByMaxUpdateDateAndUserId,
  readById,
  update,
  load,
  remove,
  listByOwner,
  listApprovedPublic,
};
