import React, { useContext, useState } from "react";
import firebase from "../../Authentication/base";
import { AuthContext } from "../../Authentication/Auth";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

const InfoWrapper = styled.div`
  margin: 20px;
  background-color: #033265;
  border-radius: 20px;
  overflow: hidden;
`;

const InfoTitle = styled.p`
  font-size: 25px;
  font-family: Arial;
  margin: 10px;
  padding-top: 20px;
  font-weight: bold;
  color: white;
`;

const LabelTitle = styled.p`
  font-size: 18px;
  font-family: Arial;
  margin: 10px;
  margin-top: 12px;
  color: white;
`;

const ButtonStyledSpecial = styled.button`
  width: 90%;
  height: 60px;
  background-color: #00499A;
  color: white;
  font-size: 18px;
  outline: none;
  border: none;
  border-radius: 10px;
`;

const ButtonStyled = styled.button`
  padding: 20px;
  width: 100%;
  height: 60px;
  background-color: red;
  color: white;
  font-size: 18px;
  border: none;
  outline: none;
  border-radius: 10px;
  margin-top: 60px;
`;

const LabelInput = styled.input`
  width: 100%;
  boder: none;
  outline: none;
  overflow: hidden;
  background-color: #00499A;
  height: 48px;
  color: white;
  font-size: 16px;
  padding-left: 10px;
  border-top: 2px solid white;
  border-bottom: 2px solid white;
`;

const BtnSpacing = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`;

const Spacer = styled.div`
  margin: 20px;
`;

const Succes = styled.div`
  margin: 20px;
  display: flex;
  justify-content: space-between;
  background-color: green;
  padding: 20px;
  align-items: center
`;

const SuccesTitle = styled.p`
  font-size: 18px;
  font-family: arial;
  color: white;
`;

const SuccesBtn = styled.button`
  width: 40px;
  height: 40px;
  background-color: white;
`;

const Profile = () => {

  const [fullname, setName] = useState(undefined)
  const [voornaam, setVoornaam] = useState(undefined)
  const [achternaam, setAchternaam] = useState(undefined)
  const [nummer, setNummer] = useState(undefined)
  
  const [succes, setSucces] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const userRef = firebase.firestore().collection('Users').doc(currentUser.uid);
  userRef.get().then(function (doc) {
    if (doc.exists) {
      
      if (fullname === undefined) {
        setName(doc.data().volledige_naam)
      } 
      if (voornaam === undefined) {
        setVoornaam(doc.data().voornaam)
      } 
      if (achternaam === undefined) {
        setAchternaam(doc.data().achternaam)
      } 
      if (nummer === undefined) {
        setNummer(doc.data().number)
      }
    } else {
      <Redirect to={"/menuvolunteer"} />
    }
  })

  const onSubmit = () => {
    firebase.firestore().collection('Users').doc(currentUser.uid).update({
      voornaam: voornaam,
      achternaam: achternaam,
      volledige_naam: voornaam + ' ' + achternaam,
      number: nummer,
      numberCode: `facetime:` + nummer
    })
    setSucces(true);
  }

  const onClick = () => {
    setSucces(false);
  }

  return (
    <>
      {
        succes === true ? (
          <Succes>
            <SuccesTitle>Je info is succesvol geupdate!</SuccesTitle>
            <SuccesBtn onClick={onClick}>x</SuccesBtn>
          </Succes>
        ) : (
            <></>
        )
      }
      <InfoWrapper>
        <InfoTitle>Gegevens</InfoTitle>
        <label>
          <LabelTitle>Voornaam</LabelTitle>
          <LabelInput
            value={voornaam}
            onChange={e => {
              setVoornaam(e.target.value)
            }}
          />  
        </label>
        <label>
          <LabelTitle>Achternaam</LabelTitle>
          <LabelInput
            value={achternaam}
            onChange={e => {
              setAchternaam(e.target.value)
            }}
          />  
        </label>
        <label>
          <LabelTitle>Nummer</LabelTitle>
          <LabelInput
            value={nummer}
            onChange={e => {
              setNummer(e.target.value)
            }}
          />  
        </label>
        <br />
        <BtnSpacing>
          <ButtonStyledSpecial onClick={onSubmit}>Verander je info</ButtonStyledSpecial>
        </BtnSpacing>
      </InfoWrapper>
      <Spacer>
      <ButtonStyled onClick={() => firebase.auth().signOut()}>Log uit</ButtonStyled>

      </Spacer>
    </>
  )
}

export default Profile;