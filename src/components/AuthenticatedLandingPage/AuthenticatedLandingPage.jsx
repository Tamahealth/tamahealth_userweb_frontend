import React from "react";
import AuthenticatedHero from "./AuthenticatedHero/AuthenticatedHero";
import HowItWorks from "../LandingPages/HowItWorks/HowItWorks";
import Features from "../LandingPages/Features/Features";

export default function AuthenticatedLandingPage({ user, howItWorksSection }) {
  return (
    <div>
      <AuthenticatedHero user={user} />
      <HowItWorks id={howItWorksSection} />
      {/* <Features /> */}
    </div>
  );
}
