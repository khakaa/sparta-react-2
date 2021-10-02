import React from "react";
import _ from "lodash";

const Search = () => {
  const [text, setText] = React.useState();
  const debounce = _.debounce((e) => {
    console.log(e.target.value);
  }, 1000);

  const throttle = _.throttle((e) => {
    console.log(e.target.value);
  }, 1000);

  const keyPress = React.useCallback(debounce, []); // 이 함수를 메모리제이션한다. 컴포넌트가 리렌더링이 되더라도 초기화하지 않는다.

  const onChange = (e) => {
    // console.log(e.target.value);
    setText(e.target.value);
    keyPress(e);
  };

  return (
    <div>
      <input type="text" onChange={onChange} />
    </div>
  );
};

export default Search;
