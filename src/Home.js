import React from "react";
import { Link } from "react-router-dom";
import app from "./base";


const Home = () => {
  return (
    <>
      <p>Home page</p>
      <Link to="scan">Scan</Link>
      <button onClick={() => app.auth().signOut()}>Sign out</button>  
    </>
  )
}

export default Home;