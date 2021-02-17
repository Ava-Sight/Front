import React, { useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/login";
import Admin from "./components/admin";
import CouponView from "./components/couponView";

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
            <Route exact path="/" component={Login} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/:couponUrl" component={CouponView} />
          </Switch>
        </Page>
      </MainContainer>
    </Router>
  );
}

export default App;
