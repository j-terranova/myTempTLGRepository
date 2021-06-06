import express from "express";
import constructSegmentCtrl from "../controllers/constructSegment.controller";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();
router
  .route("/api/constructs/segments/by/:userId")
  .post(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructSegmentCtrl.create
  )
  .put(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructSegmentCtrl.update
  )
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructSegmentCtrl.listByOwner
  );

router
.route("/api/constructs/segments/byId/:userId")
.get(
  authCtrl.requireSignin,
  authCtrl.hasAuthorization,
  constructSegmentCtrl.readById)

router
  .route("/api/constructs/segments/byMaxUpdateDate/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructSegmentCtrl.getCurrentConstructByMaxUpdateDateAndUserId
  );

router
  .route("/api/constructs/segments/byCriteria/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructSegmentCtrl.listByCriteria
  );

router
  .route("/api/constructs/segments/photo/:constructSegmentId")
  .get(constructSegmentCtrl.photo, constructSegmentCtrl.defaultPhoto);

router
  .route("/api/constructs/segments/defaultphoto")
  .get(constructSegmentCtrl.defaultPhoto);

router
  .route("/api/constructs/segments/:constructSegmentId/usersWithAccess/new")
  .put(
    authCtrl.requireSignin
    //constructSegmentCtrl.isInstructor,
    //constructSegmentCtrl.newUsersWithAccess
  );

router
  .route("/api/constructs/segments/:constructSegmentId")
  .get(
    authCtrl.requireSignin,
    //authCtrl.hasAuthorization,
    constructSegmentCtrl.readById)


router.param(
  "constructSegmentId",
  constructSegmentCtrl.constructSegmentById
);
router.param("userId", userCtrl.userById);

export default router;
