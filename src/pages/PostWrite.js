import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";

import { Grid, Text, Button, Image, Input } from "../elements";
import Upload from "../shared/Upload";

// 세션이 있는지를 이미 App.js에서 체크를하고 세션이 있을 경우에는 로그인을 시켜줘라고 처리했기때문에
// 세션 체크를 해주지 않고 ,islogin 로그인이 되었는지만 확인하면 된다.

const PostWrite = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);
  const preview = useSelector((state) => state.image.preview);
  const postList = useSelector((state) => state.post.list);

  const postId = props.match.params.id; // 파라미터로 넘겨준 id값 가져오기
  const isEdit = postId ? true : false;

  let post = isEdit ? postList.find((p) => p.id === postId) : null;

  const [contents, setContents] = React.useState(post ? post.contents : ""); // 수정모드이면 내용을 불러오고 아니면 빈칸

  // 수정모드인데 post정보가 없을때 뒤로가기 렌더할때 체크해줌
  React.useEffect(() => {
    if (isEdit && !post) {
      console.log("포스트 정보가 없어요");
      window.alert("포스트 정보가 없어요");
      history.goBack();

      return;
    }

    // 수정모드이면 이미지불러오기
    if (isEdit) {
      dispatch(imageActions.setPreview(post.imageUrl));
    }
  }, []);

  const chageContents = (e) => {
    setContents(e.target.value);
  };

  const addPost = () => {
    dispatch(postActions.addPostFB(contents));
  };

  const editPost = () => {
    dispatch(postActions.editPostFB(postId, { contents: contents }));
  };

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
          {isEdit ? "게시글 수정" : "게시글 작성"}
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
            value={contents}
            _onChange={chageContents}
            multiLine
            label="게시글 내용"
            placeholder="게시글 작성"
          ></Input>
        </Grid>

        <Grid padding="16px">
          {isEdit ? (
            <Button _onClick={editPost} text="게시글 수정"></Button>
          ) : (
            <Button _onClick={addPost} text="게시글 작성"></Button>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default PostWrite;
