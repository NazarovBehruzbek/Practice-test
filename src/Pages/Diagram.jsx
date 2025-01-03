import React from "react";
import serverImg from "../assets/server.png";
const ConnectionLine = ({ startX, startY, endX, endY, color }) => {
  return (
    <svg
      className="absolute inset-0"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <line
        x1={`${startX}%`}
        y1={`${startY}%`}
        x2={`${endX}%`}
        y2={`${endY}%`}
        stroke={color}
        strokeWidth="1"
        opacity="1"
        className="animate-draw"
      />
      <circle
        cx={`${startX}%`}
        cy={`${startY}%`}
        r="3"
        fill={color}
        opacity="0.8"
        className="animate-moveAlongLine"
      >
        <animate
          attributeName="cx"
          from={`${startX}%`}
          to={`${endX}%`}
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="cy"
          from={`${startY}%`}
          to={`${endY}%`}
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};

const Diagram = ({ position }) => {
  const cloudDBNodes = [
    { label: "CloudDB 1", top: "10%", left: "10%", color: "#79292C" },
    { label: "CloudDB 2", top: "30%", left: "-5%", color: "#79292C" },
    { label: "CloudDB 3", top: "50%", left: "-8%", color: "#79292C" },
    { label: "CloudDB 4", top: "70%", left: "-3%", color: "#79292C" },
    { label: "CloudDB 5", top: "85%", left: "10%", color: "#79292C" },
  ];

  const extremeNodes = [
    { label: "Extreme 2", top: "0%", left: "40%", color: "#10BDAE" },
    { label: "Extreme 2", top: "10%", left: "70%", color: "#10BDAE" },
    { label: "Extreme 2", top: "30%", left: "86%", color: "#FFB718" },
    { label: "Extreme 2", top: "53%", left: "90%", color: "#10BDAE" },
    { label: "Extreme 2", top: "75%", left: "80%", color: "#10BDAE" },
    { label: "Extreme 2", top: "91%", left: "62%", color: "#10BDAE" },
    { label: "Extreme 2", top: "96%", left: "35%", color: "#10BDAE" },
  ];

  const getNumericPosition = (pos) => parseFloat(pos);

  const getIconComponent = () => {
    return <img src={serverImg} alt="Server" className="w-8 h-8 m-auto z-10" />;
  };

  return (
    <div
      className="absolute diagram-animate"
      style={{
        top: position ? `${position.screenY - 254}px` : "50%",
        left: position ? `${position.screenX + -215}px` : "50%",
        zIndex: 20,
      }}
    >
      <div className="relative w-[350px] h-[350px]">
        {cloudDBNodes.map((node, i) => (
          <ConnectionLine
            key={`cloud-line-${i}`}
            startX={50}
            startY={50}
            endX={getNumericPosition(node.left) + 8}
            endY={getNumericPosition(node.top) + 3}
            color={node.color}
          />
        ))}
        {extremeNodes.map((node, i) => (
          <ConnectionLine
            key={`extreme-line-${i}`}
            startX={50}
            startY={50}
            endX={getNumericPosition(node.left) + 11}
            endY={getNumericPosition(node.top) + 5 / 2}
            color={node.color}
          />
        ))}
        <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {getIconComponent()}
          <div className="bg-[#79292C] mt-4 text-white text-xs px-3 py-1 rounded text-center shadow-[0_0px_6px_white]">
            Server Name
          </div>
        </div>
        {cloudDBNodes.map((node, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              top: `${node.top}`,
              left: `${node.left}`,
              transform: "translate(-50%, -50%)",
              opacity: 0,
              animation: `fadeIn 0.5s ease-out ${i * 0.1 + 0.5}s forwards`,
            }}
          >
            <div className="flex flex-col items-center">
              <div
                className="w-4 h-4 rounded-full mb-1"
                style={{
                  backgroundColor: node.color,
                  filter: `drop-shadow(0 0 6px ${node.color})`,
                }}
              />
              <div className="bg-[#79292C] text-white text-[10px] px-2 py-1 rounded text-center shadow-[0_0px_6px_white]">
                {node.label}
              </div>
            </div>
          </div>
        ))}
        {extremeNodes.map((node, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              top: `${node.top}`,
              left: `${node.left}`,
              transform: "translate(-50%, -50%)",
              opacity: 0,
              animation: `fadeIn 0.5s ease-out ${i * 0.1 + 0.5}s forwards`,
            }}
          >
            <div className="flex flex-col items-center">
              <div
                className="w-4 h-4 rounded-full mb-1"
                style={{
                  backgroundColor: node.color,
                  filter: `drop-shadow(0 0 6px ${node.color})`,
                }}
              />
              <div className="bg-[#2B3F44] text-white text-[10px] px-2 w-[80px] py-1 rounded text-center shadow-[0_0px_6px_white]">
                {node.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Diagram;
