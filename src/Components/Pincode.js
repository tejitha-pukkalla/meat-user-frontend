import React, { useState } from "react";


const Pincode = ({ onSubmit }) => {
  const [pincode, setPincode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pincode.length === 6) {
      onSubmit(pincode);
    } else {
      alert("Please enter a valid 6-digit pincode");
    }
  };

  return (
    <div className="overlay">
      <div className="popup-card">
        <h2>Enter your Pincode 📍</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            maxLength={6}
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="e.g. 500001"
            className="pincode-input"
          />
          <button type="submit" className="btn">
            Proceed
          </button>
        </form>
      </div>
    </div>
  );
};

export default Pincode;
