import React from "react";
import styled from "styled-components";

const Image = (props) => {
  const { shape, src, size } = props;

  const styles = {
    // shape: shape,
    src: src,
    size: size,
  };

  if (shape === "circle") {
    return <ImageCircle {...styles}></ImageCircle>;
  }

  if (shape === "rectangle") {
    return (
      <AspectOutter>
        <AspectInner {...styles}></AspectInner>
      </AspectOutter>
    );
  }
  return <React.Fragment></React.Fragment>;
};

Image.defaultProps = {
  shape: "",
  src: "",
  size: 36,
};

const AspectOutter = styled.div`
  width: 100%;
  min-width: 250px;
`;

const AspectInner = styled.div`
  position: relative;
  padding-top: 75%; // 넓이에 4:3
  overflow: hidden;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  background-repeat: no-repeat;
`;

const ImageCircle = styled.div`
  --size: ${(props) => props.size}px; // css에서 --로 변수를 쓸 수 있다.
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-image: url("${(props) => props.src}");
  background-size: cover; // 원보다 사진크기가 작아도 원크기에 맞게 늘려서 맞춰버림
  margin: 4px;
`;

export default Image;
