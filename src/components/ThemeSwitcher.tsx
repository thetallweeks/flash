import React, { useState } from "react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("light");

  function handleClick() {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  if (theme === "light") {
    return (
      <IoMoonOutline className="w-5 h-5 cursor-pointer" onClick={handleClick} />
    );
  }

  return (
    <IoSunnyOutline className="w-6 h-6 cursor-pointer" onClick={handleClick} />
  );
}
