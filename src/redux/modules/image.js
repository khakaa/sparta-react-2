import { createAction, handleActions } from "redux-actions";
import produce from "immer";

import { storage } from "../../shared/firebase";

const UPLOADING = "UPLOADING"; // 업로드 중인지 아닌지
const UPLOAD_IMAGE = "UPLOAD_IMAGE"; // 실제 업로드
const SET_PREVIEW = "SET_PREVIEW";

const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const uploadImage = createAction(UPLOAD_IMAGE, (imageUrl) => ({ imageUrl }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));

const initailState = {
  imageUrl: "",
  uploading: false,
  preview: null,
};

const uploadImageFB = (image) => {
  return function (dispatch, getState, { history }) {
    dispatch(uploading(true)); //업로드 시작
    const upload = storage.ref(`images/${image.name}`).put(image); // 파일 이름을 포함하여 파일의 전체 경로를 가리키는 참조를 만든다.

    // 업로드
    upload.then((snapshot) => {
      // dispatch(uploading(false));
      // 업로드 끝남 -> uploadImage에서 uploading state도 false로 바꿔주면 dipatch는 한 번만 해도 된다.

      //업로드한 파일의 다운로드 경로를 가져온다.
      snapshot.ref.getDownloadURL().then((url) => {
        dispatch(uploadImage(url));
      });
    });
  };
};

export default handleActions(
  {
    [UPLOAD_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.imageUrl = action.payload.imageUrl;
        draft.uploading = false;
      }),
    [UPLOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.uploading = action.payload.uploading;
      }),
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
  },
  initailState
);

const actionCreators = {
  uploadImage,
  uploadImageFB,
  setPreview,
};

export { actionCreators };
