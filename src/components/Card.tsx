import React, { KeyboardEvent, useState, useEffect } from "react";
import classnames from "classnames";
import useEventListener from "../hooks/useEventListener";

interface CardProps {
  front?: string;
  back?: string;
  side?: "front" | "back";
  flippable?: boolean;
  className?: string;
}

export default function Card({
  front = "",
  back = "",
  side,
  flippable = true,
  className,
}: CardProps) {
  const [showFront, setShowFront] = useState(true);

  useEffect(() => {
    if (side === "front" && !showFront) {
      setShowFront(true);
    } else if (side === "back" && showFront) {
      setShowFront(false);
    }
  }, [side])

  function handler(event: KeyboardEvent) {
    const { keyCode } = event;
    if (flippable) {
      if ([32, 38, 40].includes(keyCode)) {
        // Space, ArrowUp, or ArrowDown
        setShowFront(!showFront);
      }
    }
  }

  useEventListener("keydown", handler, document);

  const onClick = () => {
    if (flippable) {
      setShowFront(!showFront);
    }
  };

  return (
    <div
      onClick={onClick}
      className={classnames("flip w-full h-full cursor-pointer", className, {
        flipped: !showFront,
      })}
    >
      <div className="flip-inner relative w-full h-full flex items-center justify-center bg-white rounded-xl shadow-md-c text-3xl">
        <div className="flip-front absolute left-4 right-4 text-center bg-white">{front}</div>
        <div className="flip-back absolute left-4 right-4 text-center bg-white">{back}</div>
      </div>
    </div>
  );
}
