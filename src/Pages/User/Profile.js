import React, { useContext, useState } from "react"
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../../Authentication/Auth";
import firebase from "../../Authentication/base";

const Profile = () => {
  const [fullname, setName] = useState(undefined)
  const [bio, setBio] = useState(undefined)

  const [succes, setSucces] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const userRef = firebase.firestore().collection('Users').doc(currentUser.uid);
  userRef.get().then(function (doc) {
    if (doc.exists) {
      
      if (fullname === undefined) {
        setName(doc.data().volledige_naam)
      } 
      if (bio === undefined) {
        setBio(doc.data().bio)
      } 
    } else {
      <Redirect to={"/menuuser"} />
    }
  })

  const onSubmit = () => {
    firebase.firestore().collection('Users').doc(currentUser.uid).update({
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
            <p>Je info is succesvol geupdate!</p>
            <button onClick={onClick}>x</button>
          </div>
        ) : (
            <></>
        )
      }
      <Link to="/menuuser">Ga terug</Link>
      <button onClick={() => firebase.auth().signOut()}>Log uit</button>
      <div>
        <p>Je bent ingelogd als {fullname}</p>
        <p>Verander hier je persoonlijke info</p>
        
        
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
        <button onClick={onSubmit}>Verandere je info</button>
      </div>
    </>
  )
}

export default Profile;