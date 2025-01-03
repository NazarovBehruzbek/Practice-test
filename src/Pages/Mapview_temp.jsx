  const handlePointClick = (e, point) => {
    e.stopPropagation();

    if (selectedPoint?.id === point.id) {
      resetView();
      return;
    }

    setSelectedPoint(point);
    const newCircularPoints = createCircularPoints(point);
    setCircularPoints(newCircularPoints);
    setActiveConnections([]); 

    const zoomScale = 1.3;
    const imageWidth = 800;
    const imageHeight = 600;
    
    const newX = -(point.x / 100 * imageWidth * zoomScale - window.innerWidth / 2);
    const newY = -(point.y / 100 * imageHeight * zoomScale - window.innerHeight / 2);
    
    setScale(zoomScale);
    setPosition({ x: newX, y: newY });
  };
