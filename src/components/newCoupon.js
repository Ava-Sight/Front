import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FileDrop } from "react-file-drop";

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

const FormCont = styled.form`
  display: flex;
  background-color: white;
  flex-direction: column;
  border-radius: 30px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }
  /* overflow-x: hidden; */
  height: 80vh;
  border: 1px solid lightgray;
  align-self: center;
  align-items: center;
  width: 90%;
`;

const FormTitle = styled.div`
  margin-top: 15px;
  font-weight: bold;
  font-size: 20px;
  margin-left: 15px;
  margin-bottom: 15px;
`;

const FormSubtitle = styled.div`
  font-weight: bold;
  font-size: 15px;
`;

const FormSubtitleCont = styled.div`
  display: flex;
`;

const FormNote = styled.div`
  font-size: 10px;
  margin: 0;
`;

const FormTop = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;

  align-self: center;
`;

const FormTopCont = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const DropCont = styled.div``;
const DropArea = styled(FileDrop)`
  padding: 5px 10px 5px 10px;
  width: 100%;
  min-width: 125px;
  /* border: 1px dashed black; */
  border: ${(props) =>
    props.fileDropped ? "1px dashed #ff6604" : "1px dashed black"};
  border-radius: 10px;
  margin-top: 5px;
  font-size: 10px;
  color: gray;
  text-align: center;
`;

const FormMiddle = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
`;

const FormMiddleCont = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const FormInputCont = styled.div`
  display: flex;
  flex-direction: column;
  //comment
  margin-bottom: 10px;
`;

const FormInput = styled.input`
  width: 90%;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid gray;
`;

const FormTextArea = styled.textarea`
  display: flex;
  height: 70px;
  resize: none;
`;

const FormBottom = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
`;

const FormBottomCont = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  flex-wrap: wrap;
`;
const FormBottomContLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  min-width: 300px;
`;
const FormBottomSmallInputCont = styled.div`
  display: flex;
  width: 100%;
`;

const FormBottomContRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  min-width: 300px;
`;

const ButtonCont = styled.div`
  display: flex;
  width: 40%;
  align-self: center;
  justify-content: space-around;
`;

//send
const Button = styled.button`
  padding: 5px 0 5px 0px;
  border-radius: 10px;
  background-color: #ff6604;
  width: 150px;
  text-align: center;
  cursor: pointer;
  color: white;
  font-weight: bold;
  :nth-child(2) {
    background-color: white;
    border: 1px solid lightgray;
    color: #9395a6;
  }
`;

