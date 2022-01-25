import React from "react";
import { Offline } from "react-detect-offline";
import { IoCloudOffline } from "react-icons/io5";

export default function OfflineBanner() {
  return (
    <Offline>
      <div className="w-full p-2 text-sm flex items-center justify-center bg-zinc-200">
        <IoCloudOffline className="w-5 h-5 ml-2 mr-2" />
        You are currently offline
      </div>
    </Offline>
  );
}
