import React, { useState } from "react";
import styled from "styled-components";

const ItemCont = styled.div`
  display: flex;
  border-bottom: 1px solid black;
  /* border-top: 1px solid black; */
  width: 100%;
  padding: 15px 0 15px 0;
  cursor: pointer;
  :hover {
    background-color: #f7f8fc;
  }
`;
const ListProperty1 = styled.div`
  width: 30%;
`;
const ListProperty2 = styled.div`
  width: 25%;
`;
const ListProperty3 = styled.div`
  width: 25%;
`;
const ListProperty4 = styled.div`
  width: 10%;
`;
const ListProperty5 = styled.div`
  width: 10%;
`;

const ListItem = ({ coupon }) => {
  const [modalActive, setModalActive] = useState(false);

  const modalFire = () => {
    console.log("fire");
  };

  return (
    <ItemCont onClick={modalFire}>
      <ListProperty1>{coupon.promo}</ListProperty1>
      <ListProperty2>{coupon.url}</ListProperty2>
      <ListProperty3>{coupon.empresa}</ListProperty3>
      <ListProperty4>n/a</ListProperty4>
      <ListProperty5>n/a</ListProperty5>
    </ItemCont>
  );
};

export default ListItem;
