import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import moment from "moment";
import { storage } from "../../shared/firebase";

import { actionCreators as imageActions } from "./image";

// 목록 가져오고, 추가하기
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const LOADING = "LOADING"; // 로딩중인지 아닌지

const setPost = createAction(SET_POST, (postList, paging) => ({
  postList,
  paging,
}));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (postId, post) => ({ postId, post }));
const loading = createAction(LOADING, (isLoading) => ({ isLoading }));

const initialState = {
  list: [],
  paging: { start: null, next: null, size: 3 },
  isLoading: false,
};

const initialPost = {
  imageUrl: "/image-community/public/assets/sundog.jpeg",
  contents: "",
  commentCnt: 0,
  insertDt: moment().format("YYYY-MM-DD hh:mm:ss"), //날짜를 문자열로 바꿔준다.
};

const getPostFB = (start = null, size = 3) => {
  return function (dispatch, getState, { history }) {
    let pagingData = getState().post.paging; // 페이징 정보 가져오기

    // // 시작정보는 있는데 다음 가져올 데이터가 없다면 리스트가 끝난것이므로 그냥 return
    if (pagingData.start && !pagingData.next) {
      return;
    }

    dispatch(loading(true)); // 가져오기 시작

    const postDB = firestore.collection("post");

    let query = postDB.orderBy("insertDt", "desc"); // 작성일순으로 정렬하고, 2개씩 가져오는 쿼리

    // // 시작점 정보가 있으면 시작점부터 쿼리를 가져오도록 한다.
    if (start) {
      query = query.startAt(start);
    }

    // size보다 1개 더 많게 가져온다. 3개씩 끊어서 보여줄건데 4개를 가져올 수 있으면 다음페이지 정보를 알 수 있기 때문
    query
      .limit(size + 1)
      .get()
      .then((docs) => {
        let postList = [];

        let paging = {
          start: docs.docs[0],
          next:
            docs.docs.length === size + 1
              ? docs.docs[docs.docs.length - 1]
              : null,
          size: size,
        };

        docs.forEach((doc) => {
          let fsPost = doc.data();
          // console.log(fsPost);
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

        // console.log(postList);
        postList.pop(); // 마지막 하나는 빼준다. 마지막 데이터는 next 유무를 알려주기 위한 것일 뿐 리스트에 들어가지 않는다.

        dispatch(setPost(postList, paging));
        // dispatch(setPost(postList));
      });
  };
};

const getOnePostFB = (id) => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");
    postDB
      .doc(id)
      .get()
      .then((doc) => {
        let _post = doc.data();

        if (!_post) {
          return;
        }

        let post = Object.keys(_post).reduce(
          (acc, cur) => {
            if (cur.indexOf("user_") !== -1) {
              return {
                ...acc,
                userInfo: { ...acc.userInfo, [cur]: _post[cur] },
              };
            }
            return { ...acc, [cur]: _post[cur] };
          },
          { id: doc.id, userInfo: {} }
        );

        dispatch(setPost([post]));
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

    // data_url 로 파일 업로드하기
    const upload = storage
      .ref(`images/${userInfo.userId}_${new Date().getTime()}`) // 파일 이름은 유저의 id와 현재 시간을 밀리초로 넣어줍시다! (혹시라도 중복이 생기지 않도록요!)
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
              let post = {
                userInfo,
                ...postInfo,
                id: doc.id,
                imageUrl: url,
              };
              dispatch(addPost(post));
              history.replace("/");

              dispatch(imageActions.setPreview(null)); // 업로드 완료 후에는 미리보기 이미지를 기본값으로 다시 바꿔줌.
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

const editPostFB = (postId = null, post = {}) => {
  return function (dispatch, getState, { history }) {
    if (postId == null) {
      console.log("게시물 정보가 없어요");
      return;
    }
    const image = getState().image.preview;
    const postIdx = getState().post.list.findIndex((p) => p.id === postId);
    const getPost = getState().post.list[postIdx];

    console.log(getPost);

    const postDB = firestore.collection("post");

    // 사진이 그대로 일 때
    if (image === getPost.imageUrl) {
      postDB
        .doc(postId)
        .update(post)
        .then((doc) => {
          dispatch(editPost(postId, { ...post }));
          history.replace("/");
        });

      return;
    }
    // 사진이 변경되었을 때
    else {
      const userId = getState().user.user.uid;
      const upload = storage
        .ref(`images/${userId}_${new Date().getTime()}`)
        .putString(image, "data_url");

      upload.then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((url) => {
            console.log(url);

            return url;
          })
          .then((url) => {
            postDB
              .doc(postId)
              .update({ ...post, imageUrl: url })
              .then((doc) => {
                dispatch(editPost(postId, { ...post, imageUrl: url }));
                history.replace("/");
              });
          })
          .catch((err) => {
            window.alert("앗 이미지 업로드에 문제가 있어요");
          });
      });
    }
  };
};

export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.postList);

        draft.list = draft.list.reduce((acc, cur) => {
          // 중복된 값이 없을 떼
          if (acc.findIndex((a) => a.id === cur.id) === -1) {
            return [...acc, cur];
          }
          // 중복값이 있을 때 중복처리
          else {
            acc[acc.findIndex((a) => a.id === cur.id)] = cur;
            return acc;
          }
        }, []);
        if (action.payload.paging) {
          draft.paging = action.payload.paging;
        }
        draft.isLoading = false;
        // draft.list = action.payload.postList;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.postId);

        console.log(state.list[idx]);
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post }; // 내용이 수정되었을 수도 있고, 그대로일 수도 있으니 스프레드 문법으로 넣어주는 것이 더 편함
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.isLoading = action.payload.isLoading;
      }),
  },
  initialState
);

const actionCreators = {
  setPost,
  addPost,
  editPost,
  getPostFB,
  addPostFB,
  editPostFB,
  getOnePostFB,
};

export { actionCreators };
