import Fetch from "../../utilities/FetchUtility.js";
import auth from "../../auth/auth-helper";

const create = async (userId, credentials, gamerPreferencesData) => {
  console.log("api-gamerPreferences - enter create component ");
  console.log(
    "api-gamerPreferences - gamerPreferencesData =  ",
    gamerPreferencesData
  );
  try {
    let response = await fetch("/api/games/preferences/by/" + userId.userId, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t
      },
      body: JSON.stringify(gamerPreferencesData)
    })
      return await response.json()
    } catch(err) { 
      console.log(err);
      return {
        error: err,
      };
    }
}

const update = async (userId, credentials, gamerPreferencesData) => {
  console.log("api-gamerPreferences - enter update component ");
  console.log(
    "api-gamerPreferences - gamerPreferencesData =  ",
    gamerPreferencesData
  );
  try {
    let response = await fetch("/api/games/preferences/by/" + userId.userId, {
      method: 'PUT',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + credentials.t
        },
      body: JSON.stringify(gamerPreferencesData)
    })
    console.log("api-gamerPreferences - update - response =  ", response);
    return await response.json()
  } catch(err) {
    console.log("api-gamerPreferences - update - ERROR!!! =  ", err);
    console.log(err);
    return {
      error: err,
    };
  }
}

const readById = async (userId, params, credentials, signal) => {
  console.log("api-gamerPreferences - readById - params = ", params)
  try {
  let response = await Fetch.get(
    "/api/games/preferences/by/" + userId.userId,
    params,
    credentials,
    signal
  );
    console.log("api-gamerPreferences - readById - response = ", response);
    return await response;
  } catch (err) {
    console.log("api-gamerPreferences - readById - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const remove = async (params, credentials) => {
  try {
    let response = await fetch(
      "/api/games/preferences/" + params.gamerPreferencesId,
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
    let response = await fetch("/api/games/preferences/by/" + params.userId, {
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
