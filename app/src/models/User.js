"use strict";

const UserStorage = require("./UserStorage");

class User {
  //생성자
  constructor(body) {
    this.body = body;
  }

  login() {
    const body = this.body;
    const { id, pw } = UserStorage.getUSerInfo(body.id); //클라이언트가 입력한 ID값 스토리지에 메소드로 전달
    if (id) {
      if (id === body.id && pw === body.pw) {
        return { success: true };
      }
      return { success: false, msg: "비밀번호가 틀렸습니다." };
    }
    return { success: false, msg: "존재하지 않는 아이디 입니다." };
  }
}

module.exports = User;
