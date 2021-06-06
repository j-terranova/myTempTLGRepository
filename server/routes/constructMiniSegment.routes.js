import express from "express";
import constructMiniSegmentCtrl from "../controllers/constructMiniSegment.controller";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router
  .route("/api/constructs/minisegments/by/:userId")
  .post(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructMiniSegmentCtrl.create
  )
  .put(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructMiniSegmentCtrl.update
  )
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructMiniSegmentCtrl.listByOwner
  );

router
.route("/api/constructs/minisegments/byId/:userId")
.get(
  authCtrl.requireSignin,
  authCtrl.hasAuthorization,
  constructMiniSegmentCtrl.readById)

router
  .route("/api/constructs/minisegments/byMaxUpdateDate/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructMiniSegmentCtrl.getCurrentConstructByMaxUpdateDateAndUserId
  );

router
  .route("/api/constructs/minisegments/byCriteria/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructMiniSegmentCtrl.listByCriteria
  );

router
  .route("/api/constructs/minisegments/photo/:constructMiniSegmentId")
  .get(constructMiniSegmentCtrl.photo, constructMiniSegmentCtrl.defaultPhoto);

router
  .route("/api/constructs/minisegments/defaultphoto")
  .get(constructMiniSegmentCtrl.defaultPhoto);

router
  .route("/api/constructs/minisegments/:constructMiniSegmentId/usersWithAccess/new")
  .put(
    authCtrl.requireSignin
  );

router
  .route("/api/constructs/minisegments/:constructMiniSegmentId")
  .get(
    authCtrl.requireSignin,
    //authCtrl.hasAuthorization,
    constructMiniSegmentCtrl.readById)


router.param(
  "constructMiniSegmentId",
  constructMiniSegmentCtrl.constructMiniSegmentById
);
router.param("userId", userCtrl.userById);

export default router;
