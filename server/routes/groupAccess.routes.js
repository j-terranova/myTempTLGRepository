import express from "express";
import groupAccessCtrl from "../controllers/groupAccess.controller";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router   
  .route("/api/groupaccess/byOwner/:userId")
  .post(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    groupAccessCtrl.create
  )
  .put(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    groupAccessCtrl.update
  )
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    groupAccessCtrl.listByOwner
  );
  router
  .route("/api/groupaccess/byGroupId/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    groupAccessCtrl.GetById
  )

//  router
//  .route("/api/groupaccess/UserList/:userId")
//  .get(
//    authCtrl.requireSignin,
//    authCtrl.hasAuthorization,
//    groupAccessCtrl.getUserListData
//  )

  router.route('/api/groupaccess/:groupId')
  .delete(authCtrl.requireSignin, 
          groupAccessCtrl.isOwner,
          groupAccessCtrl.remove)

router.param("userId", userCtrl.userById);
router.param('groupId', groupAccessCtrl.GetById)

export default router;
