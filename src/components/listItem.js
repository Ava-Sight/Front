import React, { useState } from "react";
import styled from "styled-components";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

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

const ModalCouponCont = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
`;

const ModalTextCont = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const ModalSubtitle = styled.div`
  font-weight: bold;
  font-size: 15px;
  width: 50%;
`;
const ModalText = styled.div`
  width: 40%;
`;

const Button = styled.div`
  display: flex;
  width: 40%;
  height: 30px;
  background-color: #ff6601;
  color: white;
  align-self: center;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 30px;
`;

const ButtonCont = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

const ListItem = ({ coupon }) => {
  const [modalActive, setModalActive] = useState(false);

  const modalFire = () => {
    setModalActive(!modalActive);
  };

  return (
    <>
      <ItemCont onClick={modalFire}>
        <ListProperty1>{coupon.promo}</ListProperty1>
        <ListProperty2>{coupon.url}</ListProperty2>
        <ListProperty3>{coupon.empresa}</ListProperty3>
        <ListProperty4>n/a</ListProperty4>
        <ListProperty5>n/a</ListProperty5>
      </ItemCont>
      <Modal open={modalActive} onClose={modalFire}>
        <h2>{coupon.promo}</h2>
        <ModalCouponCont>
          <ModalTextCont>
            <ModalSubtitle>Nombre de promocion: </ModalSubtitle>
            <ModalText>{coupon.promo}</ModalText>
          </ModalTextCont>
          <ModalTextCont>
            <ModalSubtitle>URL: </ModalSubtitle>
            <ModalText>{coupon.url}</ModalText>
          </ModalTextCont>
          <ModalTextCont>
            <ModalSubtitle>Empresa:</ModalSubtitle>
            <ModalText>{coupon.empresa}</ModalText>
          </ModalTextCont>
        </ModalCouponCont>
        <ButtonCont>
          <Button>Editar</Button>
          <Button>Eliminar</Button>
        </ButtonCont>
      </Modal>
    </>
  );
};

export default ListItem;
