import React, { useState, useRef, ReactNode } from "react";
import classnames from "classnames";
import { IoEllipsisVertical } from "react-icons/io5";
import useOnClickOutside from "../hooks/useOnClickOutside";

interface MoreMenuProps {
  children?: ReactNode;
}

export default function MoreMenu({ children }: MoreMenuProps) {
  const ref = useRef(null);
  const [showMenu, setShowMenu] = useState(false);

  useOnClickOutside(ref, () => {
    setShowMenu(false);
  });

  function handleClickIcon() {
    setShowMenu(!showMenu);
  }

  return (
    <div
      ref={ref}
      className="relative px-4 -mr-4 cursor-pointer"
      onClick={handleClickIcon}
    >
      <IoEllipsisVertical id="more-icon" className="h-6 w-6" />
      <div className="absolute top-8 right-[-1rem] z-10">
        <ul
          className={classnames(
            "menu menu-compact w-40 cursor-default border bg-base-100 rounded-box transition-opacity",
            {
              "opacity-0 pointer-events-none": !showMenu,
              "opacity-100": showMenu,
            }
          )}
        >
          {children}
        </ul>
      </div>
    </div>
  );
}
