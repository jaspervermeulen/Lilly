import React, { useRef, useState } from "react";
// eslint-disable-next-line
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import styled from "styled-components";

import { drawRect } from "./utilities";
import { Link } from "react-router-dom";

const videoConstraints = {
  facingMode: "environment",
  audio: false
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: "90vh",
  width: "100vw",
};

const TopBar = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 20px;
  background-color: #DDDDDD;
  padding: 20px;
  z-index: 9999;
  padding-top: 52px;
`;

const TopBarLink = styled(Link)`
  text-decoration: none;
  font-size: 28px;
  font-family: Arial;
  font-weight: bold;
  color: black
`;

const cameraStyle = {
  position: "absolute",
  marginLeft: "auto",
  marginRight: "auto",
  left: 0,
  right: 0,
  textAlign: "center",
  zindex: 9,
  width: "100vw",
  height: "80vh",

};

const canvasStyles = {
  position: "absolute",
  marginLeft: "auto",
  marginRight: "auto",
  left: 0,
  right: 0,
  textAlign: "center",
  zindex: 8,
  width: "100vw",
  height: "90vh",
  display: 'none'
}

const FoundItem = styled.div`
  background-color: #F1CB00;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 14px 0;
  padding-bottom: 50px;
  padding-top: 50px;
  z-index: 99;
`;

const FoundItemText = styled.button`
  font-size: 30px;
  font-family: Arial;
  font-weight: bold:
`;

const Scan = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [object, setObject] = useState("Searching");

  // Algemene COCOSSD functie
  const runCoco = async () => {
    const net = await cocossd.load();
    detect(net);
  };


  // Detecteer functie
  const detect = async (net) => {
    // Check als webcam werkt
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {

      // Haal properties video op
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Zet video width en height
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Zet canvas width en height (canvas voor drawrect)
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Detecteer op net
      const obj = await net.detect(video);

      // Teken in canvas
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx); 

      // setInterval(() => this.setState({ time: Date.now() }), 1000)
      ctx.fillStyle === '#000000' ? setObject("Searching") : setObject(obj[0]["class"])
  
    }
  };
 

  // useEffect(()=>{runCoco()});

  
  

  return (
    <div style={containerStyle}>
      <TopBar>
        <TopBarLink aria-label="Ga terug naar het beginscherm" to="/menuuser">{'<'} Ga terug</TopBarLink>
      </TopBar>
      <FoundItem>
        
        <FoundItemText aria-label={object} lang="en" onClick={runCoco}>{object}</FoundItemText>
      </FoundItem>
      <Webcam
        ref={webcamRef}
        muted={true} 
        style={cameraStyle}
        videoConstraints={videoConstraints}
        onClick={runCoco}
        aria-label="Klik hier om te herkennen"
      />
      <canvas
        ref={canvasRef}
        style={canvasStyles}
        onClick={runCoco}
        aria-label="Klik hier om te herkennen"
      />
      {/* <button style={btnStyle} onClick={runCoco}></button> */}
    </div>
  )
}

export default Scan;