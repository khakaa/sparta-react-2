import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Post from "../components/Post";
import { actionCreators as postActions } from "../redux/modules/post";

const PostList = (props) => {
  const postList = useSelector((state) => state.post.list);
  const dispatch = useDispatch();

  console.log(postList);

  // 게시글이 0개 일때 파이어스토어에서 한번 불러오고, 1개 이상일 때는 불러오지않고,
  // 리덕스의 배열 앞에 추가해서 뷰에 뿌려준다
  React.useEffect(() => {
    if (postList.length === 0) {
      dispatch(postActions.getPostFB());
    }
  }, []);

  return (
    <React.Fragment>
      {/* <Post /> */}
      {postList.map((p, idx) => {
        return <Post key={idx} {...p} />;
      })}
    </React.Fragment>
  );
};

export default PostList;
