import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";

//components
import SideNav from "./sideNav";
import NewCoupon from "./newCoupon";
import CouponList from "./couponList";

//styles

const MainContainer = styled.div`
  display: flex;
  width: 100%;
`;

const Page = styled.div`
  display: flex;
  width: 100%;
`;

const Admin = () => {
  return (
    <Router>
      <MainContainer>
        <SideNav />
        <Page>
          <Switch>
            <Route exact path="/admin/crear-cupon" component={NewCoupon} />
            <Route exact path="/admin/cupones" component={CouponList} />
          </Switch>
        </Page>
      </MainContainer>
    </Router>
  );
};

export default Admin;
