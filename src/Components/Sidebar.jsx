import React, { useState } from "react";
import user from "../assets/User.png";
import vector from "../assets/Vector.png";
import chart from "../assets/Chart.png";
import setting from "../assets/settings.png";
function Sidebar({ onIconSelect }) {
  const [activeTab, setActiveTab] = useState("server");

  const handleIconSelect = (id) => {
    setActiveTab(id);
    onIconSelect(id);
  };

  const menuItems = [
    {
      id: "server",
      title: "Server",
      icon: user,
    },
    {
      id: "database",
      title: "Database",
      icon: vector,
    },
    {
      id: "chart",
      title: "Network",
      icon: chart,
    },
    {
      id: "settings",
      title: "Settings",
      icon: setting,
    },
  ];

  return (
    <div className="bg-[#2a3447] w-[50px] flex flex-col items-center py-4 gap-4">
      {menuItems.map((item) => (
        <div
          key={item.id}
          className={`p-2 rounded-lg cursor-pointer transition-all duration-200 ${
            activeTab === item.id ? "bg-[#384256]" : "hover:bg-[#384256]"
          }`}
          onClick={() => handleIconSelect(item.id)}
        >
          <div className="text-white">
            <img src={item.icon} alt="Icon" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
