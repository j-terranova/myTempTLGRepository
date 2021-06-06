import express from "express";
import constructEquationCtrl from "../controllers/constructEquation.controller";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();
router
  .route("/api/constructs/equations/by/:userId")
  .post(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructEquationCtrl.create
  )
  .put(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructEquationCtrl.update
  )
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructEquationCtrl.listByOwner
  );

router
.route("/api/constructs/equations/byId/:userId")
.get(
  authCtrl.requireSignin,
  authCtrl.hasAuthorization,
  constructEquationCtrl.readById)

router
  .route("/api/constructs/equations/byMaxUpdateDate/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructEquationCtrl.getCurrentConstructByMaxUpdateDateAndUserId
  );

router
  .route("/api/constructs/equations/byCriteria/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructEquationCtrl.listByCriteria
  );

router
  .route("/api/constructs/equations/photo/:constructEquationId")
  .get(constructEquationCtrl.photo, constructEquationCtrl.defaultPhoto);

router
  .route("/api/constructs/equations/defaultphoto")
  .get(constructEquationCtrl.defaultPhoto);

router
  .route("/api/constructs/equations/:constructEquationId")
  .get(
    authCtrl.requireSignin,
    //authCtrl.hasAuthorization,
    constructEquationCtrl.readById)


router
  .route("/api/constructs/equations/load/by/:userId")
  .put(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    authCtrl.requireSignin, constructEquationCtrl.loadGutenbergEquationData);

router.param(
  "constructEquationId",
  constructEquationCtrl.constructEquationById
);
router.param("userId", userCtrl.userById);

export default router;
