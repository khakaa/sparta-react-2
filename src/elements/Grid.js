import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const { isFlex, width, padding, margin, bg, children } = props;

  const styles = {
    isFlex: isFlex,
    width: width,
    padding: padding,
    margin: margin,
    bg: bg,
  };

  return (
    <React.Fragment>
      <GridBox {...styles}>{children}</GridBox>
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
`;
export default Grid;
