import React, { useContext, useState } from "react"
import { AuthContext } from "../../Authentication/Auth";
import firebase from "../../Authentication/base";

const Profile = () => {
  const [firstName, setFirstName] = useState(undefined)
  const [lastName, setLastName] = useState(undefined)
  const [bio, setBio] = useState(undefined)

  const [succes, setSucces] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const userRef = firebase.firestore().collection('Users').doc(currentUser.uid);
  userRef.get().then(function (doc) {
    if (doc.exists) {
      
      if (firstName === undefined) {
        setFirstName(doc.data().firstName)
      } 
      if (lastName === undefined) {
        setLastName(doc.data().lastName)
      } 
      if (bio === undefined) {
        setBio(doc.data().bio)
      } 
    } else {
      console.log("No such document")
    }
  })

  const onSubmit = () => {
    firebase.firestore().collection('Users').doc(currentUser.uid).set({
      firstName: firstName,
      lastName: lastName,
      bio: bio
    })
    setSucces(true);
  }

  const onClick = () => {
    setSucces(false);
  }

  return (
    <>
      {
        succes === true ? (
          <div>
            <p>Info updated succesfully</p>
            <button onClick={onClick}>x</button>
          </div>
        ) : (
            <></>
        )
      }
      <button onClick={() => firebase.auth().signOut()}>Sign out</button>
      <div>
       
        <label>
          Voornaam
          <input
            value={firstName}
            onChange={e => {
              setFirstName(e.target.value)
            }}
          />  
        </label>
        <label>
          Achternaam
          <input
            value={lastName}
            onChange={e => {
              setLastName(e.target.value)
            }}
          />  
        </label>
        <label>
          Bio
          <input
            value={bio}
            onChange={e => {
              setBio(e.target.value)
            }}
          />  
        </label>
        <button onClick={onSubmit}>Change info</button>
      </div>
    </>
  )
}

export default Profile;