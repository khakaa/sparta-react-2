import React from "react";

import { Grid, Input, Button } from "../elements";

const CommentWrite = (props) => {
  return (
    <>
      <Grid isFlex padding="16px">
        <Input placeholder="댓글 내용을 입력해주세요" />
        <Button width="50px" margin="0px 0px 0px 11px" text="작성"></Button>
      </Grid>
    </>
  );
};

export default CommentWrite;
