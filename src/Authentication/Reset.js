import React, { useState } from "react";
import styled from "styled-components";
import app from "./base.js";

import cross from "../assets/cross.svg"
import { Link } from "react-router-dom";

const LoginWrapper = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  padding-top:66px;
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



const ButtonStyled = styled.button`
  width: 100%;
  height: 60px;
  background-color: #00499A;
  color: white;
  font-size: 18px;
`;

const Cross = styled(Link)`
  align-self: flex-end;
`;

const TitleIntr = styled.p`
  font-size: 20px;
  font-family: arial;
  margin-top: 40px;
  margin-bottom: 30px;
  line-height: 1.2
`;



const Reset = () => {

  const [email, setEmail] = useState();

  const handleReset = (e) => {
    e.preventDefault();
    app.auth().useDeviceLanguage();
    app.auth().sendPasswordResetEmail(email).then(function () {
      alert('mail gestuurd')
      setEmail();
    }).catch(function (error) {
      alert(error)
    })
  }

  return (
    <LoginWrapper>
      <Cross to="/login">
        <img src={cross} alt="sluit" />
      </Cross>
      <Title>Wachtwoord vergeten</Title>
      <TitleIntr>Weet je het wachtwoord niet meer? Vul hieronder je e-mailadres in. We sturen je een mail waarmee je een nieuw wachtwoord kan aanmaken.</TitleIntr>
      <form onSubmit={handleReset}>
        <LabelStyles>
          <LabelText>E-mailadres</LabelText>
          <LabelInput
            value={email}
            onChange={e => {
              setEmail(e.target.value)
            }}
            name="email"
            type="email"
            placeholder="E-mailadres"
          />
        </LabelStyles>
        
        <br />
        <ButtonStyled type="submit">Versturen</ButtonStyled>
      </form>
    </LoginWrapper>
  )
}

export default Reset;