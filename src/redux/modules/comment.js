import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore, realtime } from "../../shared/firebase";
import moment from "moment";

import { actionCreators as postActions } from "./post";

import firebase from "firebase";

const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const LOADING = "LOADING";

const setComment = createAction(SET_COMMENT, (postId, commentList) => ({
  postId,
  commentList,
}));
const addComment = createAction(ADD_COMMENT, (postId, comment) => ({
  postId,
  comment,
}));

const loading = createAction(LOADING, (isLoading) => ({ isLoading }));

const initialState = {
  list: {},
  is_loading: false,
};

const addCommentFB = (postId, contents) => {
  return function (dispatch, getState, { history }) {
    const commentDB = firestore.collection("comment");
    const userInfo = getState().user.user;

    let comment = {
      postId: postId,
      userId: userInfo.uid,
      userName: userInfo.userName,
      userProfile: userInfo.userProfile,
      contents: contents,
      insertDt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };

    // firestore에 코멘트 정보를 넣어요!
    //댓글 작성이 성공하면 post정보도 업데이트해준다.
    commentDB.add(comment).then((doc) => {
      const postDB = firestore.collection("post");
      comment = { ...comment, id: doc.id };

      const post = getState().post.list.find((l) => l.id === postId);

      //   firestore에 저장된 현재 값을 찾아서 +1해준다. firebase에서 제공해주는 기능
      const increment = firebase.firestore.FieldValue.increment(1);

      // post에도 comment_cnt를 하나 플러스 해줍니다.
      postDB
        .doc(postId)
        .update({ commentCnt: increment }) // increment = commentCnt + 1
        .then((_post) => {
          dispatch(addComment(postId, comment));
          // 리덕스에 post가 있을 때만 post의 comment_cnt를 +1해줍니다.
          if (post) {
            dispatch(
              postActions.editPost(postId, {
                commentCnt: parseInt(post.commentCnt) + 1,
              })
            );

            const notiItem = realtime
              .ref(`noti/${post.userInfo.userId}/list`)
              .push(); // 공간을 잡아줌 key값을 받아올수있다
            // notiDB.update({ read: false });

            notiItem.set(
              {
                postId: post.id,
                userName: comment.userName,
                imageUrl: post.imageUrl,
                insertDt: comment.insertDt,
              },
              (err) => {
                if (err) {
                  console.log("알림 저장 실패 8ㅛ8");
                } else {
                  // 알림이 가게 해줍니다!
                  const notiDB = realtime.ref(`noti/${post.userInfo.userId}`);
                  // 읽음 상태를 false로 바꿔주면 되겠죠!
                  notiDB.update({ read: false });
                }
              }
            );
          }
        });
    });
  };
};

const getCommentFB = (postId) => {
  return function (dispatch, getState, { history }) {
    const commentDB = firestore.collection("comment");

    // postId가 없으면 바로 리턴하기!
    if (!postId) {
      return;
    }

    // where로 게시글 id가 같은 걸 찾고,
    // orderBy로 정렬해줍니다.
    commentDB
      .where("postId", "==", postId)
      .orderBy("insertDt", "desc")
      .get()
      .then((docs) => {
        let list = [];
        docs.forEach((doc) => {
          list.push({ ...doc.data(), id: doc.id });
        });
        //   가져온 데이터를 넣어주자!
        dispatch(setComment(postId, list));
      })
      .catch((err) => {
        console.log("댓글 가져오기 실패!", postId, err);
      });
  };
};

export default handleActions(
  {
    [SET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        // comment는 딕셔너리 구조로 만들어서,
        // postId로 나눠 보관합시다! (각각 게시글 방을 만들어준다고 생각하면 구조 이해가 쉬워요.)
        draft.list[action.payload.postId] = action.payload.commentList;
      }),
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.postId].unshift(action.payload.comment);
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

const actionCreators = {
  getCommentFB,
  setComment,
  addComment,
  addCommentFB,
};

export { actionCreators };
