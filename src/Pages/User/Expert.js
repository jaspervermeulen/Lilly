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
  margin-bottom: 20px;
`;

const Spacing = styled.div`
  margin: 20px;
  margin-top: 40px;
`;

const CallLink = styled.div`
  width: 100%;
  background-color: #5C5C56;
  text-decoration: none;
  height: 120px;
  border-radius: 20px;
  font-size: 30px;
  font-weight: bold;
  font-family: arial;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const CallLinkA = styled.a`
  color: white;
  text-decoration: none;
  padding: 40px;
`;

const Expert = () => {

  const { currentUser } = useContext(AuthContext);
  const [linkers, setLinkers] = useState([])

  useEffect(() => {
    const getLinks = () => {
      const Query = firebase.firestore().collection("Users").doc(currentUser.uid);
      Query.get().then(async function (doc) {
        const data = await firebase.firestore().collection("Experts").where("links", "array-contains", doc.data().volledige_naam).get();
        

        setLinkers(data.docs.map(doc => doc.data()))
      })
    }
    getLinks();
  }, []);

  return (
    <>
      <TopBarStyles>
        <TopBarLink aria-label="Ga terug naar het beginscherm" to="/menuuser">{'<'} Ga terug</TopBarLink>
        <ProfileStyles aria-label="Ga naar jou profiel"  to="/profile">
          <svg width="33" height="36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 17c4.418 0 8-3.806 8-8.5S20.418 0 16 0 8 3.806 8 8.5s3.582 8.5 8 8.5zM0 36c0-8.839 7.385-16 16.5-16S33 27.161 33 36" fill="#000" /></svg>
        </ProfileStyles>
      </TopBarStyles>
      {/* <button onClick={getLinks}>get</button> */}
      <Spacing>
        <CallTitle>Bel een expert</CallTitle>

      
        {
          linkers.map(link => { 
            return ( 
              <CallLink>
                <CallLinkA href={link.codenr}>
                  <p>{link.naam}</p>
                </CallLinkA>
              </CallLink>
            )
          })
        }
        </Spacing>
    </>
  )
}

export default Expert;