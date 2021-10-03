import React from "react";
import { Grid, Text, Button } from "../elements";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import { history } from "../redux/configureStore";
import { apiKey } from "../shared/firebase";

const Header = (props) => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);

  const sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const isSession = sessionStorage.getItem(sessionKey) ? true : false;

  // console.log(sessionKey);
  // console.log(isSession);

  if (isLogin && isSession) {
    return (
      <Grid isFlex padding="8px 16px">
        <Grid>
          <Text margin="0px" size="24px">
            ㅎㅇ
          </Text>
        </Grid>

        <Grid isFlex>
          <Button text="내 정보" />
          <Button
            _onClick={() => {
              history.push("/noti");
            }}
            text="알림"
          />
          <Button
            text="로그아웃"
            _onClick={() => {
              dispatch(userActions.logoutFB({}));
            }}
          />
        </Grid>
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid isFlex padding="8px 16px">
        <Grid>
          <Text margin="0px" size="24px">
            ㅎㅇ
          </Text>
        </Grid>

        <Grid isFlex>
          <Button
            text="로그인"
            _onClick={() => {
              history.push("/login");
            }}
          />
          <Button
            text="회원가입"
            _onClick={() => {
              history.push("/signup");
            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Header.defaultProps = {};

export default Header;
