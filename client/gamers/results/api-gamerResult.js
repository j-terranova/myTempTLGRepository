import Fetch from "../../utilities/FetchUtility.js";

const create = async (params, credentials, gameResult) => {
  console.log("api-gameResult - enter create component ");
  console.log(
    "api-gameResult - gameResult =  ",
    gameResult
  );
  try {
    let response = await fetch("/api/games/results/by/" + params.userId, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t
      },
      body: JSON.stringify(gameResult)
    })
    return await response.json()
  } catch(err) { 
    console.log(err);
    return {
      error: err,
    };
  }
}

const update = async (params, credentials, gameResult) => {
  console.log("api-gameResult - update - start");
  console.log("api-gameResult - update - params = ", params);
  console.log("api-gameResult - update - credentials = ", credentials);
  console.log("api-gameResult - update - gameResult = ", gameResult);
  try {
    console.log("api-gameResult - update - inside Try");
    let response = await fetch("/api/games/results/by/" + params.userId, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t
      },
      body: JSON.stringify(gameResult)
    })
    console.log("api-gameResult - update - response =  ", response);
    return await response.json()
  } catch(err) { 
    console.log(err);
    return {
      error: err,
    };
  }
}

const readById = async (userId, params, credentials, signal) => {
  console.log("api-gameResult - readById - params = ", params)
  try {
  let response = await Fetch.get("/api/games/results/by/" + userId.userId,
    params,
    credentials,
    signal
  );
    console.log("api-gameResult - readById - response = ", response);
    return await response;
  } catch (err) {
    console.log("api-gameResult - readById - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const readOneByCriteria = async (
  userId,
  params,
  credentials,
  signal,
) => {
  try {
    console.log(
      "api-gameResult - readOneByCriteria - just entering "
    );
    console.log(
      "api-gameResult - readOneByCriteria - userId = ", userId
    );
    console.log(
      "api-gameResult - readOneByCriteria - credentials = ", credentials
    );
    console.log(
      "api-gameResult - readOneByCriteria - params = ", params
    );

    let response = await Fetch.get("/api/games/results/OnebyCriteria/" + userId.userId,
      params, 
      credentials,
      signal,
    );
    console.log(
      "api-gameResult - readOneByCriteria - just after get "
    );
    console.log(
      "api-gameResult - readOneByCriteria - response ",
      response
    );
    return await response;
  } catch (err) {
    console.log("api-gameResult - readOneByCriteria - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const listByCriteria = async (userId, params, credentials, signal) => {
  console.log("api-gameResult - listByCriteria - params = ", params)
  try {
  let response = await Fetch.get(
    "/api/games/results/byCriteria/" + userId.userId,
    params,
    credentials,
    signal
  );
    console.log("api-gameResult - listByCriteria - response = ", response);
    return await response;
  } catch (err) {
    console.log("api-gameResult - listByCriteria - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};


const getInProgressGamePlayedBySubType = async (
  userId,
  params,
  credentials,
  signal,
) => {
  try {
    console.log(
      "api-gameResult - getInProgressGamePlayedBySubType - just entering "
    );
    console.log(
      "api-gameResult - getInProgressGamePlayedBySubType - userId = ", userId
    );
    console.log(
      "api-gameResult - getInProgressGamePlayedBySubType - credentials = ", credentials
    );
    console.log(
      "api-gameResult - getInProgressGamePlayedBySubType - params = ", params
    );

    let response = await Fetch.get("/api/games/results/OnebySubType/" + userId.userId,
      params, 
      credentials,
      signal,
    );
    console.log(
      "api-gameResult - getInProgressGamePlayedBySubType - just after get "
    );
    console.log(
      "api-gameResult - getInProgressGamePlayedBySubType - response ",
      response
    );
    return await response;
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
      "/api/gameReults/" + params.gameId,
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

export {
  create,
  update,
  listByCriteria,
  readById,
  readOneByCriteria,
  getInProgressGamePlayedBySubType,
  remove,

};
