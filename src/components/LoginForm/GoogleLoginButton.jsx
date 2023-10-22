import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

function GoogleLoginButton() {
  const [users, setUsers] = useState({});

  // const googleAuth = () => {
  //   window.open("${process.env.REACT_API_URL}/auth/google/callback", "_self");
  // };

  async function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    const userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUsers(userObject);
    const email = userObject.email;
    const emailResponse = await fetch('http://localhost:3001/api/verify-email', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email }),
});

  
    if (emailResponse.ok) {
      const data = await emailResponse.json();
      console.log(data.message);
    } else {
      console.log('Email not found in the database');
     
    }
    document.getElementById("signInDiv").hidden = true; // Always hide the sign-in button
  }
  
  

  function handleSignOut(event) {
    setUsers({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "274539974663-pg594q2mj3q24t31q60gor6d5oa72qdu.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <div className="App">
      {/* <button  onClick ={googleAuth}>
          {/* <img src="./images/google.png" alt="google icon" /> */}
          {/* <span>Sign up with Google</span>
          </button> */}
      <div id="signInDiv"></div>
      {Object.keys(users).length !== 0 && (
        // Uncomment below if you want to show a Sign Out button
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      )}
      {/* Add any additional rendering logic based on user state here */}
    </div>
  );
}

export default GoogleLoginButton;
