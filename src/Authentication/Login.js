import React, { useCallback, useState } from "react";
import { withRouter } from "react-router";
import app from "./base.js";
import styled from "styled-components";

import Logo from "../assets/logonl.png";
import { Link } from "react-router-dom";

const LoginWrapper = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  display: none;
`;

const LabelStyles = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const LabelText = styled.p`
  font-family: Arial;
  font-size: 16px;
  margin-bottom: 8px;
`;

const LabelInput = styled.input`
  border: none;
  border: 1px solid black;
  height: 40px;
  border-radius: 0px;
  font-size: 18px;

  :focus { 
    outline: 3px solid blue;
  }
`;

const ImgStyled = styled.img`
  margin-top: 50px;
  margin-bottom: 50px;
`;

const ButtonStyled = styled.button`
  width: 100%;
  height: 60px;
  background-color: #00499A;
  color: white;
  font-size: 18px;
`;

const Reset = styled(Link)`
  align-self: flex-end;
  text-decoration: none;
  font-family: 18px;
  margin-top: 14px;
  font-family: arial;
`;

const Login = ({ history }) => {

  const [error, setError] = useState();
  
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        if (error.code === "auth/invalid-email") {
          alert('Email adres is niet juist.')
        }else if (error.code === "auth/invalid-password") {
          alert('Wachtwoord is niet juist.')
        } else {
          alert('Er is een probleem opgetreden.')
        }
      }
    },
    [history]
  );

  return (
    <LoginWrapper>
      <ImgStyled src={Logo}  alt="Licht en liefde logo" width="300" />
      <Title>Welkom op de Licht en Liefde app, <br /> meld je hieronder aan!</Title>
      <form onSubmit={handleLogin}>
        <p>{error}</p>
        <LabelStyles>
          <LabelText>E-mailadres</LabelText>
          <LabelInput name="email" type="email" onChange={() => setError()} placeholder="E-mailadres" />
        </LabelStyles>
        <br />
        <LabelStyles>
          <LabelText>Wachtwoord</LabelText>
          <LabelInput name="password" type="password" onChange={() => setError()} placeholder="Wachtwoord" />
        </LabelStyles>
        <br />
        <ButtonStyled type="submit">Inloggen</ButtonStyled>
        
      </form>
      <Reset to="/reset">Wachtwoord vergeten?</Reset>
    </LoginWrapper>
  )
}

export default withRouter(Login);