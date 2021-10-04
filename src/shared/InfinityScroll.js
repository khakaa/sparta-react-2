import React from "react";

import Spinner from "../elements/Spinner";
import _ from "lodash";

const InfinityScroll = (props) => {
  const { children, callNext, isNext, loading } = props;

  // 쓰로틀을 적용합시다!
  const _handleScroll = _.throttle(() => {
    const { innerHeight } = window; // 가시적으로 보이는 브라우저 창 높이
    const { scrollHeight } = document.body; // 스크롤할 수 있는 높이

    // 스크롤 계산! 브라우저 호환성 (브라우저마다 scrolltop에 접근하는 것이 다름)
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;

    if (scrollHeight - innerHeight - scrollTop < 200) {
      // 로딩 중이면 다음 걸 부르면 안되겠죠!
      if (loading) {
        return;
      }
      callNext();
    }
  }, 300);

  const handleScroll = React.useCallback(_handleScroll, [loading]);

  React.useEffect(() => {
    // 로딩 중이면, return!
    if (loading) {
      return;
    }

    // 이벤트 구독 다음 게 있으면 스크롤 이벤트를 붙이고, 없으면 이벤트를 삭제
    if (isNext) {
      window.addEventListener("scroll", handleScroll);
    } else {
      window.removeEventListener("scroll", handleScroll);
    }

    // 구독 해제 이 부분은 컴포넌트가 사라질 때 호출되는 부분입니다! (클린업이라고도 해요.)
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isNext, loading]);

  return (
    <React.Fragment>
      {children}
      {isNext && <Spinner />}
    </React.Fragment>
  );
};

InfinityScroll.defaultProps = {
  children: null,
  callNext: () => {},
  isNext: false,
  loading: false,
};

export default InfinityScroll;
