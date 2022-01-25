import React from "react";
import { Link } from "wouter";
import { IoFlashOutline, IoPersonCircle } from "react-icons/io5";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
  return (
    <nav className="bg-white border-b border-gray-200 w-full flex relative justify-between items-center mx-auto px-6 h-16">
      <div className="inline-flex">
        <Link className="cursor-pointer" href="/">
          <a>
            <div className="flex items-center">
              <IoFlashOutline className="w-8 h-8 mr-2 text-primary" />
              <h1 className="text-2xl">Flash</h1>
            </div>
          </a>
        </Link>
      </div>

      <div className="flex-initial">
        <div className="flex justify-end items-center relative">
          <div className="block mr-4">
            <ThemeSwitcher />
          </div>
          <div className="block">
            <div className="block flex-grow-0 flex-shrink-0 h-8 w-8">
              <IoPersonCircle className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
