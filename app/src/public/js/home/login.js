"use strict";

const id = document.querySelector("#id");
const pw = document.querySelector("#pw");
const loginBtn = document.querySelector("#button");

loginBtn.addEventListener("click", login);

function login() {
  if (!id.value) return alert("아이디를 입력하여 주십시오.");
  if (!pw.value) return alert("비밀번호를 입력하여 주십시오.");

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
    .then((res) => res.json()) //서버 응답 데이터 받으려면
    .then((res) => {
      if (res.success) {
        location.href = "/";
      } else {
        if (res.err) return alert(res.err);
        alert(res.msg);
      }
    })
    .catch((err) => {
      //에러발생
      console.error(new Error("로그인중 에러 발생"));
    });
}
