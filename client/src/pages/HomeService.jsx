// src/Pages/HomeService.jsx

import  { useState } from "react";
import Menubar from "../Components/Manubar";
import MenuToggle from "../Components/MenuToggle";
import Navbar from "../Components/Navbar";

const HomeService = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="flex">
      <div
        className={`w-1/4 h-auto bg-gray-200 text-gray-500 ${
          showMenu ? "" : "hidden"
        } lg:block`}
      >
        <Menubar />
      </div>
      <div className="w-3/4 h-screen">
        <Navbar pagename={"Home Service"} />
        <MenuToggle showMenu={showMenu} handleMenuToggle={handleMenuToggle} />
        <p>Home Service</p>
      </div>
    </div>
  );
};

export default HomeService;
