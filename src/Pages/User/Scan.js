import React, { useRef, useState } from "react";
// eslint-disable-next-line
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";

import { drawRect } from "./utilities";
import { Link } from "react-router-dom";

const videoConstraints = {
  facingMode: "environment",
  audio: false
};

const containerStyle = {
  display: 'flex',
  height: "90vh",
  width: "100vw",
};



const cameraStyle = {
  position: "absolute",
  marginLeft: "auto",
  marginRight: "auto",
  left: 0,
  right: 0,
  textAlign: "center",
  zindex: 9,
  width: "100vw",
  height: "90vh",
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

const Scan = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [object, setObject] = useState("Zoeken");

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
      ctx.fillStyle === '#000000' ? setObject("aan het zoeken") : setObject(obj[0]["class"])
  
    }
  };
 

  // useEffect(()=>{runCoco()});

  return (
    <div style={containerStyle}>
      <Link to="/">Ga terug</Link>
      <p>{object}</p>
      <Webcam
        ref={webcamRef}
        muted={true} 
        style={cameraStyle}
        videoConstraints={videoConstraints}
        onClick={runCoco}
      />
      <canvas
        ref={canvasRef}
        style={canvasStyles}
        onClick={runCoco}
      />
      {/* <button style={btnStyle} onClick={runCoco}></button> */}
    </div>
  )
}

export default Scan;