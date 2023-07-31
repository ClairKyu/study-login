"use strict";

const logger = require("../../config/logger");
const User = require("../../models/User");

//GET 부분
const output = {
  home: (req, res) => {
    logger.info(`GET / 200 "홈 화면으로 이동"`);
    res.render("home/index");
  },

  login: (req, res) => {
    logger.info(`GET /login 200 "로그인 화면으로 이동"`);
    res.render("home/login");
  },

  register: (req, res) => {
    logger.info(`GET /register 200 "회원가입 화면으로 이동"`);
    res.render("home/register");
  },
};

//POST 부분
const process = {
  login: async (req, res) => {
    const user = new User(req.body);
    const response = await user.login();
    if (response.err)
      logger.error(
        `POST /login 200 Response: "success: ${response.success}, msg:${response.err}"`
      );
    else
      logger.info(
        `POST /login 200 Response: "success: ${response.success}, msg:${response.msg}"`
      );
    return res.json(response); //클라이언트에 던져줌
  },
  register: async (req, res) => {
    const user = new User(req.body);
    const response = await user.register();
    if (response.err)
      logger.error(
        `POST /login 200 Response: "success: ${response.success}, msg:${response.err}"`
      );
    else
      logger.info(
        `POST /register 200 Response: "success: ${response.success}, msg:${response.msg}"`
      );
    return res.json(response); //클라이언트에 던져줌
  },
};

module.exports = {
  output,
  process,
};

/*{
    hello: hello,
    login: login,
};

이거랑 같은 뜻*/
