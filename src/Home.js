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
      firstName: firstName,
      lastName: lastName,
      bio: bio,
      purpose: purpose
    })
    setLog("true");
  }
  
  //Return statement
  return (
    <>
      {
        log === "true" ? (
          <Redirect to="/menuuser" />
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
              <button onClick={onCreate}>Update</button>
          </div>
        )
      }
      
    </>
  )

  // const [blogs,setBlogs]=useState([])
  // const fetchBlogs=async()=>{
  //   const response=firebase.firestore().collection('Users');
  //   const data=await response.get();
  //   data.docs.forEach(item=>{
  //    setBlogs([...blogs,item.data()])
  //   })
  // }
  // useEffect(() => {
  //   fetchBlogs();
  //   // eslint-disable-next-line
  // }, [])
  // return (
  //   <div className="App">
  //     {
  //       blogs.map(blog=>{
  //         return(
  //           <div key={blog.firstName} className="blog-container">
  //             <h4>{blog.firstName}</h4>
  //             <p>{blog.lastName}</p>
  //           </div>
  //         )
  //       })
  //     }
  //   </div>
  // );
  // // const [users,setUsers]=useState([])
  // const { currentUser } = useContext(AuthContext);

  // // useEffect(() => {
  // //   fetchUsers();
  // // })

  // // const fetchUsers=async()=>{
  // //   const response = db.collection('users');
  // //   const data = await response.get();
  // //   data.forEach(item=>{
  // //     setUsers([item.data()])
  // //    })
  // // }


  // db.collection("users").add({
  //   first: "Ada",
  //   last: "Lovelace",
  //   born: 1815
  // })
  // .then(function(docRef) {
  //     console.log("Document written with ID: ", docRef.id);
  // })
  // .catch(function(error) {
  //     console.error("Error adding document: ", error);
  // });

  // return (
  //   <>
  //     {/* {
  //       users && users.map(user=>{
  //         return(
  //           <div className="blog-container">
  //             <h4>{user.firstName}</h4>
  //             <p>{user.lastName}</p>
  //           </div>
  //         )
  //       })
  //     } */}
  //     <p>Ben je gebruiker of vrijwilliger?</p>
  //     {/* <p>Home page</p>
  //     <Link to="scan">Scan</Link>*/}
  //     <p>{currentUser.uid}</p> 
  //     <button onClick={() => app.auth().signOut()}>Sign out</button>  
  //   </>
  // )
}

export default Home;