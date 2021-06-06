import express from "express";
import constructDefinitionCtrl from "../controllers/constructDefinition.controller";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();
router
  .route("/api/constructs/definitions/by/:userId")
  .post(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructDefinitionCtrl.create
  )
  .put(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructDefinitionCtrl.update
  )
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructDefinitionCtrl.listByOwner
  );

router
.route("/api/constructs/definitions/byId/:userId")
.get(
  authCtrl.requireSignin,
  authCtrl.hasAuthorization,
  constructDefinitionCtrl.readById)

router
  .route("/api/constructs/definitions/byMaxUpdateDate/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructDefinitionCtrl.getCurrentConstructByMaxUpdateDateAndUserId
  );

router
.route("/api/constructs/definitions/byDifficultyLevel/:userId")
.get(
  authCtrl.requireSignin,
  authCtrl.hasAuthorization,
  constructDefinitionCtrl.getRandomOptions
);

router
  .route("/api/constructs/definitions/byCriteria/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructDefinitionCtrl.listByCriteria
  );

router
  .route("/api/constructs/definitions/photo/:constructDefinitionId")
  .get(constructDefinitionCtrl.photo, constructDefinitionCtrl.defaultPhoto);

router
  .route("/api/constructs/definitions/defaultphoto")
  .get(constructDefinitionCtrl.defaultPhoto);

router
  .route("/api/constructs/definitions/:constructDefinitionId/usersWithAccess/new")
  .put(
    authCtrl.requireSignin
    //constructDefinitionCtrl.isInstructor,
    //constructDefinitionCtrl.newUsersWithAccess
  );

router
  .route("/api/constructs/definitions/:constructDefinitionId")
  .get(
    authCtrl.requireSignin,
    //authCtrl.hasAuthorization,
    constructDefinitionCtrl.readById)


router
  .route("/api/constructs/definitions/load/by/:userId")
  .put(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    authCtrl.requireSignin, constructDefinitionCtrl.loadGutenbergDefinitionData);

router.param(
  "constructDefinitionId",
  constructDefinitionCtrl.constructDefinitionById
);
router.param("userId", userCtrl.userById);

export default router;
