import { NavLink } from "react-router-dom";
import React from "react";

export const Header = () => {
  return (
    <>
      <header>
        <nav>
          <h1 className="p-4">svargasc | Books</h1>
          <hr />
          <ul className="flex w-[100%] justify-between p-4">
            <li>
              <h2 className="text-3xl">Books available</h2>
            </li>
            <li>
              <button className="bg-[#6a5f6a]"><NavLink to="/car" className="text-[#dddadd]">Go to shopping cart</NavLink></button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
