import "./App.css";
import React from "react";

import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";

import { apiKey } from "./firebase";

import { Grid, Button } from "../elements";
import Header from "../components/Header";

import PostList from "../pages/PostList";
import PostDetail from "../pages/PostDetail";
import Login from "../pages/Login";
import Signup from "../pages/Singnup";
import PostWrite from "../pages/PostWrite";
import Search from "./Search";

import Permit from "./Permit";

import { actionCreators as userActions } from "../redux/modules/user";

function App() {
  const dispatch = useDispatch();

  const sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const isSession = sessionStorage.getItem(sessionKey) ? true : false;

  // didMount
  React.useEffect(() => {
    if (isSession) {
      dispatch(userActions.loginCheckFB());
    }
  });

  return (
    <React.Fragment>
      <Grid>
        <Header />
        <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/write" exact component={PostWrite} />
          <Route path="/post/:id" exact component={PostDetail} />
          <Route path="/search" exact component={Search} />
        </ConnectedRouter>
      </Grid>

      <Permit>
        <Button
          isFloat
          text="+"
          _onClick={() => history.push("/write")}
        ></Button>
      </Permit>
    </React.Fragment>
  );
}

export default App;
