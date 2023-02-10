import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import userRoute from "./routes/userRoutes.js";
import imageRoute from "./routes/imageRoutes.js";

import fs from 'fs'
import uuidv4 from 'uuidv4'

import Image from "./models/imageModel.js";

const app = express();


const port = process.env.PORT || 5000;
const connecturl =
  "mongodb+srv://hameed381:y16cs943@cluster0.l6plzgu.mongodb.net/christTheKing?retryWrites=true&w=majority";
mongoose
  .connect(connecturl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(port, () =>
      console.log(
        `Database connection Succeeded and server is running on ${port}`
      )
    )
  )
  .catch((err) => console.log(err.message));

app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());





app.use("/api/users/", express.static('images'), userRoute);