const NewCoupon = ({ reFetch }) => {
  //ref

  //states
  const [folder, setFolder] = useState(null);
  const [webImg, setWebImg] = useState(null);

  //form
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    console.log("form data:", data);
    await uploadCoupon(data);
    await reFetch();
    reset();
  };

  const clearForm = () => reset();
  // const onFileInputChange = async (event) => {
  //   const { files } = event.target;
  //   // await setFolder(files);
  //   console.log(" func drop files", files);
  //   //connect s3 bucket here
  //   // console.log("func folder state", folder);
  // };

  // const onTargetClick = () => {
  //   fileInputRef.current.click();
  // };

  const uploadCoupon = async (formDataState) => {
    console.log("button fire");
    let cleanedFormDataState = formDataState;
    cleanedFormDataState.url = cleanedFormDataState.url.replace("/", "");
    const formData = new FormData();
    // passing form data with new url without "/"

    const blob = new Blob([JSON.stringify(cleanedFormDataState)], {
      type: "application/json",
    });

    await formData.append("document", blob);
    console.log("upload folder ", folder);

    await Object.values(folder).forEach((file) => {
      console.log(file);
      formData.append("file", file);
    });
    await Object.values(webImg).forEach((file) => {
      console.log(file);
      formData.append("img", file);
    });
    console.log("formData", formData);

    Axios.post("https://avasight.herokuapp.com/coupon/uploadpass", formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((res) => {
        toast.success("Cupon creado exitosamente 🚀 ", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        clearForm();
      })
      .catch((err) =>
        toast.success("Creacion de cupon fallida", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      );
  };

  return (
    <MainContainer>
      {/* titulo */}
      <Title>Crear Cupon</Title>
      {/* Form Cont */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <FormCont onSubmit={handleSubmit(onSubmit)}>
        {/* form top */}
        {/* 3 sections column */}

        <FormTop>
          <FormTitle>Subir Imagenes</FormTitle>
          {/* dropboxes */}
          <FormTopCont>
            <DropCont>
              <FormSubtitle>Sitio Web</FormSubtitle>
              <DropArea
                fileDropped={webImg}
                onDrop={async (files, event) => {
                  await setWebImg(files);
                  console.log("img state", webImg);
                }}
              >
                {webImg ? [...webImg][0].name : "Arrastrar archivo"}
              </DropArea>
            </DropCont>
            <DropCont>
              <FormSubtitleCont>
                <FormSubtitle>Pase Apple</FormSubtitle>
                <FormNote>pkpass</FormNote>
              </FormSubtitleCont>
              <DropArea
                fileDropped={folder}
                onDrop={async (files, event) => {
                  await setFolder(files);
                  // const reader = new FileReader();
                  // reader.readAsText(files[0]);
                  // reader.onload = async (e) => {
                  //   console.log("read as text ::", e.target.result);
                  //   await setFolder(e.target.result);
                  // };

                  console.log("folder state", folder);
                }}
              >
                {folder ? [...folder][0].name : "Arrastrar archivo"}
              </DropArea>
            </DropCont>
            <DropCont>
              <FormSubtitle>Logo Apple</FormSubtitle>
              <DropArea
                onDrop={(files, event) => console.log("onDrop!", files, event)}
              >
                Arrastrar archivo
              </DropArea>
            </DropCont>
            <DropCont>
              <FormSubtitle>Hero Apple</FormSubtitle>
              <DropArea
                onDrop={(files, event) => console.log("onDrop!", files, event)}
              >
                Arrastrar archivo
              </DropArea>
            </DropCont>
          </FormTopCont>
        </FormTop>
        {/* form middle (4 inputs) */}
        <FormMiddle>
          <FormTitle>Detalles pagina alternativa a cupon</FormTitle>
          <FormMiddleCont>
            <FormInputCont>
              <FormSubtitle>Hipervínculo</FormSubtitle>
              <FormInput name="url" ref={register} placeholder="/link" />
            </FormInputCont>
            <FormInputCont>
              <FormSubtitle>Sucursales cercanas</FormSubtitle>
              <FormInput
                name="sucursales"
                ref={register}
                placeholder="sucursales"
              />
            </FormInputCont>
            <FormInputCont>
              <FormSubtitle>Empresa</FormSubtitle>
              <FormInput name="empresa" ref={register} placeholder="empresa" />
            </FormInputCont>
            <FormInputCont>
              <FormSubtitle>Promoción</FormSubtitle>
              <FormInput name="promo" ref={register} placeholder="promo" />
            </FormInputCont>
          </FormMiddleCont>
        </FormMiddle>
        {/* Form Bottom  (left/right) inputs */}
        <FormBottom>
          <FormTitle>Detalles Cupon Apple</FormTitle>
          <FormBottomCont>
            <FormBottomContLeft>
              <FormInputCont>
                <FormSubtitle>Titulo</FormSubtitle>
                <FormInput />
              </FormInputCont>
              {/* 3 rows small inputs  */}
              <FormBottomSmallInputCont>
                <FormInputCont>
                  <FormSubtitle>Duracion</FormSubtitle>
                  <FormInput />
                </FormInputCont>
                <FormInputCont>
                  <FormSubtitle>ID en QR</FormSubtitle>
                  <FormInput />
                </FormInputCont>
                <FormInputCont>
                  <FormSubtitle>Color</FormSubtitle>
                  <FormInput />
                </FormInputCont>
              </FormBottomSmallInputCont>
              <FormInputCont>
                <FormSubtitle>
                  Mensaje de actualizacion de expiracion
                </FormSubtitle>
                <FormInput />
              </FormInputCont>
              <FormInputCont>
                <FormSubtitle>Cordenadas</FormSubtitle>
                <FormInput />
              </FormInputCont>
            </FormBottomContLeft>
            {/* right (input, textarea,input) */}
            <FormBottomContRight>
              <FormInputCont>
                <FormSubtitle>Descripcón</FormSubtitle>
                <FormInput />
              </FormInputCont>
              {/* textarea */}
              <FormInputCont>
                <FormSubtitle>BackFields</FormSubtitle>
                <FormTextArea />
              </FormInputCont>
              <FormInputCont>
                <FormSubtitle>PassTypeIdentifier</FormSubtitle>
                <FormInput />
              </FormInputCont>
            </FormBottomContRight>
          </FormBottomCont>
        </FormBottom>
        <ButtonCont>
          <Button type="submit">Crear</Button>
          <Button onClick={clearForm}>Cancelar</Button>
        </ButtonCont>
      </FormCont>
      <ToastContainer />
    </MainContainer>
  );
};

export default NewCoupon;
