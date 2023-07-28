"use strict";

const id = document.querySelector("#id");
const name = document.querySelector("#name");
const pw = document.querySelector("#pw");
const confirmPw = document.querySelector("#confirm-pw");
const registerBtn = document.querySelector("#button"); //버튼태그 아이디값 부여로 # 추가
registerBtn.addEventListener("click", register);

function register() {
  if (!id.value) return alert("아이디를 입력하여 주십시오.");
  if (!name.value) return alert("이름을 입력하여 주십시오.");
  if (!pw.value) return alert("비밀번호를 입력하여 주십시오.");
  if (!confirmPw.value) return alert("비밀번호 확인을 입력하여 주십시오.");

  if (pw.value !== confirmPw.value)
    return alert("비밀번호가 일치하지 않습니다.");

  const req = {
    id: id.value,
    name: name.value,
    pw: pw.value,
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
