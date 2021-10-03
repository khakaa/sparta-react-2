import React from "react";

import { Grid } from "../elements";
import Card from "../components/Card";

const Notification = (props) => {
  let noti = [
    {
      userName: "aaaa",
      postId: "post1",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/image-community-8cfaa.appspot.com/o/images%2FdnFgrPpplXNoBgjBwTJ36eFo6Wr2_1633183796005?alt=media&token=3f92eefa-29c7-463c-b4c7-ed532191c7c7",
    },
    {
      userName: "aaaa",
      postId: "post2",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/image-community-8cfaa.appspot.com/o/images%2FdnFgrPpplXNoBgjBwTJ36eFo6Wr2_1633183796005?alt=media&token=3f92eefa-29c7-463c-b4c7-ed532191c7c7",
    },
    {
      userName: "aaaa",
      postId: "post3",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/image-community-8cfaa.appspot.com/o/images%2FdnFgrPpplXNoBgjBwTJ36eFo6Wr2_1633183796005?alt=media&token=3f92eefa-29c7-463c-b4c7-ed532191c7c7",
    },
    {
      userName: "aaaa",
      postId: "post4",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/image-community-8cfaa.appspot.com/o/images%2FdnFgrPpplXNoBgjBwTJ36eFo6Wr2_1633183796005?alt=media&token=3f92eefa-29c7-463c-b4c7-ed532191c7c7",
    },
    {
      userName: "aaaa",
      postId: "post5",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/image-community-8cfaa.appspot.com/o/images%2FdnFgrPpplXNoBgjBwTJ36eFo6Wr2_1633183796005?alt=media&token=3f92eefa-29c7-463c-b4c7-ed532191c7c7",
    },
    {
      userName: "aaaa",
      postId: "post6",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/image-community-8cfaa.appspot.com/o/images%2FdnFgrPpplXNoBgjBwTJ36eFo6Wr2_1633183796005?alt=media&token=3f92eefa-29c7-463c-b4c7-ed532191c7c7",
    },
  ];

  return (
    <>
      <Grid padding="16px" bg="#EFF6FF">
        {noti.map((n) => {
          return <Card key={n.postId} {...n}></Card>;
        })}
      </Grid>
    </>
  );
};

export default Notification;
