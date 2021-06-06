import express from "express";
import constructQuoteCtrl from "../controllers/constructQuote.controller";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router
  .route("/api/constructs/quotes/by/:userId")
  .post(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructQuoteCtrl.create
  )
  .put(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructQuoteCtrl.update
  )
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructQuoteCtrl.listByOwner
  );

router
.route("/api/constructs/quotes/byId/:userId")
.get(
  authCtrl.requireSignin,
  authCtrl.hasAuthorization,
  constructQuoteCtrl.readById)

router
  .route("/api/constructs/quotes/byMaxUpdateDate/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructQuoteCtrl.getCurrentConstructByMaxUpdateDateAndUserId
  );

  router
.route("/api/constructs/quotes/byDifficultyLevel/:userId")
.get(
  authCtrl.requireSignin,
  authCtrl.hasAuthorization,
  constructQuoteCtrl.getRandomOptions
);

router
  .route("/api/constructs/quotes/byCriteria/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructQuoteCtrl.listByCriteria
  );

router
  .route("/api/constructs/quotes/photo/:constructQuoteId")
  .get(constructQuoteCtrl.photo, constructQuoteCtrl.defaultPhoto);

router
  .route("/api/constructs/quotes/defaultphoto")
  .get(constructQuoteCtrl.defaultPhoto);

router
  .route("/api/constructs/quotes/:constructQuoteId/usersWithAccess/new")
  .put(
    authCtrl.requireSignin
    //constructQuoteCtrl.isInstructor,
    //constructQuoteCtrl.newUsersWithAccess
  );

router
  .route("/api/constructs/quotes/:constructQuoteId")
  .get(
    authCtrl.requireSignin,
    //authCtrl.hasAuthorization,
    constructQuoteCtrl.readById)


router.param(
  "constructQuoteId",
  constructQuoteCtrl.constructQuoteById
);
router.param("userId", userCtrl.userById);

export default router;
