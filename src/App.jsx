import React, { useState } from "react";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Mapview from "./Pages/Mapview";
import Diagram from "./Pages/Diagram";

function App() {
  const [showDiagram, setShowDiagram] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState("server");

  const handleMapClick = (e) => {
    if (e.target.closest(".diagram-container")) return;
    setShowDiagram(false);
  };

  return (
    <div className=" bg-[#151c2c]">
      <Header />
      <div className="flex">
        <Sidebar onIconSelect={setSelectedIcon} />
        <div className="relative w-full" onClick={handleMapClick}>
          <Mapview
            onPointClick={(point) => {
              setSelectedPoint(point);
              setShowDiagram(true);
            }}
          />

          {showDiagram && (
            <div className="absolute inset-0 bg-[#151c2c]/80">
              <div className="diagram-container">
                <Diagram position={selectedPoint} selectedIcon={selectedIcon} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
