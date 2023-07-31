"use strict";

const db = require("../config/db");

class UserStorage {
  static getUSerInfo(id) {
    //promise 시간이 오래걸리는 구문을 실행시킬 때 사용
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE id = ?;";
      db.query(query, [id], (err, data) => {
        if (err) reject(err); //실패했을 때
        resolve(data[0]); //성공했을 때 데이터 전달
      });
    });
  }

  static async save(userInfo) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO users(id, name, pw) VALUES(?, ?, ?);";
      db.query(query, [userInfo.id, userInfo.name, userInfo.pw], (err) => {
        if (err) reject(`${err}`); //실패했을 때
        resolve({ success: true }); //성공했을 때 데이터 전달
      });
    });
  }
}

module.exports = UserStorage;
