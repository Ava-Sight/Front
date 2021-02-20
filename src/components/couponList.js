import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Axios from "axios";

import ListItem from "./listItem";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f7f8fc;
  height: 100vh;
  width: 100%;
  align-content: center;
`;

const Title = styled.div`
  /* comment */
  margin-top: 20px;
  font-weight: bold;
  font-size: 30px;
  margin-left: 25px;
  /* comment */
  margin-bottom: 20px;
`;

const MainCont = styled.form`
  display: flex;
  background-color: white;
  flex-direction: column;
  border-radius: 30px;
  height: 80vh;
  border: 1px solid lightgray;
  align-self: center;
  /* align-items: center; */
  width: 90%;
`;

const ListTitle = styled.div`
  margin-top: 15px;
  font-weight: bold;
  font-size: 20px;
  margin-left: 15px;
  margin-bottom: 15px;
`;

const SubText = styled.div`
  font-size: 15px;
  color: gray;
  font-weight: 500;
  margin-left: 15px;
  width: 80%;
  margin-bottom: 15px;
`;

const ListCont = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 15px 0 15px;
`;

const ListPropertiesCont = styled.div`
  display: flex;
  border-bottom: 1px solid lightgray;
  width: 100%;
  padding-bottom: 10px;
  color: gray;
`;
const ListProperty1 = styled.div`
  width: 30%;
`;
const ListProperty2 = styled.div`
  width: 30%;
`;
const ListProperty3 = styled.div`
  width: 20%;
`;
const ListProperty4 = styled.div`
  width: 10%;
`;
const ListProperty5 = styled.div`
  width: 10%;
`;

const ItemCont = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
`;

const NewCoupon = () => {
  const [couponList, setCouponList] = useState([]);

  useEffect(() => {
    Axios.get("https://avasight.herokuapp.com/coupon").then((res) => {
      console.log(res.data);
      setCouponList(res.data);
    });
  }, []);

  return (
    <MainContainer>
      {/* titulo */}
      <Title>Cupones Activos</Title>
      {/* Form Cont */}
      <MainCont>
        <ListTitle>Administrar cupones activos</ListTitle>
        <SubText>
          Espacio para entender el comportamiento básico de los cupones activos
          y sus respectivos links para hacer pruebas
        </SubText>
        <ListCont>
          <ListPropertiesCont>
            <ListProperty1>Nombre de promocion</ListProperty1>
            <ListProperty2>Link</ListProperty2>
            <ListProperty3>Empresa</ListProperty3>
            <ListProperty4>Abierto</ListProperty4>
            <ListProperty5>Usado</ListProperty5>
          </ListPropertiesCont>
          <ItemCont>
            {couponList.map((coupon, i) => (
              // <ul>
              <ListItem coupon={coupon} />
              // </ul>
            ))}
          </ItemCont>
        </ListCont>
      </MainCont>
    </MainContainer>
  );
};

export default NewCoupon;
