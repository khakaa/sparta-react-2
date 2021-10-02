import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { actionCreators as postActions } from "../redux/modules/post";

import { Grid, Text, Button, Image, Input } from "../elements";
import Upload from "../shared/Upload";

// 세션이 있는지를 이미 App.js에서 체크를하고 세션이 있을 경우에는 로그인을 시켜줘라고 처리했기때문에
// 세션 체크를 해주지 않고 ,islogin 로그인이 되었는지만 확인하면 된다.

const PostWrite = (props) => {
  const isLogin = useSelector((state) => state.user.isLogin);
  const preview = useSelector((state) => state.image.preview);
  const { history } = props;
  const dispatch = useDispatch();

  const [contents, setContents] = React.useState("");

  const chageContents = (e) => {
    setContents(e.target.value);
  };

  const addPost = () => {
    dispatch(postActions.addPostFB(contents));
  };
  // console.log(contents);

  if (!isLogin) {
    return (
      <Grid center margin="100px 0px" padding="16px">
        <Text size="32px">앗 ! 잠깐!!!!!!!!!!</Text>
        <Text size="16px">로그인 후에만 글을 쓸 수 있어요</Text>
        <Button
          text="로그인 하러가기"
          _onClick={() => {
            history.replace("/");
          }}
        ></Button>
      </Grid>
    );
  }
  return (
    <>
      <Grid padding="16px">
        <Text margin="0px" size="36px" bold>
          게시글 작성
        </Text>
        <Upload />
      </Grid>

      <Grid>
        <Grid padding="16px">
          <Text margin="0px" size="24px" bold>
            {" "}
            미리보기
          </Text>
          <Image
            shape="rectangle"
            src={preview ? preview : "http://via.placeholder.com/400x300"}
          ></Image>
        </Grid>

        <Grid padding="16px">
          <Input
            _onChange={chageContents}
            multiLine
            label="게시글 내용"
            placeholder="게시글 작성"
          ></Input>
        </Grid>

        <Grid padding="16px">
          <Button _onClick={addPost} text="게시글 작성"></Button>
        </Grid>
      </Grid>
    </>
  );
};

export default PostWrite;
