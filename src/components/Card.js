import React from "react";
import { history } from "../redux/configureStore";

import { Grid, Image, Text } from "../elements";

const Card = (props) => {
  const { imageUrl, userName, postId } = props;

  return (
    <>
      <Grid
        padding="16px"
        isFlex
        bg="#ffffff"
        margin="8px 0px"
        _onClick={() => {
          history.push(`/post/${postId}`);
        }}
      >
        <Grid
          width="auto"
          margin="0px 8px 0px 0px
              "
        >
          <Image size="60" src={imageUrl} shape="square" />
        </Grid>

        <Grid>
          <Text>
            <b>{userName}님이 댓글을 남겼습니다.</b>
          </Text>
        </Grid>
      </Grid>
    </>
  );
};

Card.defaultProps = {
  imageUrl: "",
  userName: "",
  postId: null,
};

export default Card;
