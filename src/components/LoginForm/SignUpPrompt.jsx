import React from "react";

function SignUpPrompt() {
  return (
    <div className="text-center mt-4">
      <span>Don't have an account? </span>
      <a href="/register" className="text-blue-500 hover:underline">
        Sign up
      </a>
    </div>
  );
}

export default SignUpPrompt;
