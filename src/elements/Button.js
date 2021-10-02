import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const { text, _onClick, isFloat, childern, margin, width } = props;

  if (isFloat) {
    return (
      <FloatButton onClick={_onClick}>{text ? text : childern}</FloatButton>
    );
  }

  const styles = { margin: margin, width: width };

  return (
    <ElButton {...styles} onClick={_onClick}>
      {text ? text : childern}
    </ElButton>
  );
};

Button.defaultProps = {
  text: false,
  childern: null,
  _onClick: () => {},
  isFloat: false,
  margin: false,
  width: "100%",
};

const ElButton = styled.button`
  width: ${(props) => props.width};
  color: #ffffff;
  background-color: #212121;
  padding: 18px 0px;
  box-sizing: border-box;
  border: none;
  ${(props) => (props.margin ? `margin : ${props.margin};` : "")};
`;

const FloatButton = styled.button`
  width: 52px;
  height: 52px;
  background-color: #ffd600;
  color: black;
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  position: fixed;
  bottom: 72px;
  right: 9px;
  border: none;
  border-radius: 26px;
  text-align: center;
  vertical-align: middle;
  /* display: flex; */
  /* align-items: center; */
`;

export default Button;
