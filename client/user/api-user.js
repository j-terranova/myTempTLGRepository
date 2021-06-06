import Fetch from "../utilities/FetchUtility.js";

const create = async (user) => {
  try {
      let response = await fetch('/api/users/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}


const listUsersByCriteria = async (userId, params, credentials) => {
  console.log("api-user - enter listUserByCriteria ");
  console.log(
    "api-user - listUserByCriteria -  userId.userId =  ",
    params.userId
  );
  console.log(
    "api-user - listUserByCriteria - params.url =  ",
    params.url
  );
  console.log("api-user - listUserByCriteria - params =  ", params);
  console.log(
    "api-user - listUserByCriteria - just before get statement "
  );

  try {
    let response = await Fetch.get(
      "/api/users/bycriteria/" + userId.userId,
      params,
      credentials
    );
    console.log(
      "api-user - listUserByCriteria - just after get statement "
    );

    console.log(
      "api-user - listUserByCriteria - response ",
      response
    );

    return await response;
  } catch (err) {
    console.log("api-user - listUserByCriteria - There is an error");
    console.log(err);
  }
};

const getOneByCriteria = async (userId, params, credentials) => {
  console.log("api-user - enter getOneByCriteria ");
  console.log(
    "api-user - getOneByCriteria -  userId.userId =  ",
    params.userId
  );
  console.log(
    "api-user - getOneByCriteria - params.url =  ",
    params.url
  );
  console.log("api-user - getOneByCriteria - params =  ", params);
  console.log(
    "api-user - getOneByCriteria - just before get statement "
  );

  try {
    let response = await Fetch.get(
      "/api/users/onebycriteria/" + userId.userId,
      params,
      credentials
    );
    console.log(
      "api-user - getOneByCriteria - just after get statement "
    );

    console.log(
      "api-user - getOneByCriteria - response ",
      response
    );

    return await response;
  } catch (err) {
    console.log("api-user - getOneByCriteria - There is an error");
    console.log(err);
  }
};

const readById = async (userId, params, credentials, signal) => {
  console.log("api-user - readById - params = ", params)
  try {
  let response = await Fetch.get(
    "/api/users/data/by/" + userId.userId,
    params,
    credentials,
    signal
  );
    console.log("api-user - readById - response = ", response);
    return await response;
  } catch (err) {
    console.log("api-user - readById - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const list = async (signal) => {
  try {
    let response = await fetch('/api/users/', {
      method: 'GET',
      signal: signal,
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const read = async (params, credentials, signal) => {
  try {
    let response = await fetch('/api/users/' + params.userId, {
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const update = async (params, credentials, user) => {
  try {
    let response = await fetch('/api/users/' + params.userId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(user)
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

  const updateUserGroupsOwned = async (params, credentials, listOfGroups) => {
    console.log(
      "updateUserGroupsOwned - listOfGroups= ", listOfGroups );
    try {
      let response = await fetch('/api/users/groups/' + params.userId, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify({listOfGroups: listOfGroups})
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }

  
  const updateAddToGroupMembership = async (params, credentials, idOfUserToAdd, groupToAdd) => {
    console.log(
      "updateAddToGroupMembership - groupToAdd= ", groupToAdd );
    console.log(
      "updateAddToGroupMembership - idOfUserToAdd= ", idOfUserToAdd );
    try {
      let response = await fetch('/api/users/groups/addUser/' + params.userId, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify({idOfUserToAdd: idOfUserToAdd, groupToAdd: groupToAdd})
        //body: JSON.stringify(idOfUserToAdd, groupToAdd)
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }

  
  const updateRemoveFromGroupMembership = async (params, credentials, idOfUserToRemove, groupToRemove) => {
    console.log(
      "updateRemoveFromGroupMembership - groupToRemove= ", groupToRemove );
      console.log(
        "updateRemoveFromGroupMembership - idOfUserToRemove= ", idOfUserToRemove );
    try {
      let response = await fetch('/api/users/groups/removeUser/' + params.userId, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify({idOfUserToRemove: idOfUserToRemove, groupToRemove: groupToRemove})
        //body: JSON.stringify(idOfUserToRemove,groupToRemove)
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    } 
  }


const remove = async (params, credentials) => {
  try {
    let response = await fetch('/api/users/' + params.userId, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

export {
  create,
  listUsersByCriteria,
  getOneByCriteria,
  readById,
  list,
  read,
  update,
  updateUserGroupsOwned,
  updateAddToGroupMembership,
  updateRemoveFromGroupMembership,
  remove
}