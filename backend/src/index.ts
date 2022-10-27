import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postRoute from "./routes/post.route";
import userRoute from "./routes/user.route";
import authRoute from "./routes/auth.route";
import categoryRoute from './routes/category.route';
import cors from 'cors';
import passport from "passport";
require('./config/passport');

import "dotenv/config";
import bodyParser, { json } from 'body-parser';
import cookieParser from "cookie-parser";
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./api.yaml');


dotenv.config();


const app: Express = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use(cookieParser());
app.use(passport.initialize());
// app.use(passport.session());

const port = process.env.PORT;

mongoose.connect(`${process.env.MONGO_URL}`, {
  //useNewUrlParser: true
  //useUnifiedTopology: true
},
  err => {
    if (!err) {
      console.log('Database connection successed');
    } else {
      console.log('Error in connection ' + err);
    }
  });

app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/api/posts', passport.authenticate('jwt', { session: false }), postRoute);
app.use('/api/users', passport.authenticate('jwt', { session: false }), userRoute);
app.use('/api/categories', passport.authenticate('jwt', { session: false }), categoryRoute);
app.use("/api", authRoute);

app.get('/', (req: Request, res: Response) => {
  res.send("/Hello World");
});

app.listen(port, () => {
  console.log(`[server]:Server is running at https://localhost:${port}`);
})
