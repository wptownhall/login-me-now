import React, { useState } from 'react';

function PasscodeInput() {
  const [inputValue, setInputValue] = useState('');
  const passcode = '12345'; // Replace with your passcode

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    const visibleValue = newValue.substring(0, 5) + '*'.repeat(Math.max(0, newValue.length - 5));
    setInputValue(visibleValue);

    if (newValue.length >= 5) {
      const firstFiveDigits = newValue.substring(0, 5);
      if (firstFiveDigits === passcode) {
        // Correct passcode
        console.log('Passcode is correct');
        // You can take further actions here, e.g., redirect to a secure page.
      } else {
        // Incorrect passcode
        console.log('Passcode is incorrect');
        // You can display an error message or reset the input field here.
      }
    }
  };

  return (
    <div>
      <h1>Enter Passcode (First 5 Digits)</h1>
      <input
        type="text"
        placeholder="Enter passcode..."
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default PasscodeInput;
