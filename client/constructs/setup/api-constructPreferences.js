import Fetch from "../../utilities/FetchUtility.js";
import auth from "./../../auth/auth-helper";

const create = async (userId, credentials, constructPreferencesData) => {
  console.log("api-constructPreferences - enter create component ");
  console.log(
    "api-constructPreferences - constructPreferencesData =  ",
    constructPreferencesData
  );
  try {
    let response = await fetch("/api/constructs/preferences/by/" + userId.userId, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t
      },
      body: JSON.stringify(constructPreferencesData)
    })
      return await response.json()
    } catch(err) { 
      console.log(err);
      return {
        error: err,
      };
    }
}

const update = async (userId, credentials, constructPreferencesData) => {
  console.log("api-constructPreferences - enter update component ");
  console.log(
    "api-constructPreferences - constructPreferencesData =  ",
    constructPreferencesData
  );
  try {
    let response = await fetch("/api/constructs/preferences/by/" + userId.userId, {
      method: 'PUT',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + credentials.t
        },
      body: JSON.stringify(constructPreferencesData)
    })
    console.log("api-constructPreferences - update - response =  ", response);
    return await response.json()
  } catch(err) {
    console.log("api-constructPreferences - update - ERROR!!! =  ", err);
    console.log(err);
    return {
      error: err,
    };
  }
}

const readById = async (userId, params, credentials, signal) => {
  console.log("api-constructPreferences - readById - params = ", params)
  try {
  let response = await Fetch.get(
    "/api/constructs/preferences/by/" + userId.userId,
    params,
    credentials,
    signal
  );
    console.log("api-constructPreferences - readById - response = ", response);
    return await response;
  } catch (err) {
    console.log("api-constructPreferences - readById - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const remove = async (params, credentials) => {
  try {
    let response = await fetch(
      "/api/constructs/preferences/" + params.constructPreferencesId,
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
    let response = await fetch("/api/constructs/preferences/by/" + params.userId, {
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

export {
  create,
  update,
  readById,
  remove,
  listByOwner,
};
