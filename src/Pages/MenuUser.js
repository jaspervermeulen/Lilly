import React from "react";
import styled from 'styled-components';
import firebase from "../Authentication/base";

const GlobalStyles = styled.div`
  margin: 24px;
`;

const TopBarStyles = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const TitleStyles = styled.h1`
  font-size: 40px;
  font-weight: bold;
  font-family: Helvetica;
`;



const ScanCardStyles = styled.div`
  width: 100%;
  background-color: #F1CB00;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 16vh;
  margin-bottom: 40px;
`;

const VideoCardStyles = styled.div`
  width: 100%;
  background-color: #03E034;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 16vh;
  margin-bottom: 40px;
`;

const ExpertCardStyles = styled.div`
  width: 100%;
  background-color: #6195FB;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 16vh;
  margin-bottom: 40px;
`;

const MenuUser = () => {
  return (
    <GlobalStyles>
      <button onClick={() => firebase.auth().signOut()}>Sign out</button>   
      <TopBarStyles>
        <TitleStyles>Licht {'&'} Liefde</TitleStyles>
        <svg width="33" height="36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 17c4.418 0 8-3.806 8-8.5S20.418 0 16 0 8 3.806 8 8.5s3.582 8.5 8 8.5zM0 36c0-8.839 7.385-16 16.5-16S33 27.161 33 36" fill="#000"/></svg>
      </TopBarStyles>
      
      <ScanCardStyles>
        <svg width="83" height="87" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)" stroke="#000" stroke-width="19.379" stroke-miterlimit="10"><path d="M35.2 9.7H22.5c-7 0-12.8 5.7-12.8 12.8v11M9.7 51v12.8c0 7 5.7 12.8 12.8 12.8h11M47.1 76.6h12.8c7 0 12.8-5.7 12.8-12.8v-11M72.6 35.8V23c0-7-5.7-12.8-12.8-12.8h-11"/></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h82.3v86.2H0z"/></clipPath></defs></svg>
        <h2>Scan</h2>
      </ScanCardStyles>
      <VideoCardStyles>
        <svg width="109" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="75.992" height="63.602" rx="10" fill="#000"/><path fill-rule="evenodd" clip-rule="evenodd" d="M60.563 34.77v-2.68a6.11 6.11 0 000 2.68zm21.191-17.237v31.793l18.222 10.632c4 2.334 9.024-.551 9.024-5.182V12.084c0-4.631-5.024-7.516-9.024-5.183L81.754 17.533z" fill="#000"/></svg>
        <h2>Vrijwilligers</h2>
      </VideoCardStyles>
      <ExpertCardStyles>
        <svg width="79" height="86" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)" fill="#000"><path d="M39.1 40c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20zM0 85.8c0-21.6 17.5-39.1 39.1-39.1s39.1 17.5 39.1 39.1"/></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h78.3v85.8H0z"/></clipPath></defs></svg>
        <h2>Experten</h2>
      </ExpertCardStyles>
      
    </GlobalStyles>
  )
}

export default MenuUser;