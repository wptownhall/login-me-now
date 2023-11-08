import React, { useState } from "react";

function LoginLayout() {
  const [bellow, setBellow] = useState(true);
  const [bellowSeparator, setBellowSeparator] = useState(false);
  const [above, setAbove] = useState(false);
  const [aboveSeparator, setAboveSeparator] = useState(false);

  const handleBellow = () => {
    setBellow(true);
    setBellowSeparator(false);
    setAbove(false);
    setAboveSeparator(false);
  };
  const handleBellowSeparator = () => {
    setBellow(false);
    setBellowSeparator(true);
    setAbove(false);
    setAboveSeparator(false);
  };
  const handleAbove = () => {
    setBellow(false);
    setBellowSeparator(false);
    setAbove(true);
    setAboveSeparator(false);
  };
  const handleAboveSeparator = () => {
    setBellow(false);
    setBellowSeparator(false);
    setAbove(false);
    setAboveSeparator(true);
  };
  return (
    <div className="mt-12">
      <p class="mt-0 text-[20px] text-[#000000] tablet:w-full font-medium mb-8">
        Login layout
      </p>
      <div className="flex items-center mb-4">
        <input
          checked={bellow}
          onChange={handleBellow}
          id="bellow"
          type="radio"
          class="w-4 h-4 !text-transparent bg-gray-100 !border-[#878787] border-[1px] focus:ring-blue-600 !mt-[2px]"
        />
        <label
          for="bellow"
          class="ml-2 text-[18px] text-[#424344] dark:text-[#424344]"
        >
          Bellow
        </label>
      </div>

      <div className="flex items-center mb-4">
        <input
          checked={bellowSeparator}
          onChange={handleBellowSeparator}
          id="bellow_with_separator"
          type="radio"
          class="w-4 h-4 !text-transparent bg-gray-100 !border-[#878787] border-[1px] focus:ring-blue-600 !mt-[2px]"
        />
        <label
          for="bellow_with_separator"
          class="ml-2 text-[18px] text-[#424344] dark:text-[#424344]"
        >
          Below with separator
        </label>
      </div>

      <div className="flex items-center mb-4">
        <input
          checked={above}
          onChange={handleAbove}
          id="above"
          type="radio"
          class="w-4 h-4 !text-transparent bg-gray-100 !border-[#878787] border-[1px] focus:ring-blue-600 !mt-[2px]"
        />
        <label
          for="above"
          class="ml-2 text-[18px] text-[#424344] dark:text-[#424344]"
        >
          Above
        </label>
      </div>
      <div className="flex items-center mb-4">
        <input
          checked={aboveSeparator}
          onChange={handleAboveSeparator}
          id="above_with_separator"
          type="radio"
          class="w-4 h-4 !text-transparent bg-gray-100 !border-[#878787] border-[1px] focus:ring-blue-600 !mt-[2px]"
        />
        <label
          for="above_with_separator"
          class="ml-2 text-[18px] text-[#424344] dark:text-[#424344]"
        >
          Above with separator
        </label>
      </div>
    </div>
  );
}

export default LoginLayout;
