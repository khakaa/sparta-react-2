// 쿠키를 만드는 함수
export function getCookie(name) {
  let value = "; " + document.cookie; // user_id = dubu ; ex=22222     user_pw = ppp
  let parts = value.split(`; ${name}=`); // 첫번째꺼 버리고 두번째값 부터 valu값만 가지고온다.

  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
}

// 쿠키를 가져오는 함수
export function setCookie(name, value, exp) {
  let date = new Date();
  date.setTime(date.getTime() + exp * 60 * 60 * 24 * 1000); // 숫자로 바꿔서 만료시간 만들어 준 다음에
  document.cookie = `${name} = ${value}; expires=${date.toUTCString()}`; // 문자로 바꿔서 넣어줌.
}

// 쿠키를 삭제하는 함수
export function deleteCookie(name) {
  let date = new Date("2020-02-02").toUTCString();

  console.log(date);

  document.cookie = name + "=; expires=" + date;
}
