import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Landing from "./routes/Landing";
import Reg from "./routes/Reg";
import Log from "./routes/Log";
import Dashboard from "./routes/Dashboard";
import Create from "./routes/Create";
import View from "./routes/View";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";
import LinkCrPage from "./routes/LinkCrPage";
import Traffic from "./routes/Traffic";

toast.configure();

function App() {
  const [auth, setAuth] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  function Auth(boolean) {
    setAuth(boolean);
  }

  function checkAuth() {
    axios({
      method: "GET",
      withCredentials: true,
      url: "/user",
    }).then((res) => {
      setUserInfo(res.data);
      res.data ? Auth(true) : Auth(false);
    });
  }

  useEffect(() => {
    checkAuth(); //eslint-disable-next-line
  },[auth]);

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Landing />} />
        <Route
          exact
          path="/Registration"
          render={(props) =>
            !auth ? (
              <Reg {...props} Auth={Auth} />
            ) : (
              <Redirect to="/Dashboard" />
            )
          }
        />
        <Route
          exact
          path="/SignIn"
          render={(props) =>
            !auth ? (
              <Log {...props} Auth={Auth} />
            ) : (
              <Redirect to="/Dashboard" />
            )
          }
        />
        <Route
          exact
          path="/Dashboard"
          render={(props) =>
            auth ? (
              <Dashboard {...props} user={userInfo} auth={Auth} />
            ) : (
              <Redirect to="/SignIn" />
            )
          }
        />
        <Route
          exact
          path="/create-links"
          render={(props) =>
            auth ? (
              <Create {...props} user={userInfo} />
            ) : (
              <Redirect to="/SignIn" />
            )
          }
        />
        <Route
          exact
          path="/view-links"
          render={(props) =>
            auth ? (
              <View {...props} user={userInfo} />
            ) : (
              <Redirect to="/SignIn" />
            )
          }
        />
        <Route
          exact
          path="/api/:id/trafficInfo"
          render={(props) => (auth ? <Traffic /> : <Redirect to="/SignIn" />)}
        />
        <Route
          exact
          path="/:username/:linkName"
          render={() => <LinkCrPage />}
        />
      </Switch>
    </Router>
  );
}

export default App;
