"use strict";

const { URLSearchParams } = require("url");

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

  static #getUsers(data, isAll, fields) {
    const users = JSON.parse(data);
    if (isAll) return users;
    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        //users에 해당하는 키값이 있는지 물어보는 것
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {});
    return newUsers;
  }

  static getUsers(isAll, ...fields) {
    return fs
      .readFile("./src/databases/users.json")
      .then((data) => {
        return this.#getUsers(data, isAll, fields); //은닉화된 메서드
      })
      .catch(console.error);
    //은닉화 후 메소드를 추가해서 전달해줘야 한다.
    //const users = this.#users;
  }

  static getUSerInfo(id) {
    return fs
      .readFile("./src/databases/users.json")
      .then((data) => {
        return this.#getUserInfo(data, id); //은닉화된 메서드
      })
      .catch(console.error);
  }

  static async save(userInfo) {
    const users = await this.getUsers(true); //모든 필드명 가져오고싶을때 true
    if (users.id.includes(userInfo.id)) {
      //클라이언트에 입력한 데이터가 데이터베이스에 있는지 확인
      throw "이미 존재하는 아이디 입니다"; //error 던져주기
    }
    users.id.push(userInfo.id);
    users.name.push(userInfo.name);
    users.pw.push(userInfo.pw);
    //데이터 추가
    fs.writeFile("./src/databases/users.json", JSON.stringify(users));
    return { success: true }; //위에 문장은 아무것도 반환해주지 않으니까 트루값 반환
  }
}

module.exports = UserStorage;
