import React from "react";
import Registration from "./registration/RegistrationMenu";

export default function YouthRegistration() {
  return (
    <div
      className="min-h-screen flex justify-center items-center 
      bg-gradient-to-br from-orange-100 via-white to-blue-100 
      backdrop-blur-sm p-4"
    >
      <div className="bg-white/40 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <Registration />
      </div>
    </div>
  );
}
