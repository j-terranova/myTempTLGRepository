import express from "express";
import constructPrefixCtrl from "../controllers/constructPrefix.controller";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();
router
  .route("/api/constructs/prefixs/by/:userId")
  .post(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructPrefixCtrl.create
  )
  .put(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructPrefixCtrl.update
  )
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructPrefixCtrl.listByOwner
  );

router
.route("/api/constructs/prefixs/byId/:userId")
.get(
  authCtrl.requireSignin,
  authCtrl.hasAuthorization,
  constructPrefixCtrl.readById)

router
  .route("/api/constructs/prefixs/byMaxUpdateDate/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructPrefixCtrl.getCurrentConstructByMaxUpdateDateAndUserId
  );

  router
.route("/api/constructs/prefixs/byDifficultyLevel/:userId")
.get(
  authCtrl.requireSignin,
  authCtrl.hasAuthorization,
  constructPrefixCtrl.getRandomOptions
);

router
  .route("/api/constructs/prefixs/byCriteria/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructPrefixCtrl.listByCriteria
  );

router
  .route("/api/constructs/prefixs/photo/:constructPrefixId")
  .get(constructPrefixCtrl.photo, constructPrefixCtrl.defaultPhoto);

router
  .route("/api/constructs/prefixs/defaultphoto")
  .get(constructPrefixCtrl.defaultPhoto);

router
  .route("/api/constructs/prefixs/:constructPrefixId")
  .get(
    authCtrl.requireSignin,
    //authCtrl.hasAuthorization,
    constructPrefixCtrl.readById)


router
  .route("/api/constructs/prefixs/load/by/:userId")
  .put(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    authCtrl.requireSignin, constructPrefixCtrl.loadGutenbergPrefixData);

router.param(
  "constructPrefixId",
  constructPrefixCtrl.constructPrefixById
);
router.param("userId", userCtrl.userById);

export default router;
