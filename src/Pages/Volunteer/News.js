import React, { useEffect, useState } from "react"
import firebase from "../../Authentication/base";
import styled from "styled-components";

const MainWrapper = styled.div`
  padding-bottom: 100px;
`;

const ArticleStyles = styled.div`
  background-color: #00499A;
`;

const ArticleTitle = styled.p`
  font-size: 20px;
  color: white;
  font-family: arial;
  font-weight: bold;
  margin: 0 20px;
  margin-bottom: 8px;
  margin-top: 10px;
`;

const ArticleText = styled.p`
  font-size: 16px;
  color: white;
  font-family: arial;
  margin: 0 20px;
  padding-bottom: 18px;
`;

const ArticleImg = styled.img`
  width: 100%;
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

const News = () => {

  const [newsItem, setNewsItem] = useState([])

  useEffect(() => {
    const getNewsItems = async () => {
      const db = firebase.firestore();
      const data = await db.collection("News").get()
      setNewsItem(data.docs.map(doc => doc.data()))
    }
    getNewsItems();
  }, [])
  return (
    <MainWrapper>
      {/* <ButtonStyles>
        <Button onClick={getNewsItems}>Haal nieuws op</Button>
      </ButtonStyles> */}
        
      
      
      {
        newsItem.map(item => {
          return (
            <ArticleStyles>
              <ArticleImg src={item.Img} alt={item.Naam} />
              <ArticleTitle>{item.Naam}</ArticleTitle>
              <ArticleText>{item.Omschrijving}</ArticleText>
            </ArticleStyles>
          )
        })
      }
    </MainWrapper>
  )
}

export default News;