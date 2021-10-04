import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Post from "../components/Post";
import { actionCreators as postActions } from "../redux/modules/post";
import InfinityScroll from "../shared/InfinityScroll";
import { Grid } from "../elements";

const PostList = (props) => {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.post.list);
  const userInfo = useSelector((state) => state.user.user);
  const isLoading = useSelector((state) => state.post.isLoading);
  const paging = useSelector((state) => state.post.paging);

  const { history } = props;
  // 게시글이 0개 일때 파이어스토어에서 한번 불러오고, 1개 이상일 때는 불러오지않고,
  // 리덕스의 배열 앞에 추가해서 뷰에 뿌려준다
  React.useEffect(() => {
    // 가지고 있는 데이터가 0 or 1개 일때 데이터를 불러온다.
    if (postList.length < 2) {
      dispatch(postActions.getPostFB());
    }
  }, []);

  console.log(postList);

  return (
    <React.Fragment>
      <Grid bg={"#EFF6FF"} padding="20px 0px">
        <InfinityScroll
          callNext={() => {
            console.log("next!");
            dispatch(postActions.getPostFB(paging.next));
          }}
          isNext={paging.next ? true : false}
          loading={isLoading}
        >
          {postList.map((p, idx) => {
            // 옵셔널 체이닝 . userInfo 값이 있으면 userInfo.uid를 불러와라 (객체 안에 든 속성이 있나 없나 확인)
            if (p.userInfo.userId === userInfo?.uid) {
              return (
                <Grid
                  bg="#ffffff"
                  margin="8px 0px"
                  key={p.id}
                  _onClick={() => {
                    // console.log(p);
                    history.push(`/post/${p.id}`);
                  }}
                >
                  <Post {...p} isMe />
                </Grid>
              );
            } else
              return (
                <Grid
                  key={p.id}
                  bg="#ffffff"
                  _onClick={() => {
                    history.push(`/post/${p.id}`);
                  }}
                >
                  <Post {...p} />
                </Grid>
              );
          })}
        </InfinityScroll>
      </Grid>
    </React.Fragment>
  );
};

export default PostList;
