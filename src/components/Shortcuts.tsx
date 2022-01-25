import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import { FaRegKeyboard } from "react-icons/fa";
import classnames from "classnames";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import useOnClickOutside from "../hooks/useOnClickOutside";

export default function Shortcuts() {
  const ref = useRef(null);
  const [showShortcuts, setShowShortcuts] = useState(false);

  useOnClickOutside(ref, () => {
    setShowShortcuts(false);
  })

  function handleClickKeyboard() {
    setShowShortcuts(!showShortcuts);
  }

  return (
    <div
      ref={ref}
      className="relative p-4 -mr-4 cursor-pointer"
      onClick={handleClickKeyboard}
    >
      <FaRegKeyboard id="keyboard-icon" className="h-6 w-6" />
      <ul
        className={classnames(
          "absolute bottom-8 right-[-1rem] menu menu-compact w-40 cursor-default py-3 border bg-base-100 rounded-box transition-opacity",
          {
            "opacity-0 pointer-events-none": !showShortcuts,
            "opacity-100": showShortcuts,
          }
        )}
      >
        <li>
          <div className="flex justify-between cursor-default px-3 py-1.5">
            <span>Previous</span>
            <kbd className="kbd kbd-sm">
              <IoArrowBack />
            </kbd>
          </div>
        </li>
        <li>
          <div className="flex justify-between cursor-default px-3 py-1.5">
            <span>Next</span>
            <kbd className="kbd kbd-sm">
              <IoArrowForward />
            </kbd>
          </div>
        </li>
        <li>
          <div className="flex justify-between cursor-default px-3 py-1.5">
            <span>Flip</span>
            <kbd className="kbd kbd-sm">Space</kbd>
          </div>
        </li>
      </ul>
    </div>
  );
}
