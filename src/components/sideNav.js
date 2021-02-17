import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import Logo from "../assets/logo.png";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  background-color: #171b34;
  height: 100vh;
  align-items: center;
`;

const LinkCont = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  width: 100%;
  padding-bottom: 30px;
  border-bottom: 1px solid gray;
`;

const StyledNavLink = styled(NavLink).attrs((props) => ({
  activeClassName: "active",
}))`
  padding: 20px 0 20px 0;

  width: 100%;
  text-align: center;
  text-decoration: none;
  color: white;
  &.${"active"} {
    background-color: #29222f;
    border-left: 4px solid #ff6604;
    width: calc(100% - 4px);
  }
`;

const Button = styled.div`
  padding: 20px 0 20px 0;
  width: 100%;
  text-align: center;
  text-decoration: none;
  color: white;
  cursor: pointer;
  :hover {
    background-color: #29222f;
    border-left: 4px solid #ff6604;
    width: calc(100% - 4px);
  }
`;

const LogoCont = styled.div`
  width: 60%;
  margin-top: 40px;
`;

const LogoImg = styled.img`
  width: 100%;
`;

const SideNav = () => {
  return (
    <MainContainer>
      {/* logo */}
      <LogoCont>
        <LogoImg src={Logo} />
      </LogoCont>
      <LinkCont>
        <StyledNavLink to="/admin/crear-cupon">crear cupon</StyledNavLink>
        <StyledNavLink to="/admin/cupones">cupones activos</StyledNavLink>
      </LinkCont>
      <Button>Cerrar Seción</Button>
    </MainContainer>
  );
};

export default SideNav;
