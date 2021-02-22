import React, { useEffect } from "react";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Login from "./components/login";
import Admin from "./components/admin";
import CouponView from "./components/couponView";
import PrivateRoute from "./utils/privateRoute";
const MainContainer = styled.div`
  display: flex;
  width: 100%;
`;
const Page = styled.div`
  display: flex;
  width: 100%;
`;

function App() {
  useEffect(() => {}, []);

  return (
    <Router>
      <MainContainer>
        <Page>
          <Switch>
            {/* Dynamic routing */}
            <Route path="/login" component={Login} />
            <Route
              exact
              path="/"
              render={() => {
                window.location.href = "home.html";
              }}
            />

            <PrivateRoute strict path="/admin" component={Admin} />
            <Route exact path="/:couponUrl" component={CouponView} />
          </Switch>
        </Page>
      </MainContainer>
    </Router>
  );
}

export default App;
