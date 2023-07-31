"use strict";

//모듈
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
//const morgan = require("morgan");
//const logger = require("./src/config/logger");

const app = express();

//라우팅
const home = require("./src/routes/home");

//앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(express.static(`${__dirname}/src/public`)); //정적 경로 추가
app.use(express.json());
//URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(express.urlencoded({ extended: true }));
//app.use(morgan("tiny", { stream: logger.stream }));

app.use("/", home); //use -> 미들웨어를 등록해주는 메서드, 꼭 마지막줄에 넣어라!!!

module.exports = app;

//app.use(morgan("dev"));
