"use strict";

const fs = require("fs").promises; //파일 시스템, 파일 읽을 수 있도록

class UserStorage {
  static #getUserInfo(data, id) {
    //변수나 메서드는 클래스 최 상단
    const users = JSON.parse(data);
    const idx = users.id.indexOf(id);
    const usersKeys = Object.keys(users); // => [id, pw, name]
    const userInfo = usersKeys.reduce((newUser, info) => {
      newUser[info] = users[info][idx];
      return newUser;
    }, {});

    return userInfo;
  }

  static getUsers(...fields) {
    //은닉화 후 메소드를 추가해서 전달해줘야 한다.
    //const users = this.#users;
    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        //users에 해당하는 키값이 있는지 물어보는 것
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {});
    return newUsers;
  }

  static getUSerInfo(id) {
    return fs
      .readFile("./src/databases/users.json")
      .then((data) => {
        return this.#getUserInfo(data, id); //은닉화된 메서드
      })
      .catch(console.error);
  }
}

module.exports = UserStorage;
