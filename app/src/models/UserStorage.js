"use strict";

class UserStorage {
  static #users = {
    //#users 은닉화
    //static 정적 변수 선언해야 클래스에서 바로 접근해서 사용 할 수 있다.
    id: ["1", "2"],
    pw: ["1", "2"],
    name: ["a", "b"],
  };

  static getUsers(...fields) {
    //은닉화 후 메소드를 추가해서 전달해줘야 한다.
    const users = this.#users;
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
    const users = this.#users;
    const idx = users.id.indexOf(id);
    const usersKeys = Object.keys(users); // => [id, pw, name]
    const userInfo = usersKeys.reduce((newUser, info) => {
      newUser[info] = users[info][idx];
      return newUser;
    }, {});

    return userInfo;
  }
}

module.exports = UserStorage;
