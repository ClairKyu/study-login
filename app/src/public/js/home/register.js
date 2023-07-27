"use strict";

const id = document.querySelector("#id");
const name = document.querySelector("#name");
const pw = document.querySelector("#pw");
const confirmPw = document.querySelector("#confirm-pw");
const registerBtn = document.querySelector("#button"); //버튼태그 아이디값 부여로 # 추가
registerBtn.addEventListener("click", register);

function register() {
  const req = {
    id: id.value,
    name: name.value,
    pw: pw.value,
    confirmPw: confirmPw.value,
  };

  fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req), //로그인 정보를 전달하는 fetch 생성, 서버에 전달
  })
    .then((res) => res.json()) //서버 응답 데이터 받으려면
    .then((res) => {
      if (res.success) {
        location.href = "/login";
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      //에러발생
      console.error(new Error("회원가입중 에러 발생"));
    });
}
