import React from "react";
import { history } from "../redux/configureStore";

import { Grid, Image, Text, Button } from "../elements";

const Post = React.memo((props) => {
  console.log("hi im component");
  return (
    <React.Fragment>
      <Grid>
        <Grid isFlex padding="16px">
          <Grid isFlex witdh="auto">
            <Image shape="circle" src={props.userInfo.userProfile}></Image>
            <Text bold>{props.userInfo.userName}</Text>
            <Text>{props.insertDt}</Text>
            {props.isMe && (
              <Button
                padding="4px"
                margin="4px"
                width="auto"
                text="수정"
                _onClick={() => {
                  history.push(`/write/${props.id}`);
                }}
              ></Button>
            )}
          </Grid>
        </Grid>

        <Grid padding="16px">
          <Text>{props.contents}</Text>
        </Grid>

        <Grid>
          <Image shape="rectangle" src={props.imageUrl}></Image>
        </Grid>

        <Grid padding="16px">
          <Text margin="0px" bold>
            댓글 {props.commentCnt}개
          </Text>
        </Grid>
      </Grid>
    </React.Fragment>
  );
});

//Props의 초깃값을 설정해서 props가 없어서 오류가 나는 것을 방지한다.
Post.defaultProps = {
  userInfo: {
    userName: "harin",
    userProfile: "/image-community/public/assets/sundog.jpeg",
  },
  imageUrl: "/image-community/public/assets/sundog.jpeg",
  contents: "멈멍이",
  commentCnt: 10,
  insertDt: "2021-09-30 16:00:00",
  isMe: false,
};

export default Post;
