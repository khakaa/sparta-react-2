import React from "react";

import { Grid, Image, Text } from "../elements";
const Post = (props) => {
  return (
    <React.Fragment>
      <Grid>
        <Grid isFlex>
          <Image shape="circle" src={props.src}></Image>
          <Text bold>{props.userInfo.userName}</Text>
          <Text>{props.insertDt}</Text>
        </Grid>

        <Grid padding="16px">
          <Text>{props.content}</Text>
        </Grid>

        <Grid>
          <Image shape="rectangle" src={props.src}></Image>
        </Grid>

        <Grid padding="16px">
          <Text>{props.commentCnt}</Text>
        </Grid>

        {/* <div>user profile / user name / insert_dt /</div>
        <div>contents</div>
        <div>image</div>
        <div>comment cnt</div> */}
      </Grid>
    </React.Fragment>
  );
};

//Props의 초깃값을 설정해서 props가 없어서 오류가 나는 것을 방지한다.
Post.defaultProps = {
  userInfo: {
    userName: "harin",
    userProfile: "/image-community/public/assets/sundog.jpeg",
  },
  imageUrl: "/image-community/public/assets/sundog.jpeg",
  content: "멈멍이",
  commentCnt: 10,
  insertDt: "2021-09-30 16:00:00",
};

export default Post;
