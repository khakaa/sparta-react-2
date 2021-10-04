import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Image, Text } from "../elements";

import { actionCreators as commentActions } from "../redux/modules/comment";

const CommentList = (props) => {
  const dispatch = useDispatch();
  const commentList = useSelector((state) => state.comment.list);

  const { postId } = props;

  React.useEffect(() => {
    if (!commentList[postId]) {
      // 코멘트 정보가 없으면 불러오기
      dispatch(commentActions.getCommentFB(postId));
    }
  }, []);

  // console.log(commentList);
  // comment가 없거나 postId가 없으면 아무것도 안넘겨준다
  if (!commentList[postId] || !postId) {
    return null;
  }

  return (
    <>
      <Grid padding="16px">
        {commentList[postId].map((c) => {
          return <CommentItem key={c.id} {...c} />;
        })}
      </Grid>
    </>
  );
};

export default CommentList;

const CommentItem = (props) => {
  const { userProfile, userName, userId, postId, insertDt, contents } = props;

  return (
    <>
      <Grid isFlex>
        <Grid isFlex width="auto">
          <Image shape="circle" />
          <Text bold>{userName}</Text>
        </Grid>

        <Grid isFlex margin="0px 0px 0px 10px">
          <Text margin="0px">{contents}</Text>
          <Text margin="0px">{insertDt}</Text>
        </Grid>
      </Grid>
    </>
  );
};

CommentItem.defaultProps = {
  userProfile: "",
  userName: "harin",
  userId: "",
  postId: 1,
  insertDt: "2021-01-01 19:00:00",
  content: "몽몽이",
};
// 비슷한 기능을 가진 컴포넌트끼리 한 파일에 넣기도 한다. 컴포넌트 길이가 짧을 때 주로 그렇게 함
