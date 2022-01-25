import React from "react";

const style = {
  verticalAlign: "-0.125em",
  borderWidth: "0.25em",
  borderStyle: "solid",
  borderRightColor: "transparent",
};

export default function Loading() {
  return (
    <div className="flex justify-center items-center">
      <div
        className="animate-spin inline-block w-16 h-16 border-4 border-secondary rounded-full"
        style={style}
        role="status"
      >
        <span className="invisible">Loading...</span>
      </div>
    </div>
  );
}
