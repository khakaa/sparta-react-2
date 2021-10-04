import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { actionCreators as postActions } from "../redux/modules/post";

import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";
import Post from "../components/Post";
import Permit from "../shared/Permit";

import { firestore } from "../shared/firebase";

const PostDetail = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.id;

  const userInfo = useSelector((state) => state.user.user);

  const postList = useSelector((store) => store.post.list);

  const postIdx = postList.findIndex((p) => p.id === id);
  const post = postList[postIdx];
  // console.log(post);

  // const [post, setPost] = React.useState(postData ? postData : null);
  React.useEffect(() => {
    if (post) {
      return;
    }

    dispatch(postActions.getOnePostFB(id));
  }, []);

  return (
    <>
      {post && <Post {...post} isMe={post.userInfo.userId === userInfo?.uid} />}
      <Permit>
        <CommentWrite postId={id} />
      </Permit>
      <CommentList postId={id} />
    </>
  );
};

export default PostDetail;
