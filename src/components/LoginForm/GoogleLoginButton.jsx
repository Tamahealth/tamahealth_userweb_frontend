import React, { useState, useEffect } from "react";

function GoogleLoginButton() {
  const [users, setUsers] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUsers(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUsers({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "29615793318-fls49hm91df7s458sr34jn82fu49k9ti.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <div className="App">
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
