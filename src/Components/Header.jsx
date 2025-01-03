import React from "react";
import logo from "../assets/logo.png";
import notificatin from "../assets/notification.png";
import userimg from "../assets/div.png";
import apps from "../assets/apps.png";
import refresh from "../assets/refresh.png";

function Header() {
  return (
    <header className="bg-[#1e2533] text-white p-4 flex justify-between items-center pl-14">
      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="w-[55px] h-[55px]" />
        <p className="text-[15px] font-semibold w-[300px] leading-tight">
          O'zbekistonton Respublikasi ichki ishlar vazirligining "Xavfsiz
          shahar" tizimlarini rivojlantirish markazi
        </p>
      </div>
      <div className="flex items-center">
        <div className="flex items-center gap-2 px-4">
          <img src={userimg} alt="User" className="w-8 h-8" />
          <div className="text-sm">
            <div>Nazarov Behruz</div>
          </div>
        </div>
        <div className="h-6 w-[1px] bg-gray-600 mx-4"></div>
        <select className="bg-[#2a3447] px-3 py-1 rounded text-sm">
          <option>RU</option>
          <option>UZ</option>
          <option>EN</option>
        </select>
        <div className="h-6 w-[1px] bg-gray-600 mx-4"></div>
        <div className="flex items-center gap-4">
          <button className="p-2">
            <img src={refresh} alt="Refresh" className="w-6 h-6" />
          </button>
          <div className="h-6 w-[1px] bg-gray-600"></div>
          <button className="p-2">
            <img src={apps} alt="Apps" className="w-6 h-6" />
          </button>
          <div className="h-6 w-[1px] bg-gray-600"></div>
          <button className="p-2">
            <img src={notificatin} alt="Notifications" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
