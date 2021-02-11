import React, { useEffect, useState } from "react";
import firebase from "../../Authentication/base";
import styled from "styled-components";

const ListStyles = styled.ul`
  margin: 20px;
  padding-bottom: 150px;
`;

const ListItem = styled.li`
  font-family: roboto, Arial;
  font-size: 18px;
  display: flex;
  background-color: #00499A;
  border-radius: 14px;
  margin-bottom: 16px;
`; 

const ListDate = styled.p`
  width: 120px;
  background-color: white;
  font-weight: bold;
  color: #00499A;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px;
  border-radius: 10px;
  margin-right: 10px;
`;

const ListText = styled.p`
  font-weight: bold;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// const ButtonStyles = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   margin: 20px;
  
// `;

// const Button = styled.button`
//   width: 100%;
//   height: 36px;
//   background-color: #D9D6D6;
//   border: none;
// `;

const Agenda = () => {

  const [agendaItem, setAgendaItems] = useState([])

  useEffect(() => {
    const getAgendaItems = async () => {
      const db = firebase.firestore();
      const data = await db.collection("Agenda").orderBy("Datum", "desc").get()
      setAgendaItems(data.docs.map(doc => doc.data()))
    }
    getAgendaItems();
  }, [])

  return (
    <>
      {/* <ButtonStyles>
        <Button onClick={getAgendaItems}>Agenda ophalen</Button>
      </ButtonStyles> */}
      
      <ListStyles>
        {
          agendaItem.map(item => (
            <ListItem key={item.Naam}>
              <ListDate>{item.Datum}</ListDate>
              <ListText>{item.Naam}</ListText>
            </ListItem>
          ))
        }
      </ListStyles>
    </>
  )
}

export default Agenda;