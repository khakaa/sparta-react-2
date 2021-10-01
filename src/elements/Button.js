import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const { text, _onClick, isFloat } = props;

  if (isFloat) {
    return <FloatButton onClick={_onClick}>{text}</FloatButton>;
  }
  return <ElButton onClick={_onClick}>{text}</ElButton>;
};

Button.defaultProps = {
  text: "텍스트",
  _onClick: () => {},
  isFloat: false,
};

const ElButton = styled.button`
  width: 100%;
  color: #ffffff;
  background-color: #212121;
  padding: 18px 0px;
  box-sizing: border-box;
  border: none;
  /* position: ${(props) => (props.isFloat ? "fixed" : "")};
  left: ${(props) => (props.isFloat ? "314px" : "")};
  top: ${(props) => (props.isFloat ? "806px" : "")}; */
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
