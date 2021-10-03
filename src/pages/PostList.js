import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Post from "../components/Post";
import { actionCreators as postActions } from "../redux/modules/post";

const PostList = (props) => {
  const postList = useSelector((state) => state.post.list);
  const userInfo = useSelector((state) => state.user.user);

  // console.log(userInfo);
  const dispatch = useDispatch();

  // 게시글이 0개 일때 파이어스토어에서 한번 불러오고, 1개 이상일 때는 불러오지않고,
  // 리덕스의 배열 앞에 추가해서 뷰에 뿌려준다
  React.useEffect(() => {
    if (postList.length === 0) {
      dispatch(postActions.getPostFB());
    }
  }, []);

  console.log(postList);

  return (
    <React.Fragment>
      {/* <Post /> */}
      {postList.map((p, idx) => {
        // 옵셔널 체이닝 . userInfo 값이 있으면 userInfo.uid를 불러와라 (객체 안에 든 속성이 있나 없나 확인)
        if (p.userInfo.userId === userInfo?.uid) {
          return <Post key={idx} {...p} isMe />;
        } else return <Post key={idx} {...p} />;
      })}
    </React.Fragment>
  );
};

export default PostList;
