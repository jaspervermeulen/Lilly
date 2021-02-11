import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Authentication/Auth";
import firebase from "../../Authentication/base";

const TopBarStyles = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 20px;
  background-color: #DDDDDD;
  padding: 20px;
  padding-top: 52px;
`;

const TopBarLink = styled(Link)`
  text-decoration: none;
  font-size: 28px;
  font-family: Arial;
  font-weight: bold;
  color: black
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

const CallTitle = styled.p`
  font-size: 30px;
  font-family: arial;
  font-weight: bold;
`;

const Spacing = styled.div`
  margin: 20px;
  margin-top: 40px;
`;

const CallGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  margin-top: 20px;
`;

const CallGridItem = styled.div`
  background-color: #004760;
  height: 160px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: arial;
  font-size: 30px;
  text-align: center;
  padding: 10px;
`;

const CallGridName = styled.a`
  text-decoration: none;
  color: white;
`;

const VideoCall = () => {

  const { currentUser } = useContext(AuthContext);
  const [linkers, setLinkers] = useState([])

  useEffect(() => {
    const getLinks = () => {
      const Query = firebase.firestore().collection("Users").doc(currentUser.uid);
        Query.get().then(async function (doc) {
            const data = await firebase.firestore().collection("Users").where("links", "array-contains", doc.data().volledige_naam).get();
            

            setLinkers(data.docs.map(doc => doc.data()))
        })
    }
    getLinks();
    
  }, []);

  return (
    <>
      <TopBarStyles>
        <TopBarLink aria-label="Ga terug naar het beginscherm" to="/menuuser">{'<'} Ga terug</TopBarLink>
        <ProfileStyles aria-label="Ga naar jou profiel" to="/profile">
          <svg width="33" height="36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 17c4.418 0 8-3.806 8-8.5S20.418 0 16 0 8 3.806 8 8.5s3.582 8.5 8 8.5zM0 36c0-8.839 7.385-16 16.5-16S33 27.161 33 36" fill="#000" /></svg>
        </ProfileStyles>
      </TopBarStyles>
      <Spacing>
        <CallTitle>Bel een vrijwilliger</CallTitle>
        
        <CallGrid>
          {
            linkers.map(link => {
              return <CallGridItem>
                <CallGridName href="facetime:+32468147857">{link.volledige_naam}</CallGridName>
              </CallGridItem>
            })
          }
        </CallGrid>
      </Spacing>
        
      

    </>
  )
}

export default VideoCall;