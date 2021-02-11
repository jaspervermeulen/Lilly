import React, { useContext, useState } from 'react';
import firebase from "./Authentication/base";
import { AuthContext } from "./Authentication/Auth.js";
import { Redirect } from 'react-router-dom';
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 20px;
  padding-top:66px;
`;

const Title = styled.p`
  font-family: Arial;
  font-size: 20px;
  font-weight: bold;
  margin-top: 40px;
  margin-bottom: 20px;
`;

const LabelText = styled.p`
  font-family: Arial;
  font-size: 16px;
  margin-bottom: 8px;
`;

const LabelTextSpecial = styled.p`
  font-family: Arial;
  font-size: 16px;
  margin-left: 6px;
`;

const LabelInput = styled.input`
  border: none;
  border: 1px solid black;
  height: 40px;
  border-radius: 0px;
  font-size: 18px;
`;

const LabelStyles = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 6px;
`;

const LabelStylesSpecial = styled.label`
  display: flex;
  align-items: center;
`;

const ButtonStyled = styled.button`
  margin-top: 30px;
  width: 100%;
  height: 60px;
  background-color: #00499A;
  color: white;
  font-size: 18px;
`;

const Home = () => {
  const [log, setLog] = useState()
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [nummer, setNummer] = useState()
  const [purpose, setPurpose] = useState()


  // Get current user with useContext and authContext from authentication base
  const { currentUser } = useContext(AuthContext);

  // Create user reference to firestore doc
  const usersRef = firebase.firestore().collection('Users').doc(currentUser.uid)

  // Retrieve doc data and check if user exists in cloud firestore -> redirect to sign up if not
  usersRef.get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) {
        console.log('ok')
        setLog("true");
        usersRef.onSnapshot((doc) => {
          console.log(doc);
        });
      } else {
        console.log('no ok')
        setLog("false");
      }
    });
  

  
  const onCreate = () => {
    firebase.firestore().collection('Users').doc(currentUser.uid).set({
      voornaam: firstName,
      achternaam: lastName,
      volledige_naam: firstName + ' ' + lastName,
      email: currentUser.email,
      emailCode: `mailto:` + currentUser.email,
      number: nummer,
      numberCode: `facetime:` + nummer,
      id: currentUser.uid,
      soort_gebruiker: purpose,
      links: [],
      linksExp: []
    })
    setLog("true");
  }
  
  //Return statement
  return (
    <>
      {
        log === "true" ? (
          purpose === 'Gebruiker' ? <Redirect to="/menuuser" /> : <Redirect to="/menuvolunteer" />
          
        ) : (
          <Wrapper>
              <Title>We zien dat je nieuw bent! <br /> Vul hieronder eerst jou gegevens verder aan.</Title>
              <LabelStyles>
                <LabelText>Voornaam</LabelText>
                <LabelInput
                  value={firstName}
                  required
                  onChange={e => {
                    setFirstName(e.target.value)
                  }}
                />  
              </LabelStyles>
              <br />
              <LabelStyles>
                <LabelText>Achternaam</LabelText>
                <LabelInput
                  value={lastName}
                  required
                  onChange={e => {
                    setLastName(e.target.value)
                  }}
                />  
              </LabelStyles>
              <br />
              <LabelStyles>
                <LabelText>Nummer</LabelText>
                <LabelInput
                  value={nummer}
                  required
                  onChange={e => {
                    setNummer(e.target.value)
                  }}
                />  
              </LabelStyles>
              <br />
              
              <LabelStylesSpecial>
                <input
                  type="radio"
                  name="purpose"
                  value="Gebruiker"
                  required
                  onClick={() => {
                    setPurpose("Gebruiker")
                  }}
                />
                <LabelTextSpecial>Gebruiker</LabelTextSpecial>
                
              </LabelStylesSpecial>
              <br />
              <LabelStylesSpecial>
                <input
                  type="radio"
                  name="purpose"
                  required
                  value="Vrijwilliger"
                  onClick={() => {
                    setPurpose("Vrijwilliger")
                  }}
                />
                <LabelTextSpecial>Vrijwilliger</LabelTextSpecial>
                
              </LabelStylesSpecial>
              <br />
              <ButtonStyled onClick={onCreate}>Ga verder</ButtonStyled>
          </Wrapper>
        )
      }
      
    </>
  )
}

export default Home;