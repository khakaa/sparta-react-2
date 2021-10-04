import React from "react";

import { realtime } from "../shared/firebase";
import { useSelector } from "react-redux";

import { Grid } from "../elements";
import Card from "../components/Card";

const Notification = (props) => {
  const [noti, setNoti] = React.useState([]);
  const user = useSelector((state) => state.user.user);

  React.useEffect(() => {
    if (!user) {
      return;
    }

    const notiDB = realtime.ref(`noti/${user.uid}/list`);

    // firebase realtime database는 내림차순 정렬을 지원하지 않아요!
    // 데이터를 가져온 후 직접 역순으로 내보내야 합니다!
    const _noti = notiDB.orderByChild("insertDt");

    // noti 데이터를 처음한번만 가져오고 구독은 하지 않음
    _noti.once("value", (snapshot) => {
      if (snapshot.exists()) {
        let _data = snapshot.val();

        // reserse()는 배열을 역순으로 뒤집어줘요.
        let notiList = Object.keys(_data)
          .reverse()
          .map((s) => {
            return _data[s];
          });

        console.log(notiList);
        setNoti(notiList);
      }
    });
  }, [user]);

  return (
    <>
      <Grid padding="16px" bg="#EFF6FF">
        {noti.map((n, idx) => {
          return <Card key={`noti_${idx}`} {...n}></Card>;
        })}
      </Grid>
    </>
  );
};

export default Notification;
