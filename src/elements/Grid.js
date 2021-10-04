import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const { isFlex, width, padding, margin, bg, children, center, _onClick } =
    props;

  const styles = {
    isFlex: isFlex,
    width: width,
    padding: padding,
    margin: margin,
    bg: bg,
    center: center,
  };

  return (
    <React.Fragment>
      <GridBox {...styles} onClick={_onClick}>
        {children}
      </GridBox>
    </React.Fragment>
  );
};

Grid.defaultProps = {
  children: null,
  isFlex: false,
  width: "100%",
  padding: false,
  margin: false,
  bg: false,
  center: false,
  _onClick: () => {},
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box;
  ${(props) => (props.padding ? `padding:${props.padding};` : "")}
  ${(props) => (props.margin ? `margin:${props.margin};` : "")}
  ${(props) => (props.bg ? `background:${props.bg};` : "")}
  ${(props) =>
    props.isFlex
      ? `display:flex; align-items:center; justify-content:space-between;`
      : ""}
  ${(props) => (props.center ? `text-align : center` : "")}
`;
export default Grid;
