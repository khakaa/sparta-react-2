import React from "react";
import { useSelector } from "react-redux";

import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { realtime } from "../shared/firebase";

const NotiBadge = (props) => {
  const [isRead, setIsRead] = React.useState(true);
  const userId = useSelector((state) => state.user.user.uid);
  console.log(userId);
  const notiCheck = () => {
    const notiDB = realtime.ref(`noti/${userId}`); // realtime 데이터 참조가져옴
    notiDB.update({ read: true });
    props._onClick();
  };

  React.useEffect(() => {
    const notiDB = realtime.ref(`noti/${userId}`);

    // 알림 구독
    notiDB.on("value", (snapshot) => {
      console.log(snapshot.val()); // {read : false}

      setIsRead(snapshot.val().read);
    });

    return () => notiDB.off(); // 구독 해제
  }, []);
  return (
    <>
      <Badge
        invisible={isRead}
        color="secondary"
        onClick={notiCheck}
        variant="dot"
      >
        <NotificationsIcon />
      </Badge>
    </>
  );
};

NotiBadge.defaultProps = {
  _onClick: () => {},
};

export default NotiBadge;
