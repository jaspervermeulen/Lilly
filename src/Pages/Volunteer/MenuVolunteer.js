import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../Authentication/Auth";
import firebase from "../../Authentication/base";

const MenuVolunteer = () => {

  const { currentUser } = useContext(AuthContext);
  const [currentUserNaam, setCurrentUserNaam] = useState(undefined)

  const [linkedUsers, setLinkedUsers] = useState([])

  const userRef = firebase.firestore().collection('Users').doc(currentUser.uid);
  userRef.get().then(function (doc) {
    if (doc.exists) {
      if (currentUserNaam === undefined) {
        setCurrentUserNaam(doc.data().volledige_naam)
      }
      setLinkedUsers(doc.data().links);
    } else {
      <Redirect to={"/menuvolunteer"} />
    }
  })

  return (
    <div>
      <p>Volunteer:</p>
      <p>{currentUserNaam}</p>
      <p>Your users are :</p>

      {
        linkedUsers.map(linkedUser => {
          return (
            <div>
              <p>{linkedUser.Naam}</p>
              <p>{linkedUser.Bio}</p>
            </div>
          )
        })
      }

    </div>
  )
}

export default MenuVolunteer;
