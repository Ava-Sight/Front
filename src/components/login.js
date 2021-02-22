import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Axios from "axios";

const MainCont = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  background-color: #f7f8fc;
`;

const FormCont = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  max-width: 400px;
  width: 100%;
  align-self: center;
  border-radius: 25px;
  padding: 20px;
  box-shadow: 0 5px 12px -5px black;
  background-color: #e0dede;
`;

const InputLabel = styled.h4`
  margin-top: 15px;
  font-weight: bold;
  font-size: 20px;
  margin-left: 15px;
  margin-bottom: 15px;
`;

const Input = styled.input`
  display: flex;
  width: 90%;
  height: 25px;
  border-radius: 5px;
  border: 2px solid lightgray;
  align-self: center;
`;

const Button = styled.div`
  display: flex;
  width: 70%;
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

const Title = styled.div`
  /* comment */
  margin-top: 20px;
  font-weight: bold;
  font-size: 30px;
  margin-left: 25px;
  /* comment */
  margin-bottom: 15px;
`;

const SubText = styled.div`
  font-size: 15px;
  color: gray;
  font-weight: 500;
  margin-bottom: 15px;
  text-align: center;
  /* margin-top: 30px; */
`;

const FooterText = styled.div`
  font-size: 15px;
  color: gray;
  font-weight: 500;
  margin-top: 100px;
  flex: 1;
  text-align: center;
`;
const ContactText = styled.div`
  font-size: 15px;
  color: #ff6601;
  text-decoration: underline;
  font-weight: bold;
  margin-bottom: 15px;
`;

const Login = () => {
  const { register, handleSubmit } = useForm();
  let history = useHistory();

  const onSubmit = (data) => {
    Axios.post("https://avasight.herokuapp.com/user/login", data)
      .then(async (res) => {
        await localStorage.setItem("jwt", res.data.token);
        history.push("admin");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // e.preventDefault();
      handleSubmit(onSubmit)(); // this won't be triggered
    }
  };

  return (
    <MainCont>
      <Title>Iniciar sesión</Title>
      <SubText>Ingresa a tu tablero para crear y distribuir cupones</SubText>
      <FormCont>
        <InputLabel>Usuario</InputLabel>
        <Input name="username" placeholder="hola@email.com" ref={register} />
        <InputLabel>Contraseña</InputLabel>
        <Input
          name="password"
          ref={register}
          type="password"
          placeholder="************"
          onKeyPress={handleKeyPress}
        />
        <Button onClick={handleSubmit(onSubmit)}>Aceder</Button>
        <SubText>Olvidaste tu contraseña?</SubText>
      </FormCont>
      {/* <FooterText>
        Te interesa incrementar tus ventas con AVA REWARDS?{" "}
        <ContactText>Contactanos</ContactText>
      </FooterText> */}
    </MainCont>
  );
};

export default Login;
