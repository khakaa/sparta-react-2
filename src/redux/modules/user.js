import { createAction, handleActions } from "redux-actions"; //액션, 리듀서를 편하게 만들어 주는 것
import { produce } from "immer";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";

import firebase from "firebase/app";
import { auth } from "../../shared/firebase";

// action
const SET_USER = "SET_USER";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";

// action creators
// createAction으로 간단하게 작성할 수 있다.
const setUser = createAction(SET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));

// initialState
const initialState = {
  user: null,
  isLogin: false,
};

//middleware actions
// 로그인
const loginFB = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    auth
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then((result) => {
        auth
          .signInWithEmailAndPassword(id, pwd)
          .then((user) => {
            console.log(user);
            dispatch(
              setUser({
                userName: user.user.displayName,
                id: id,
                userProfile: "/image-community/public/assets/sundog.jpeg",
                uid: user.user.uid, // 고유값
              })
            );

            history.push("/");
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode, errorMessage);
          });
      });
  };
};

// 회원가입 요청 . 파이어베이스와 통신하는 함수
const signupFB = (id, pwd, userName) => {
  return function (dispatch, getState, { history }) {
    auth
      .createUserWithEmailAndPassword(id, pwd)
      .then((user) => {
        console.log(user);

        auth.currentUser
          .updateProfile({
            displayName: userName,
          })
          .then(() => {
            dispatch(
              setUser({
                userName: userName,
                id: id,
                userProfile: "/image-community/public/assets/sundog.jpeg",
                uid: user.user.uid,
              })
            );
            history.push("/");
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode, errorMessage);
        // ..
      });
  };
};

// firebase에 저장된 유저의 로그인 정보를 firebase의 인증메소드를 이용해서 가져와서 다시 reducer에 넣어준다.
const loginCheckFB = () => {
  return function (dispatch, getState, { history }) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setUser({
            userName: user.displayName,
            userProfile: "/image-community/public/assets/sundog.jpeg",
            id: user.email,
            uid: user.uid, // firebase의 user's unique ID
          })
        );
      } else {
        dispatch(logOut());
      }
    });
  };
};

const logoutFB = () => {
  return function (dispatch, getState, { history }) {
    auth.signOut().then(() => {
      dispatch(logOut());
      history.replace("/"); // 지금있는 페이지를 '/' 페이지로 대체한다. 뒤로가기 해도 전에 페이지가 안나옴
    });
  };
};

// reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        setCookie("is_login", "success");
        draft.user = action.payload.user;
        draft.isLogin = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("is_login");
        draft.user = null;
        draft.isLogin = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

// action creator export
const actionCreators = {
  logoutFB,
  getUser,
  signupFB,
  loginFB,
  loginCheckFB,
};

export { actionCreators };
