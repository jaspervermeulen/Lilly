import React, { useContext, useState } from 'react';
import firebase from "./Authentication/base";
import { AuthContext } from "./Authentication/Auth.js";
import { Redirect } from 'react-router-dom';

const Home = () => {
  const [log, setLog] = useState()
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [bio, setBio] = useState()
  const [purpose, setPurpose] = useState()

  // Get current user with useContext and authContext from authentication base
  const { currentUser } = useContext(AuthContext);

  // Create user reference to firestore doc
  const usersRef = firebase.firestore().collection('Users').doc(currentUser.uid)

  // Retrieve doc data and check if user exists in cloud firestore -> redirect to sign up if not
  usersRef.get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) {
        console.log('ok')
        setLog("true");
        usersRef.onSnapshot((doc) => {
          console.log(doc);
        });
      } else {
        console.log('no ok')
        setLog("false");
      }
  });
  
  const onCreate = () => {
    firebase.firestore().collection('Users').doc(currentUser.uid).set({
      voornaam: firstName,
      achternaam: lastName,
      volledige_naam: firstName + ' ' + lastName,
      email: currentUser.email,
      id: currentUser.uid,
      bio: bio,
      soort_gebruiker: purpose,
      links: []
    })
    setLog("true");
  }
  
  //Return statement
  return (
    <>
      {
        log === "true" ? (
          purpose === 'Gebruiker' ? <Redirect to="/menuuser" /> : <Redirect to="/menuvolunteer" />
          
        ) : (
          <div>
              <p>Vul uw gegevens verder aan</p>
              <label>
                Voornaam
                <input
                  value={firstName}
                  onChange={e => {
                    setFirstName(e.target.value)
                  }}
                />  
              </label>
              <br />
              <label>
                Achternaam
                <input
                  value={lastName}
                  onChange={e => {
                    setLastName(e.target.value)
                  }}
                />  
              </label>
              <br />
              <label>
                Bio
                <input
                  value={bio}
                  onChange={e => {
                    setBio(e.target.value)
                  }}
                />  
              </label>
              <br />
              <label>
                Gebruiker
                <input
                  type="radio"
                  name="purpose"
                  value="Gebruiker"
                  onClick={() => {
                    setPurpose("Gebruiker")
                  }}
                />
              </label>
              <br />
              <label>
                Vrijwilliger
                <input
                  type="radio"
                  name="purpose"
                  value="Vrijwilliger"
                  onClick={() => {
                    setPurpose("Vrijwilliger")
                  }}
                />
              </label>
              <br />
              <button onClick={onCreate}>Update</button>
          </div>
        )
      }
      
    </>
  )
}

export default Home;