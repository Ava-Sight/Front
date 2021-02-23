import React, { useEffect, useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import { isAndroid } from "react-device-detect";
import fileDownload from "js-file-download";
//imgs
import AddToWallet from "../assets/appleWallet.svg";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f7f8fc;
  height: 100vh;

  /* flex-basis: 100%; */
  width: 100%;
  align-content: center;
  align-items: center;
  /* margin-top: 20px; */
`;

const Title = styled.div`
  margin: 25px 0 15px 0;
  font-size: 26px;
  font-weight: bold;
  text-align: center;
`;

const SubTitle = styled.div`
  font-size: 17px;
  margin-top: 15px;
`;

const ImgCont = styled.div`
  width: 90%;
`;

const Img = styled.img`
  width: 100%;
`;

const SubText = styled.div`
  font-size: 17px;
  margin-top: 15px;
  margin-bottom: 25px;
  text-align: center;
  width: 90%;
`;

const MiniTitle = styled.div`
  font-size: 17px;
  font-weight: 600;
`;

const SucursalesCont = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  align-self: flex-start;
  padding: 0 0 0 0;
  margin-left: 40px;
  /* flex-wrap: wrap; */
  width: calc(100%);
  justify-content: space-around;
  ::after {
    height: 0;
    width: 45%;
    content: "";
  }
`;
const Bullet = styled.li`
  display: list-item;
  font-size: 15px;
  margin-bottom: 15px;
  width: 100%;
`;
const Sucursales = styled.div`
  display: flex;
`;

const SucursalLink = styled.div`
  color: #ff6601;
  text-decoration: underline;
  margin-left: 5px;
`;

const SucursalesMap = styled.div`
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

const Footer = styled.div`
  display: flex;
  font-size: 12px;
  margin-bottom: 10px;
`;
const ATag = styled.a`
  margin-left: 5px;
  /* margin-top: auto; */
`;

const CouponView = (props) => {
  const [coupon, setCoupon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("useEffect fire");
    Axios.get(
      `https://avasight.herokuapp.com/coupon/url/${props.match.params.couponUrl}`
    )
      .then(async (res) => {
        console.log("coupon data", res.data);
        const couponObj = {
          url: res.data.url,
          sucursales: res.data.sucursales.includes(",")
            ? res.data.sucursales.replace(/\[.*?[^)]\]/g, "").split(",")
            : [...res.data.sucursales.replace(/\[.*?[^)]\]/g, "")],
          mapUrls: res.data.sucursales
            .match(/\[.*?[^)]\]/g, "")
            .map((match) => match.replace(/[\][]/g, "")),
          empresa: res.data.empresa,
          promo: res.data.promo,
          webImgUrl: res.data.webImgUrl,
          pkpassUrl: res.data.pkpassUrl,
        };
        console.log("couponObj 1:", couponObj);

        // console.log(couponObj);
        setCoupon(couponObj);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error data", err.response);
        setCoupon("error");
        setLoading(false);
      });
  }, [props.match.params.couponUrl]);

  const downloadPass = () => {
    window.open(coupon.pkpassUrl, "_blank");
  };
  const openMapLink = (linkId) => {
    window.open(coupon.mapUrls[linkId], "_blank");
  };

  return (
    <MainContainer>
      {loading ? (
        <h1>Loading</h1>
      ) : coupon !== "error" ? (
        <>
          <SubTitle>¡Conexión a internet exitosa!</SubTitle>
          <Title>Disfruta de esta promoción exclusiva</Title>
          <ImgCont>
            <Img src={coupon.webImgUrl} />
          </ImgCont>
          <MiniTitle>Para hacer valida tu promoción:</MiniTitle>
          <SubText>
            Toma captura de pantalla y enséñala en el mostrador.
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
            {coupon.sucursales.map((sucursal, i) => (
              <Bullet key={i}>
                <Sucursales>
                  {`${sucursal} - `}
                  <SucursalLink onClick={() => openMapLink(i)}>
                    Abrir Mapa
                  </SucursalLink>
                </Sucursales>
              </Bullet>
            ))}
          </SucursalesCont>
          <Footer>
            Desarrollado por
            <ATag href="https://ava-rewards.com/"> AVA REWARDS</ATag>
          </Footer>
        </>
      ) : (
        <h1>Error</h1>
      )}
    </MainContainer>
  );
};

export default CouponView;
