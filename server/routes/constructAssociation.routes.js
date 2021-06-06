import express from "express";
import constructAssociationCtrl from "../controllers/constructAssociation.controller";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();
router
  .route("/api/constructs/associations/by/:userId")
  .post(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructAssociationCtrl.create
  )
  .put(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructAssociationCtrl.update
  )
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructAssociationCtrl.listByOwner
  );

router
.route("/api/constructs/associations/byId/:userId")
.get(
  authCtrl.requireSignin,
  authCtrl.hasAuthorization,
  constructAssociationCtrl.readById)

router
  .route("/api/constructs/associations/byMaxUpdateDate/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructAssociationCtrl.getCurrentConstructByMaxUpdateDateAndUserId
  );

  router
  .route("/api/constructs/associations/antonym/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructAssociationCtrl.getAntonymRandomOptions
  );
  router
  .route("/api/constructs/associations/synonym/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructAssociationCtrl.getSynonymRandomOptions
  );

router
  .route("/api/constructs/associations/byCriteria/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructAssociationCtrl.listByCriteria
  );

router
  .route("/api/constructs/associations/photo/:constructAssociationId")
  .get(constructAssociationCtrl.photo, constructAssociationCtrl.defaultPhoto);

router
  .route("/api/constructs/associations/defaultphoto")
  .get(constructAssociationCtrl.defaultPhoto);

router
  .route("/api/constructs/associations/:constructAssociationId")
  .get(
    authCtrl.requireSignin,
    //authCtrl.hasAuthorization,
    constructAssociationCtrl.readById)


router
  .route("/api/constructs/associations/load/by/:userId")
  .put(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    authCtrl.requireSignin, constructAssociationCtrl.loadGutenbergAssociationData);

router.param(
  "constructAssociationId",
  constructAssociationCtrl.constructAssociationById
);
router.param("userId", userCtrl.userById);

export default router;
