import React from "react";
// import AuthenticatedHero from "./AuthenticatedHero/AuthenticatedHero";
import GoogleAuthenticated from "./googleAuthenticated";
import HowItWorks from "../LandingPages/HowItWorks/HowItWorks";
import Features from "../LandingPages/Features/Features";

export default function AuthenticatedLandingPage({ user, howItWorksSection }) {
  return (
    <div>
      {/* <AuthenticatedHero user={user} /> */}
       <GoogleAuthenticated user={user} />
      <HowItWorks id={howItWorksSection} />
      {/* <Features /> */}
    </div>
  );
}
