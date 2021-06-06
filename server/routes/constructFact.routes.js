import express from "express";
import constructFactCtrl from "../controllers/constructFact.controller";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();
router
  .route("/api/constructs/facts/by/:userId")
  .post(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructFactCtrl.create
  )
  .put(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructFactCtrl.update
  )
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructFactCtrl.listByOwner
  );

router
.route("/api/constructs/facts/byId/:userId")
.get(
  authCtrl.requireSignin,
  authCtrl.hasAuthorization,
  constructFactCtrl.readById)

router
  .route("/api/constructs/facts/byMaxUpdateDate/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructFactCtrl.getCurrentConstructByMaxUpdateDateAndUserId
  );

  router
.route("/api/constructs/facts/byDifficultyLevel/:userId")
.get(
  authCtrl.requireSignin,
  authCtrl.hasAuthorization,
  constructFactCtrl.getRandomOptions
);

router
  .route("/api/constructs/facts/byCriteria/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructFactCtrl.listByCriteria
  );

router
  .route("/api/constructs/facts/photo/:constructFactId")
  .get(constructFactCtrl.photo, constructFactCtrl.defaultPhoto);

router
  .route("/api/constructs/facts/defaultphoto")
  .get(constructFactCtrl.defaultPhoto);

router
  .route("/api/constructs/facts/:constructFactId")
  .get(
    authCtrl.requireSignin,
    //authCtrl.hasAuthorization,
    constructFactCtrl.readById)


router
  .route("/api/constructs/facts/load/by/:userId")
  .put(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    authCtrl.requireSignin, constructFactCtrl.loadGutenbergFactData);

router.param(
  "constructFactId",
  constructFactCtrl.constructFactById
);
router.param("userId", userCtrl.userById);

export default router;
