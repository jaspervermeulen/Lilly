import React, {useContext, useEffect, useState} from "react";
import Profile from "../../assets/volunteers/Profile.svg"
import styled from "styled-components";
import firebase from "../../Authentication/base";

import Agenda from "../../assets/volunteers/Agenda.svg";
import Logo from "../../assets/volunteers/Logo.svg";
import Persons from "../../assets/volunteers/Persons.svg";
import AgendaBlue from "../../assets/volunteers/AgendaBlue.svg";
import LogoBlue from "../../assets/volunteers/LogoBlue.svg";
import PersonsBlue from "../../assets/volunteers/PersonsBlue.svg";

import AgendaPage from "./Agenda";
import { AuthContext } from "../../Authentication/Auth";
import { Redirect } from "react-router-dom";
import News from "./News";
import Links from "./Links";
import ProfilePage from "./Profile";


const ImageWrapper = styled.button`
  background-color: #00499A;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  outline: none;
  border: none;
`;

const ImageWrapperSpecial = styled.button`
  background-color: #00499A;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  outline: none;
  border: none;
  opacity: 0;
`;

const MainWrapper = styled.div`
  height: 100vh;
`;

const Img = styled.img`
  margin-bottom: 4px;
`;

const Title = styled.h1`
  font-size: 35px;
  color: #033265;
  font-family: Roboto, Arial;
  font-weight: bold;
`;

const TopWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin: 25px 20px;
`;

const BottomNav = styled.div`
  background-color: #D9D6D6;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 14px 0;
  padding-bottom: 30px;
`;

const QuickFlex = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
`;

const NavText = styled.p`
  font-size: 13px;
  font-family: Roboto, Arial;
  margin-top: 5px;
  color: #909090;
`;

const NavTextSpecial = styled.p`
  font-size: 13px;
  font-family: Roboto, Arial;
  margin-top: 5px;
  color: #00499A;
`;

const MenuVolunteer = () => {

  const [currentPage, setCurrentPage] = useState("persons");
  const { currentUser } = useContext(AuthContext);
  const [purpose, setPurpose] = useState();

  

  useEffect(() => {
    const userRef = firebase.firestore().collection('Users').doc(currentUser.uid);
    userRef.get().then(function (doc) {
      setPurpose(doc.data().soort_gebruiker)
      
    });

    
    
  }, [])


  

  return (
    <MainWrapper>
      {
        purpose === 'Gebruiker' ? <Redirect to="/menuuser" /> : <Redirect to="/menuvolunteer" />
      }
      <TopWrapper>
        {
          currentPage === "persons" ? (
            <Title>Mijn Lijst</Title>
          ): currentPage === "logo" ? (
            <Title>L{'&'}L Nieuws</Title>
          ) : currentPage === "agenda" ? (
            <Title>Agenda</Title>
          ) : (
            <Title>Profiel</Title>
          )
        }
        
        {
          currentPage === "profile" ? (
            <ImageWrapperSpecial onClick={() => setCurrentPage("profile")}>
              <Img src={Profile} alt="Profiel" />
            </ImageWrapperSpecial>
          ): (
            <ImageWrapper onClick={() => setCurrentPage("profile")}>
              <Img src={Profile} alt="Profiel" />
            </ImageWrapper>
          )
        }
        
      </TopWrapper>
      
      <div>
        {
          currentPage === "persons" ? (
            <Links />
          ) : currentPage === "logo" ? (
            <News />
          ) : currentPage === "agenda" ? (
            <AgendaPage />
          ) : (
            <ProfilePage />
          )
        }
      </div>

      <BottomNav>
        <QuickFlex onClick={() => setCurrentPage("persons")}>
          {
            currentPage === "persons" ? (
              <>
                <img src={PersonsBlue} alt="Persons" />
                <NavTextSpecial>Personen</NavTextSpecial>
              </>
            ) : (
              <>  
                <img src={Persons} alt="Persons" />
                <NavText>Personen</NavText>
              </>
            )
          }
          
        </QuickFlex>
        <QuickFlex onClick={() => setCurrentPage("logo")}>
          {
            currentPage === "logo" ? (
              <>
                <img src={LogoBlue} alt="Agenda" />
                <NavTextSpecial>Licht {'&'} Liefde</NavTextSpecial>
              </>
            ) : (
              <>
                <img src={Logo} alt="Logo" />
                <NavText>Licht {'&'} Liefde</NavText>
              </>
            )
          }
          
        </QuickFlex>
        <QuickFlex onClick={() => setCurrentPage("agenda")}>
          {
            currentPage === "agenda" ? (
              <>
                <img src={AgendaBlue} alt="Agenda" />
                <NavTextSpecial>Agenda</NavTextSpecial>
              </>
            ): (
              <>
                <img src={Agenda} alt="Agenda" />
                <NavText>Agenda</NavText>
              </>
            )
          }
          
        </QuickFlex>
      </BottomNav>
    </MainWrapper>
  )
}

export default MenuVolunteer;
