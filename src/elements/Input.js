import React from "react";
import styled from "styled-components";

import { Text, Grid } from ".";

const Input = (props) => {
  const {
    label,
    placeholder,
    _onChange,
    type,
    multiLine,
    value,
    isSubmit,
    enterSubmit,
  } = props;

  if (multiLine) {
    return (
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        <ElTextArea
          value={value}
          rows={15}
          placeholder={placeholder}
          onChange={_onChange}
        />
      </Grid>
    );
  }
  return (
    <React.Fragment>
      <Grid>
        {" "}
        {/* Text와 ElInput을 묶어주는 역할*/}
        {label && <Text margin="0px">{label}</Text>}
        {isSubmit ? (
          <ElInput
            type={type}
            placeholder={placeholder}
            onChange={_onChange}
            value={value}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                enterSubmit(e);
              }
            }}
          ></ElInput>
        ) : (
          <ElInput
            type={type}
            placeholder={placeholder}
            onChange={_onChange}
          ></ElInput>
        )}
      </Grid>
    </React.Fragment>
  );
};

Input.defaultProps = {
  label: false,
  placeholder: "텍스트를 입력해주세요",
  type: "text",
  multiLine: false,
  value: "",
  isSubmit: false,
  enterSubmit: () => {},
  _onChange: () => {},
};

const ElInput = styled.input`
  border: 1px solid #212121;
  width: 100%;
  padding: 16px 4px;
  box-sizing: border-box;
`;

const ElTextArea = styled.textarea`
  border: 1px solid #212121;
  width: 100%;
  padding: 16px 4px;
  box-sizing: border-box;
`;

export default Input;
