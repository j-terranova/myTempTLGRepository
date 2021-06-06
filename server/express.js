import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import Template from "./../template";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import courseRoutes from "./routes/course.routes";
import constructAssociationRoutes from "./routes/constructAssociation.routes";
import constructDefinitionRoutes from "./routes/constructDefinition.routes";
import constructFactRoutes from "./routes/constructFact.routes";
import constructPrefixRoutes from "./routes/constructPrefix.routes";
import constructQuestionRoutes from "./routes/constructQuestion.routes";
import constructQuoteRoutes from "./routes/constructQuote.routes";
import constructRootWordRoutes from "./routes/constructRootWord.routes";
import constructMiniSegmentRoutes from "./routes/constructMiniSegment.routes";
import constructSegmentRoutes from "./routes/constructSegment.routes";
import constructStatementRoutes from "./routes/constructStatement.routes";
import constructSuffixRoutes from "./routes/constructSuffix.routes";
import frameworkLessonRoutes from "./routes/frameworkLesson.routes";

import frameworkTabularRoutes from "./routes/frameworkTabular.routes";
import frameworkTicTacToeRoutes from "./routes/frameworkTicTacToe.routes";
import frameworkTriviaRoutes from "./routes/frameworkTrivia.routes";
import enrollmentRoutes from "./routes/enrollment.routes";

import learnerLessonRoutes from "./routes/learnerLesson.routes";
import frameworkRecentlyViewedRoutes from "./routes/frameworkRecentlyViewed.routes";
import gamerResultRoutes from "./routes/gamerResult.routes";
import educationPreferencesRoutes from "./routes/educationPreferences.routes";
import gamerPreferencesRoutes from "./routes/gamerPreferences.routes";
import constructPreferencesRoutes from "./routes/constructPreferences.routes";
import referenceDataRoutes from "./routes/referenceData.routes";

import groupAccessRoutes from "./routes/groupAccess.routes";
import imageStoreRoutes from "./routes/imageStore.routes";

// modules for server side rendering
import React from "react";
import ReactDOMServer from "react-dom/server";
import MainRouter from "./../client/core/MainRouter";
import { StaticRouter } from "react-router-dom";

import { ServerStyleSheets, ThemeProvider } from "@material-ui/styles";
import theme from "./../client/core/theme";
//end

//comment out before building for production
import devBundle from "./devBundle";

const CURRENT_WORKING_DIR = process.cwd();
const app = express();

//comment out before building for production
devBundle.compile(app);

// parse body params and attache them to req.body
app.use(bodyParser.json());
// this next line could replaces bodyParser line above
// before doing that then need to understand how bodyParser.urlencoded will work.
//app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
// secure apps by setting various HTTP headers
app.use(helmet());
// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

// mount routes
app.use("/", userRoutes);
app.use("/", authRoutes);
app.use("/", courseRoutes);
app.use("/", constructAssociationRoutes);
app.use("/", constructDefinitionRoutes);
app.use("/", constructFactRoutes);
app.use("/", constructPrefixRoutes);
app.use("/", constructQuestionRoutes);
app.use("/", constructQuoteRoutes);
app.use("/", constructRootWordRoutes);
app.use("/", constructMiniSegmentRoutes);
app.use("/", constructSegmentRoutes);
app.use("/", constructStatementRoutes);
app.use("/", constructSuffixRoutes);
app.use("/", frameworkLessonRoutes);

app.use("/", frameworkTabularRoutes);
app.use("/", frameworkTicTacToeRoutes);
app.use("/", frameworkTriviaRoutes);
app.use("/", enrollmentRoutes);
app.use("/", learnerLessonRoutes);
app.use("/", groupAccessRoutes);
app.use("/", imageStoreRoutes);
app.use("/", frameworkRecentlyViewedRoutes);
app.use("/", gamerResultRoutes);
app.use("/", educationPreferencesRoutes);
app.use("/", gamerPreferencesRoutes);
app.use("/", constructPreferencesRoutes);
app.use("/", referenceDataRoutes);


app.get("*", (req, res) => {
  const sheets = new ServerStyleSheets();
  const context = {};
  const markup = ReactDOMServer.renderToString(
    sheets.collect(
      <StaticRouter location={req.url} context={context}>
        <ThemeProvider theme={theme}>
          <MainRouter />
        </ThemeProvider>
      </StaticRouter>
    )
  );
  if (context.url) {
    return res.redirect(303, context.url);
  }
  const css = sheets.toString();
  res.status(200).send(
    Template({
      markup: markup,
      css: css,
    })
  );
});

// Catch unauthorised errors
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});

export default app;
