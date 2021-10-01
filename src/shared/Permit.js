import React from "react";
import { useSelector } from "react-redux";
import { apiKey } from "./firebase";

const Permit = (props) => {
  const isLogin = useSelector((state) => state.user.isLogin);

  const sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const isSession = sessionStorage.getItem(sessionKey) ? true : false;

  if (isLogin && isSession) {
    return <React.Fragment>{props.children}</React.Fragment>;
  } else {
    return null;
  }
};

export default Permit;
