import React from "react";
import styled from "styled-components";

import { Text, Grid } from ".";

const Input = (props) => {
  const { label, placeholder, _onChange, type } = props;
  return (
    <React.Fragment>
      <Grid>
        {" "}
        {/* Text와 ElInput을 묶어주는 역할*/}
        <Text margin="0px">{label}</Text>
        <ElInput
          type={type}
          placeholder={placeholder}
          onChange={_onChange}
        ></ElInput>
      </Grid>
    </React.Fragment>
  );
};

Input.defaultProps = {
  label: "텍스트",
  placeholder: "텍스트를 입력해주세요",
  _onChange: () => {},
  type: "text",
};

const ElInput = styled.input`
  border: 1px solid #212121;
  width: 100%;
  padding: 16px 4px;
  box-sizing: border-box;
`;

export default Input;
