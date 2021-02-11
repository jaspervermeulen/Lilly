import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import icons from "../../assets/Icons/Profile.svg"
import firebase from "../../Authentication/base";
import { AuthContext } from "../../Authentication/Auth";
import Cam from "../../assets/cam.svg"

const CardStyles = styled.div`
  background-color: #00499A;
  margin: 20px;
  border-radius: 10px;
  display: flex;
`;

const CallButton = styled.a`
  width: 48px; 
  height: 48px;
  background-color: #07AC04;
  border-radius: 4px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center
`;

const Image = styled.div`
  margin: 6px;
  width: 60px;
  height: 60px;
  background-color: lightgrey;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

`;

const LinkExper = styled.p`
  margin-bottom: 4px;
`;

const CardBottom = styled.div`
  color: white;
  font-family: arial;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px;
`;

const CardBottomTitle = styled.p`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Links = () => {

  const { currentUser } = useContext(AuthContext);

  const [linkers, setLinkers] = useState([])

  useEffect(() => {
    const getLinks = () => {
      console.log('Click')
      const Query = firebase.firestore().collection("Users").doc(currentUser.uid);
      Query.get().then(async function (doc) {

          const data = await firebase.firestore().collection("Users").where("links", "array-contains", doc.data().volledige_naam).get();
          //setLinkers(data.docs.map(doc => doc.data()))

          setLinkers(data.docs.map(doc => doc.data()))
        
      })
    }
    getLinks();
  }, []);

  return (
    <>
      <div>
        {/* <button onClick={getLinks}>click</button> */}

        {
          linkers.map(link => {
            return (
              <CardStyles>
                <CardTop>
                  <Image>
                    <img src={icons} alt="icon" />
                  </Image>
                  
                  <CallButton href={link.numberCode}>
                    <img src={Cam} alt="Camera"  width="34" />
                  </CallButton>
                </CardTop>
                <CardBottom>
                  <CardBottomTitle>{link.volledige_naam}</CardBottomTitle>
                  <LinkExper>Experten</LinkExper>
                  <ul>
                    {
                      link.linksExp.map(exp => {
                        return <li>• {exp}</li>
                      })
                    }
                    
                  </ul>
                </CardBottom> 
              </CardStyles>
            )
          })
        }        
      </div>
    </>
  )
}

export default Links;
