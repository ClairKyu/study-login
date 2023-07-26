"use strict";

const users = {
  id: ["1", "2"],
  pw: ["1", "2"],
};

const output = {
  home: (req, res) => {
    res.render("home/index");
  },

  login: (req, res) => {
    res.render("home/login");
  },
};

const process = {
  login: (req, res) => {
    console.log(req.body);
    const id = req.body.id;
    const pw = req.body.pw;

    if (users.id.includes(id)) {
      const idx = users.id.indexOf(id);
      if (users.pw[idx] === pw) {
        return res.json({
          success: true,
        });
      }
    }
    return res.json({
      success: false,
      msg: "로그인 실패",
    });
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
