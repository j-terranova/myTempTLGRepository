import express from "express";
import constructRootWordCtrl from "../controllers/constructRootWord.controller";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();
router
  .route("/api/constructs/rootWords/by/:userId")
  .post(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructRootWordCtrl.create
  )
  .put(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructRootWordCtrl.update
  )
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructRootWordCtrl.listByOwner
  );

router
.route("/api/constructs/rootWords/byId/:userId")
.get(
  authCtrl.requireSignin,
  authCtrl.hasAuthorization,
  constructRootWordCtrl.readById)

router
  .route("/api/constructs/rootWords/byMaxUpdateDate/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructRootWordCtrl.getCurrentConstructByMaxUpdateDateAndUserId
  );

router
  .route("/api/constructs/rootWords/byCriteria/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructRootWordCtrl.listByCriteria
  );

router
  .route("/api/constructs/rootWords/photo/:constructRootWordId")
  .get(constructRootWordCtrl.photo, constructRootWordCtrl.defaultPhoto);

router
  .route("/api/constructs/rootWords/defaultphoto")
  .get(constructRootWordCtrl.defaultPhoto);

router
  .route("/api/constructs/rootWords/:constructRootWordId")
  .get(
    authCtrl.requireSignin,
    //authCtrl.hasAuthorization,
    constructRootWordCtrl.readById)


router
  .route("/api/constructs/rootWords/load/by/:userId")
  .put(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    authCtrl.requireSignin, constructRootWordCtrl.loadGutenbergRootWordData);

router.param(
  "constructRootWordId",
  constructRootWordCtrl.constructRootWordById
);
router.param("userId", userCtrl.userById);

export default router;
