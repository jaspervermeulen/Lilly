import React, { useContext, useState } from "react"
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../../Authentication/Auth";
import firebase from "../../Authentication/base";
import styled from "styled-components";

const TopBarLink = styled(Link)`
  text-decoration: none;
  font-size: 28px;
  font-family: Arial;
  font-weight: bold;
  color: black
`;

const LabelTitle = styled.p`
  font-size: 18px;
  font-family: Arial;
  margin: 10px;
  margin-top: 12px;
  color: white;
`;

const LabelInput = styled.input`
  width: 100%;
  boder: none;
  outline: none;
  overflow: hidden;
  background-color: #FFB800;
  height: 48px;
  color: black;
  font-size: 16px;
  padding-left: 10px;
  border-top: 2px solid white;
  border-bottom: 2px solid white;
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


const ButtonStyledSpecial = styled.button`
width: 90%;
height: 60px;
background-color: #FFB800;
color: white;
font-size: 18px;
outline: none;
border: none;
border-radius: 10px;
`;

const InfoWrapper = styled.div`
  margin: 20px;
  background-color: #705000;
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

const BtnSpacing = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
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

const Spacer = styled.div`
  margin: 20px;
`;

const TopBarStyles = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 20px;
  background-color: #DDDDDD;
  padding: 20px;
  padding-top: 52px;
`;

const ProfileStyles = styled(Link)`
  width: 60px;
  height: 60px;
  background-color: #FFD637;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  box-shadow: 1px 6px 10px #888888;
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
      <Redirect to={"/menuuser"} />
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
    <div>
      <TopBarStyles>
        <TopBarLink  aria-label="Ga terug naar het beginscherm" to="/menuuser">{'<'} Ga terug</TopBarLink>
        <ProfileStyles aria-label="Ga naar jou profiel" to="/profile">
          <svg width="33" height="36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 17c4.418 0 8-3.806 8-8.5S20.418 0 16 0 8 3.806 8 8.5s3.582 8.5 8 8.5zM0 36c0-8.839 7.385-16 16.5-16S33 27.161 33 36" fill="#000" /></svg>
        </ProfileStyles>
      </TopBarStyles>
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
    </div>
  )
}

export default Profile;