import React, { useState } from "react";
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
  const [FireEffect, setFireEffect] = useState(false);
  const reloadCoupons = (couponId) => {
    setFireEffect(!FireEffect);
  };
  return (
    <MainContainer>
      <SideNav url={url} />
      <Page>
        <Switch>
          <Route
            path={`${path}/crear-cupon`}
            render={() => <NewCoupon reFetch={reloadCoupons} />}
          />
          <Route
            exact
            path={path}
            component={() => (
              <CouponList reFetch={reloadCoupons} fireEffect={FireEffect} />
            )}
          />
        </Switch>
      </Page>
    </MainContainer>
  );
};

export default Admin;
