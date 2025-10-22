import React from "react";

function Logo() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <img
        src="logo.png" // my logo for my website
        style={{ width: "56px", height: "56px" }} // slightly smaller for header
      />
      <h1 style={{ fontSize: "18px", margin: 0, color: '#ffffff' }}>Skillsync</h1>
    </div>
  );
}

export default Logo;

    