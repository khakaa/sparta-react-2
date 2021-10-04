import React from "react";

import { Grid, Input, Button } from "../elements";

import { actionCreators as commentActions } from "../redux/modules/comment";
import { useSelector, useDispatch } from "react-redux";
const CommentWrite = (props) => {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = React.useState("");

  const { postId } = props;
  const commentChange = (e) => {
    setCommentText(e.target.value);
  };

  const write = () => {
    dispatch(commentActions.addCommentFB(postId, commentText));
    setCommentText("");
  };

  return (
    <>
      <Grid isFlex padding="16px">
        <Input
          placeholder="댓글 내용을 입력해주세요"
          _onChange={commentChange}
          value={commentText}
          isSubmit
          enterSubmit={write}
        />
        <Button
          width="50px"
          margin="0px 0px 0px 11px"
          text="작성"
          _onClick={write}
        ></Button>
      </Grid>
    </>
  );
};

export default CommentWrite;
