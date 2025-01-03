import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import mapscart from "../assets/uz.svg";
import ProgressCount from "./Progrescount";
import ProgressBars from "./ProgressBars";
import ServerInfo from "./ServerInfo";


const MapPoint = ({ x, y, color = "#0018A8", isSelected, hasActiveConnection, onClick }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onClick(e);
  };

  return (
    <div
      className={`absolute w-2 h-2 transform -translate-x-1/2 -translate-y-1/2 ${isSelected ? 'selected' : ''} ${hasActiveConnection ? 'active' : ''}`}
      style={{ 
        left: `${x}%`, 
        top: `${y}%`,
        zIndex: 20,
      }}
      onClick={handleClick}
    >
      <div 
        className="w-full h-full rounded-full"
        style={{
          backgroundColor: color,
          boxShadow: `0 0 0 2px white, 0 0 0 4px ${color}`,
          cursor: 'pointer'
        }}
      />
    </div>
  );
};

const ConnectionLine = ({ startX, startY, endX, endY, color = "#0018A8" }) => {
  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2 - 15;

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 30,
        pointerEvents: 'none',
        overflow: 'visible'
      }}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path
        d={`M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`}
        stroke={color}
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        opacity="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};

function Mapview({ onPointClick }) {
  const [position, setPosition] = useState({ x: -70, y: 50 });
  const [scale, setScale] = useState(0.80);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [showProgressBars, setShowProgressBars] = useState(false);
  const containerRef = React.useRef(null);

  const points = [
    { id: 1, x: 25, y: 20, label: 'Point 1' }, 
    { id: 2, x: 37, y: 51, label: 'Point 2' }, 
    { id: 3, x: 65, y: 52, label: 'Point 3' }, 
    { id: 4, x: 49, y: 37, label: 'Point 4' }, 
    { id: 5, x: 45, y: 62, label: 'Point 5' }, 
    { id: 6, x: 55, y: 79, color: "#FF0000", label: 'Point 6' }, 
    { id: 7, x: 57, y: 67, label: 'Point 7' }, 
    { id: 8, x: 60, y: 60, label: 'Point 8' }, 
    { id: 9, x: 61, y: 86, label: 'Point 9' }, 
    { id: 10, x: 64, y: 61, label: 'Point 10' }, 
    { id: 11, x: 68, y: 56, label: 'Point 11' }, 
    { id: 12, x: 73, y: 55, label: 'Point 12' }, 
    { id: 13, x: 72, y: 62, label: 'Point 13' }, 
    { id: 14, x: 77, y: 58.5, label: 'Point 14' }, 
  ];

  const defaultConnections = [
    { from: points[2], to: points[0] }, 
    { from: points[2], to: points[1] }, 
    { from: points[2], to: points[3] },
    { from: points[2], to: points[4] },  
    { from: points[2], to: points[5], color: "#FF0000" }, 
    { from: points[2], to: points[6] },
    { from: points[2], to: points[7] },    
    { from: points[2], to: points[8] },   
    { from: points[2], to: points[9] },
    { from: points[2], to: points[10] },    
    { from: points[2], to: points[11] },   
    { from: points[2], to: points[12] },    
    { from: points[2], to: points[13] },   
  ];

  const handlePointClick = (e, point) => {
    e.stopPropagation();
    setSelectedPoint(point);
    setShowProgressBars(true);
    
    const pointElement = e.currentTarget;
    const rect = pointElement.getBoundingClientRect();
    
    if (onPointClick) {
      onPointClick({
        screenX: rect.left,
        screenY: rect.top + window.scrollY
      });
    }
  };

  const handleMapClick = (e) => {
    if (!e.target.closest('.point-marker')) {
      setSelectedPoint(null);
      setShowProgressBars(false);
      if (onPointClick) {
        onPointClick({
          screenX: null,
          screenY: null,
          closing: true
        });
      }
    }
  };

  const handleMouseDown = (e) => {
    if (e.target.closest('.point-marker')) {
      return;
    }
    if (e.button === 0) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const zoomFactor = 0.1;
    const delta = e.deltaY > 0 ? -zoomFactor : zoomFactor;
    const newScale = Math.max(0.5, Math.min(2, scale + delta));
    setScale(newScale);
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  useEffect(() => {
    // If diagram is closed externally, reset our state
    if (!selectedPoint) {
      setShowProgressBars(false);
    }
  }, [selectedPoint]);

  return (
    <div className="bg-[#151c2c] flex-1 p-2 h-[89vh]">
      <div
        ref={containerRef}
        className="bg-[#2a3447] h-[88vh] rounded-lg overflow-hidden relative cursor-move map-container"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleMapClick}
      >
        <motion.div
          className="w-full h-full relative"
          animate={{
            scale: scale,
            x: position.x,
            y: position.y,
          }}
          transition={{
            type: "tween",
            duration: isDragging ? 0 : 0.3,
          }}
        >
          <img
            src={mapscart}
            alt="Map"
            className="w-full h-full object-contain"
            draggable={false}
          />
          <div className="absolute inset-0">
            {!selectedPoint && defaultConnections.map((connection, index) => (
              <ConnectionLine
                key={`default-${index}`}
                startX={connection.from.x}
                startY={connection.from.y}
                endX={connection.to.x}
                endY={connection.to.y}
                color={connection.color || "#0018A8"}
              />
            ))}
            {selectedPoint && defaultConnections.map((connection, index) => (
              <ConnectionLine
                key={`active-${index}`}
                startX={connection.from.x}
                startY={connection.from.y}
                endX={connection.to.x}
                endY={connection.to.y}
                color={connection.color || "#0018A8"}
              />
            ))}
            {points.map((point) => (
              <div 
                key={point.id}
                className="relative point-marker"
                style={{
                  position: 'absolute',
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <MapPoint 
                  x={point.x} 
                  y={point.y} 
                  color={point.color} 
                  isSelected={selectedPoint === point} 
                  hasActiveConnection={defaultConnections.some(connection => connection.from === point || connection.to === point)} 
                  onClick={(e) => handlePointClick(e, point)}
                />
              </div>
            ))}
          </div>
        </motion.div>
        <div className="absolute top-0 left-0 right-0 flex z-30">
          {showProgressBars ? <ProgressBars /> : <ProgressCount />}
          <ServerInfo/>
        </div>
        <div className="absolute bottom-4 left-4 flex flex-col gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); handleZoomIn(); }}
            className="w-10 h-10 bg-[#151c2c] text-white rounded-lg flex items-center justify-center hover:bg-[#1f2937] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleZoomOut(); }}
            className="w-10 h-10 bg-[#151c2c] text-white rounded-lg flex items-center justify-center hover:bg-[#1f2937] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 12H4"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Mapview;
