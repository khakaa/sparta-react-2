// 1. import하기
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import User from "./modules/user";
import Post from "./modules/post";
import Image from "./modules/image";
import Comment from "./modules/comment";

// 하나만 더 해보기) 스토어에 히스토리 넣어주기 - 히스토리 만들기
export const history = createBrowserHistory();

// 2. rootReducer 만들기
const rootReducer = combineReducers({
  user: User,
  post: Post,
  image: Image,
  comment: Comment,
  router: connectRouter(history), // router와 연결되어서 store에 우리의 history가 저장된다.
});

// 3. 미들웨어 준비
// thunk.withExtraArgument : 다른 인수를 넘겨줄게..! 우리는 히스토리넘겨줌
const middlewares = [thunk.withExtraArgument({ history: history })];

// 지금이 어느 환경인 지 알려줘요. (개발환경, 프로덕션(배포)환경 ...)
const env = process.env.NODE_ENV;

// 개발환경에서는 로거라는 걸 하나만 더 써볼게요.
// require : 패키지를 가져온다. -> import를 안한 이유는 어차피 개발환경에서만 쓸거기 떼문에 if문 안에서만 쓰기 위해서
if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

// 4. redux devTools 사용 설정하기
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

// 5. 미들웨어 묶기
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// 6. 미들웨어하고 루트 리튜서 엮어서 스토어를 만든다.
let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
