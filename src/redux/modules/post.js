import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import moment from "moment";
import { storage } from "../../shared/firebase";

import { actionCreators as imageActions } from "./image";

// 목록 가져오고, 추가하기
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";

const setPost = createAction(SET_POST, (postList) => ({ postList }));
const addPost = createAction(ADD_POST, (post) => ({ post }));

const initialState = {
  list: [],
};

const initialPost = {
  imageUrl: "/image-community/public/assets/sundog.jpeg",
  contents: "",
  commentCnt: 0,
  insertDt: moment().format("YYYY-MM-DD hh:mm:ss"), //날짜를 문자열로 바꿔준다.
};

const getPostFB = () => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");

    const postList = [];
    postDB.get().then((docs) => {
      docs.forEach((doc) => {
        let fsPost = doc.data();
        console.log(fsPost);
        // fsPost의 key값들을 배열로 만들어서 post에 넣어준다
        let post = Object.keys(fsPost).reduce(
          (acc, cur) => {
            if (cur.indexOf("user") !== -1) {
              return {
                ...acc,
                userInfo: { ...acc.userInfo, [cur]: fsPost[cur] },
              };
            }
            return { ...acc, [cur]: fsPost[cur] }; // 객체의 키 값으로 변수를 넣어줄 때 [] 로 감싸준다.
          },
          { id: doc.id, userInfo: {} }
        );

        postList.push(post);
      });

      dispatch(setPost(postList));
    });
  };
};

const addPostFB = (contents = "") => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");
    const _user = getState().user.user;

    const userInfo = {
      userName: _user.userName,
      userId: _user.uid,
      userProfile: _user.userProfile,
    };

    const postInfo = {
      ...initialPost,
      contents: contents,
      insertDt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };

    // getState로 image 리덕스 스토어에 접근해서 preview 가져오기
    const previewImg = getState().image.preview;
    // console.log(previewImg);
    // console.log(typeof previewImg);

    const upload = storage
      .ref(`images/${userInfo.userId}_${new Date().getTime()}`)
      .putString(previewImg, "data_url");

    upload.then((snapshot) => {
      snapshot.ref
        .getDownloadURL()
        .then((url) => {
          console.log(url);
          return url;
        })
        .then((url) => {
          postDB
            .add({ ...userInfo, ...postInfo, imageUrl: url })
            .then((doc) => {
              let post = { userInfo, ...postInfo, id: doc.id, imageUrl: url };
              dispatch(addPost(post));
              history.replace("/");

              dispatch(imageActions.setPreview(null));
            })
            .catch((err) => {
              window.alert("앗! 포스트 작성에 문제가 있어요");
              console.log("post 실패", err);
            });
        })
        .catch((err) => {
          window.alert("앗 이미지 업로드에 묹게가 있어요");
          console.log("앗 이미지 업로드에 문제가 있어요", err);
        });
    });
    // console.log({ ...userInfo, ...postInfo });
  };
};

export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.postList;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
  },
  initialState
);

const actionCreators = {
  setPost,
  addPost,
  getPostFB,
  addPostFB,
};

export { actionCreators };
