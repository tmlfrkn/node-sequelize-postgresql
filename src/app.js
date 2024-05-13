import express from "express";
import bodyParser from 'body-parser';

const app = express();

app.use(
    bodyParser.json({
      limit: '5mb',
    }),
  );

export default app;
