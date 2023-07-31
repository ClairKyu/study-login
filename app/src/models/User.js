"use strict";

const UserStorage = require("./UserStorage");

class User {
  //생성자
  constructor(body) {
    this.body = body;
  }

  async login() {
    const client = this.body;
    try {
      //클라이언트가 입력한 ID값 스토리지에 메소드로 전달
      //promise 객체를 받아올때까지 기다려! 라는 뜻
      const user = await UserStorage.getUSerInfo(client.id);
      if (user) {
        if (user.id === client.id && user.pw === client.pw) {
          return { success: true };
        }
        return { success: false, msg: "비밀번호가 틀렸습니다." };
      }
      return { success: false, msg: "존재하지 않는 아이디 입니다." };
    } catch (err) {
      return { success: false, msg: err };
    }
  }
  async register() {
    const client = this.body;
    try {
      const response = await UserStorage.save(client);
      return response;
    } catch (err) {
      return { success: false, msg: err }; //중복되는 아이디 있을 때 에러 캐치를 위함
    }
  }
}

module.exports = User;
