import React, { useEffect, useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import { isAndroid } from "react-device-detect";

//imgs
import AddToWallet from "../assets/appleWallet.png";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* background-color: #f7f8fc; */
  height: 100vh;
  width: 100%;
  align-content: center;
  align-items: center;
`;

const Title = styled.div`
  margin: 30px 0 30px 0;
  font-size: 26px;
  font-weight: bold;
`;

const SubTitle = styled.div`
  font-size: 20px;
  margin-top: 30px;
`;

const ImgCont = styled.div`
  width: 90%;
`;

const Img = styled.img`
  width: 100%;
`;

const SubText = styled.div`
  font-size: 20px;
  margin-top: 30px;
  margin-bottom: 30px;
  text-align: center;
`;

const MiniTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const SucursalesCont = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  align-self: flex-start;
  margin-left: 40px;
`;

const Sucursales = styled.div`
  font-size: 15px;
  margin-bottom: 15px;
`;

const AddWalletCont = styled.div`
  width: 50%;
  margin-bottom: 10px;
`;

const AddWalletImg = styled.img`
  width: 100%;
`;

const CouponView = (props) => {
  const [coupon, setCoupon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("useEffect fire");
    Axios.get(
      `http://ec2-54-86-4-187.compute-1.amazonaws.com:4000/coupon/url/${props.match.params.couponUrl}`
    )
      .then((res) => {
        console.log("coupon data", res.data);
        let modCouponObj = res.data;
        modCouponObj.sucursales.includes(",")
          ? (modCouponObj.sucursales = res.data.sucursales.split(","))
          : (modCouponObj.sucursales = [...res.data.sucursales]);

        setCoupon(modCouponObj);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error data", err.data);
        setCoupon("error");
        setLoading(false);
      });
  }, [props.match.params.couponUrl]);

  const downloadPass = async () => {
    window.open(coupon.pkpassUrl, "_blank");
  };

  return (
    <MainContainer>
      {loading ? (
        <h1>Loading</h1>
      ) : coupon !== "error" ? (
        <>
          <SubTitle>Conexion a internet exitosa</SubTitle>
          <Title>Tenemos un regalo para ti</Title>
          <ImgCont>
            <Img src={coupon.webImgUrl} />
          </ImgCont>
          <SubText>
            Toma captura de pantalla y muestrala en el mostrador para hacer
            valido el cupon
          </SubText>
          <>
            {isAndroid ? null : (
              <AddWalletCont>
                <AddWalletImg onClick={downloadPass} src={AddToWallet} />
              </AddWalletCont>
            )}
          </>
          <MiniTitle>Sucursales Cercanas</MiniTitle>
          <SucursalesCont>
            {coupon.sucursales.map((sucursal) => (
              <Sucursales>{sucursal}</Sucursales>
            ))}
          </SucursalesCont>
        </>
      ) : (
        <h1>Error</h1>
      )}
    </MainContainer>
  );
};

export default CouponView;
