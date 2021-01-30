import React, { useContext } from "react";

import { AuthContext } from "../../Authentication/Auth";

const MenuVolunteer = () => {

  const { currentUser } = useContext(AuthContext);
  

  return (
    <div>
      <p>Volunteer:</p>
      <p>{currentUser.uid}</p>
      <p>Your users are :</p>

      

    </div>
  )
}

export default MenuVolunteer;
