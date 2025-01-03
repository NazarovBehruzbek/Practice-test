import React, { useState } from "react";
import succesnot from "../assets/successgroup.png";
import warnnot from "../assets/warngroup.png";
import obshiy from "../assets/all.png";
import region from "../assets/region.png";
import serverinfo from "../assets/serverg.png";

const CollapsibleCard = ({ title, icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="bg-[#1F2937]/90 backdrop-blur-sm text-white mb-2 w-[300px]"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="flex items-center justify-between p-3 cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex items-center gap-2">
          {icon && (
            <div className="bg-[#384256] p-1.5 rounded">
              <img src={icon} alt="Icon" />
            </div>
          )}
          <span className="text-sm">{title}</span>
        </div>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {isOpen && <div className="p-3 pt-0">{children}</div>}
    </div>
  );
};

const NotificationCard = () => (
  <div onClick={(e) => e.stopPropagation()}>
    <div className="bg-[#1F2937]/90 backdrop-blur-sm p-3 text-white  w-[300px] h-[100px] border-1 rounded-md">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-2">
          <div>
            <img src={succesnot} alt="success" />
          </div>
          <div className="w-[250px] text-xl">
            <div className="text-xs font-medium">Предупреждение!</div>
            <div className="text-[11px] text-gray-400 mt-0.5">
              Server Tashkent Wiyon
            </div>
            <div className="flex justify-between">
              <div className="text-[11px] text-gray-400">
                IP address: 192.168.1.220
              </div>
              <div className="text-[11px] text-gray-400 ">06.01.2024</div>
            </div>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>

    <div className="bg-[#1F2937]/90 backdrop-blur-sm p-3 mt-2 text-white  w-[300px] h-[100px] border-1 rounded-md">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-2">
          <div>
            <img src={warnnot} alt="warn" />
          </div>
          <div className="w-[250px] text-xl">
            <div className="text-xs font-medium">Предупреждение!</div>
            <div className="text-[11px] text-gray-400 mt-0.5">
              Server Tashkent Wiyon
            </div>
            <div className="flex justify-between">
              <div className="text-[11px] text-gray-400">
                IP address: 192.168.1.220
              </div>
              <div className="text-[11px] text-gray-400 ">06.01.2024</div>
            </div>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
);

const ServerInfo = () => {
  const statusData = [
    {
      label: "Virtual Server",
      color: "bg-[#00C48C]",
      online: "3",
      offline: "2",
    },
    { label: "Database", color: "bg-[#00C48C]", online: "2", offline: "2" },
    { label: "Host", color: "bg-[#FF3D3D]", online: "0", offline: "4" },
  ];

  const serverDetails = {
    "Host name": "Server Tashkent Wiyon",
    "Model name": "Free space on Database [HDD] (percentage)",
    "Device Type": "-",
    Value: "96.9795452426555 %",
    "IP Address": "192.168.1.220",
    Port: "80/80",
    Status: "Online",
  };

  const regionData = {
    Region: "Tashkent",
    "Total Servers": "12",
    Active: "8",
    Inactive: "4",
  };

  return (
    <div
      className="absolute top-4 right-4 flex-1 p-2"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex gap-2">
        <NotificationCard />
        <div className="space-y-2">
          <CollapsibleCard title="Общий обзор" icon={obshiy}>
            {statusData.map((item, index) => (
              <div
                key={index}
                className="items-center justify-between text-xs py-1"
              >
                <div className="flex items-center text-[18px] gap-2 p-2 rounded-md bg-gray-700 mb-2">
                  <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                  <span>{item.label}</span>
                </div>
                <div className="flex items-center gap-1 justify-center">
                  <div className="text-gray-400 border w-[45%] rounded-xl p-1 px-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <div
                          className={`w-2 h-2 rounded-full bg-[#7FC601]`}
                        ></div>{" "}
                        Online
                      </div>
                      <span>{item.online}</span>
                    </div>
                  </div>
                  <div className="text-gray-400 border w-[45%] rounded-xl p-1 px-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <div
                          className={`w-2 h-2 rounded-full bg-red-600`}
                        ></div>{" "}
                        Offline
                      </div>
                      <span>{item.offline}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CollapsibleCard>

          <CollapsibleCard title="Регион" icon={region}>
            {Object.entries(regionData).map(([key, value], index) => (
              <div key={index} className="flex justify-between text-xs py-1">
                <span className="text-gray-400">{key}:</span>
                <span>{value}</span>
              </div>
            ))}
          </CollapsibleCard>

          <CollapsibleCard title="Server name" icon={serverinfo}>
            {Object.entries(serverDetails).map(([key, value], index) => (
              <div key={index} className="flex justify-between text-xs py-1">
                <span className="text-gray-400">{key}:</span>
                <span className="text-right">{value}</span>
              </div>
            ))}
          </CollapsibleCard>
        </div>
      </div>
    </div>
  );
};

export default ServerInfo;
