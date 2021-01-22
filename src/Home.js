import React, { useContext } from "react";
import { Link } from "react-router-dom";
import app from "./base";
import { AuthContext } from "./Auth.js";

const Home = () => {

  const { currentUser } = useContext(AuthContext)

  return (
    <>
      <p>Ben je gebruiker of vrijwilliger?</p>
      {/* <p>Home page</p>
      <Link to="scan">Scan</Link>*/}
      <p>{currentUser.uid}</p> 
      <button onClick={() => app.auth().signOut()}>Sign out</button>  
    </>
  )
}

export default Home;