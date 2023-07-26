"use strict";

const id = document.querySelector("#id");
const pw = document.querySelector("#pw");
const loginBtn = document.querySelector("button");

loginBtn.addEventListener("click", login);

function login() {
  const req = {
    id: id.value,
    pw: pw.value,
  };
  console.log(req, JSON.stringify(req));

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req), //로그인 정보를 전달하는 fetch 생성, 서버에 전달
  })
    .then((res) => res.json())
    .then(console.log); //서버 응답 데이터 받으려면
}
