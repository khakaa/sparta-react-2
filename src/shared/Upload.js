import React from "react";
import { storage } from "./firebase";

import { useDispatch, useSelector } from "react-redux";

import { actionCreators as imageActions } from "../redux/modules/image";
import { Button } from "../elements";

const Upload = (props) => {
  const fileInput = React.useRef();
  const dispatch = useDispatch();
  const isUploading = useSelector((state) => state.image.uploading);

  const uploadFB = () => {
    if (!fileInput.current || fileInput.current.files.length === 0) {
      window.alert("파일을 선택해주세요!");
      return;
    }

    dispatch(imageActions.uploadImageFB(fileInput.current.files[0]));
  };

  // input에 이벤트가 발생했을 때 파일에 대한 정보가 담긴 객체를 불러올 수 이따.
  const selectFile = (e) => {
    console.log(e);
    console.log(e.target);
    console.log(e.target.files);

    console.log(fileInput.current.files[0]);

    const fileReader = new FileReader();
    const file = fileInput.current.files[0];

    fileReader.readAsDataURL(file); //  url 가져오는 내장 메소드

    // 읽기가 끝나면 발생하는 이벤트 핸들러
    fileReader.onloadend = () => {
      console.log(fileReader.result);
      dispatch(imageActions.setPreview(fileReader.result));
    };
  };

  return (
    <>
      <input
        type="file"
        ref={fileInput}
        onChange={selectFile}
        disabled={isUploading}
      />
      <Button _onClick={uploadFB} text="업로드하기"></Button>
    </>
  );
};

export default Upload;
