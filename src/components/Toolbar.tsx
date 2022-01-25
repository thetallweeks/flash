import React, { useState, KeyboardEvent, SyntheticEvent } from "react";
import classnames from "classnames";
import { IoArrowBack, IoArrowForward, IoShuffle } from "react-icons/io5";
import Shortcuts from "./Shortcuts";
import useEventListener from "../hooks/useEventListener";

interface ToolbarProps {
  totalCount: number;
  currentIndex: number;
  next: () => void;
  previous: () => void;
  shuffle: () => void;
  className?: string;
}

export default function Toolbar({
  totalCount,
  currentIndex,
  next,
  previous,
  shuffle,
  className,
}: ToolbarProps) {
  function keyDownHandler(event: KeyboardEvent) {
    const { keyCode } = event;

    if (keyCode === 37) {
      // ArrowLeft
      previous();
    } else if (keyCode === 39) {
      // ArrowRight
      next();
    }
  }

  useEventListener("keydown", keyDownHandler, document);

  return (
    <div
      className={classnames(
        "flex items-center justify-between",
        className
      )}
    >
      <div className="p-4 -ml-4 cursor-pointer" onClick={shuffle}>
        <IoShuffle className="h-8 w-8" />
      </div>
      <div className="flex items-center">
        <IoArrowBack
          className={classnames("h-8 w-8 mr-4 cursor-pointer", {
            "pointer-events-none opacity-50": currentIndex === 0,
          })}
          onClick={previous}
        />
        <div className="text-center">
          {currentIndex + 1} / {totalCount}
        </div>
        <IoArrowForward
          onClick={next}
          className={classnames("h-8 w-8 ml-4 cursor-pointer", {
            "pointer-events-none opacity-50": currentIndex === totalCount - 1,
          })}
        />
      </div>
      <Shortcuts />
    </div>
  );
}
