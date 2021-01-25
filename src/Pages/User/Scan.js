import React, { useRef, useEffect } from "react";
// import Camera, {  FACING_MODE } from 'react-camera-ios';
import 'react-camera-ios/build/styles.css';

// eslint-disable-next-line
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";

import { drawRect } from "./utilities";

const videoConstraints = {
  facingMode: "environment"
};

const containerStyle = {
  display: 'flex',
  height: 480,
  width: 640,
};

const cameraStyle = {
  position: "absolute",
  marginLeft: "auto",
  marginRight: "auto",
  left: 0,
  right: 0,
  textAlign: "center",
  zindex: 9,
  width: 640,
  height: 480,
};

const canvasStyles = {
  position: "absolute",
  marginLeft: "auto",
  marginRight: "auto",
  left: 0,
  right: 0,
  textAlign: "center",
  zindex: 8,
  width: 640,
  height: 480,
}

const Scan = () => {

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Main function
  const runCoco = async () => {
    const net = await cocossd.load();
    alert("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {

    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {

      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const obj = await net.detect(video);

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx); 
    }
  };

  useEffect(()=>{runCoco()});

  return (
    <div style={containerStyle}>
      <Webcam
        ref={webcamRef}
        muted={true} 
        style={cameraStyle}
        videoConstraints={videoConstraints}
      />
      <canvas
          ref={canvasRef}
          style={canvasStyles}
        />
    </div>
  )
}

export default Scan;