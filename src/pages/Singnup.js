import React from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import { Grid, Text, Input, Button } from "../elements";

const Signup = (props) => {
  const dispatch = useDispatch();

  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [pwdCheck, setPwdCheck] = React.useState("");
  const [userName, setUserName] = React.useState("");

  const signUp = () => {
    if (pwd !== pwdCheck) {
      return;
    }

    if (id === "" || pwd === "" || userName === "") {
      return;
    }
    dispatch(userActions.signupFB(id, pwd, userName));
  };

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="32px" bold>
          회원가입
        </Text>

        <Grid padding="16px 0px">
          <Input
            label="아이디"
            placeholder="아이디를 입력하세요"
            _onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="닉네임"
            placeholder="닉네임를 입력하세요"
            _onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="패스워드"
            placeholder="비밀번호를 입력하세요"
            type="password"
            _onChange={(e) => {
              setPwd(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="패스워드 확인"
            placeholder="비밀번호를 다시 입력하세요"
            type="password"
            _onChange={(e) => {
              setPwdCheck(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Button text="회원가입하기" _onClick={signUp}></Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Signup;
