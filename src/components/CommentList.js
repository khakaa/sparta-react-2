import React from "react";
import { Grid, Image, Text } from "../elements";

const CommentList = (props) => {
  return (
    <>
      <Grid padding="16px">
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
      </Grid>
    </>
  );
};

export default CommentList;

const CommentItem = (props) => {
  const { userProfile, userName, userId, postId, insertDt, content } = props;

  return (
    <>
      <Grid isFlex>
        <Grid isFlex width="auto">
          <Image shape="circle" />
          <Text bold>{userName}</Text>
        </Grid>

        <Grid isFlex margin="0px 0px 0px 10px">
          <Text margin="0px">{content}</Text>
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
