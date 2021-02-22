import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
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
  let { url, path } = useRouteMatch();
  console.log(url, path);
  return (
    <MainContainer>
      <SideNav url={url} />
      <Page>
        <Switch>
          <Route path={`${path}/crear-cupon`} component={NewCoupon} />
          <Route exact path={path} component={CouponList} />
        </Switch>
      </Page>
    </MainContainer>
  );
};

export default Admin;
