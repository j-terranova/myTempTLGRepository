import express from "express";
import constructStatementCtrl from "../controllers/constructStatement.controller";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router
  .route("/api/constructs/statements/by/:userId")
  .post(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructStatementCtrl.create
  )
  .put(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructStatementCtrl.update
  )
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructStatementCtrl.listByOwner
  );

router
.route("/api/constructs/statements/byId/:userId")
.get(
  authCtrl.requireSignin,
  authCtrl.hasAuthorization,
  constructStatementCtrl.readById)

router
  .route("/api/constructs/statements/byMaxUpdateDate/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructStatementCtrl.getCurrentConstructByMaxUpdateDateAndUserId
  );

router
  .route("/api/constructs/statements/byCriteria/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructStatementCtrl.listByCriteria
  );

router
  .route("/api/constructs/statements/photo/:constructStatementId")
  .get(constructStatementCtrl.photo, constructStatementCtrl.defaultPhoto);

router
  .route("/api/constructs/statements/defaultphoto")
  .get(constructStatementCtrl.defaultPhoto);

router
  .route("/api/constructs/statements/:constructStatementId/usersWithAccess/new")
  .put(
    authCtrl.requireSignin
    //constructStatementCtrl.isInstructor,
    //constructStatementCtrl.newUsersWithAccess
  );

router
  .route("/api/constructs/statements/:constructStatementId")
  .get(
    authCtrl.requireSignin,
    //authCtrl.hasAuthorization,
    constructStatementCtrl.readById)


router.param(
  "constructStatementId",
  constructStatementCtrl.constructStatementById
);
router.param("userId", userCtrl.userById);

export default router;
