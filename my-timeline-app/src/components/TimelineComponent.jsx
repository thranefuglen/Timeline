import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';

const TimelineComponent = () => {
  const [zoom, setZoom] = useState(1); // 0.5 = years, 1 = months, 2 = days
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  
  // Sample events - expand with more details
  const events = [
    {
      date: new Date('2024-11-15'),
      name: 'My event',
      details: 'This is a detailed description of my first event. It includes important information that will be shown on hover.'
    },
    {
      date: new Date('2025-03-01'),
      name: 'My other event',
      details: 'Details about the second event. This could include location, participants, or other relevant information.'
    },
    {
      date: new Date('2025-06-15'),
      name: 'Future event',
      details: 'Planning ahead with this future event. More details to come.'
    }
  ];

  // Update container width on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Calculate date range and scale
  const minDate = new Date(Math.min(...events.map(e => e.date)));
  const maxDate = new Date(Math.max(...events.map(e => e.date)));
  
  // Add padding to date range
  minDate.setMonth(minDate.getMonth() - 2);
  maxDate.setMonth(maxDate.getMonth() + 2);

  // Generate time markers based on zoom level
  const getTimeMarkers = () => {
    const markers = [];
    const current = new Date(minDate);
    
    while (current <= maxDate) {
      let label = '';
      if (zoom < 0.7) {
        // Year view
        label = current.getFullYear().toString();
        current.setFullYear(current.getFullYear() + 1);
      } else if (zoom < 1.5) {
        // Month view
        label = current.toLocaleString('default', { month: 'short' });
        current.setMonth(current.getMonth() + 1);
      } else {
        // Day view
        label = current.getDate().toString();
        current.setDate(current.getDate() + 7); // Weekly intervals
      }
      
      markers.push({
        date: new Date(current),
        label
      });
    }
    
    return markers;
  };

  // Calculate position on timeline
  const getPosition = (date) => {
    const totalTime = maxDate - minDate;
    const position = date - minDate;
    return (position / totalTime) * 100;
  };

  const markers = getTimeMarkers();

  return (
    <div className="w-full p-4" ref={containerRef}>
      {/* Zoom controls */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setZoom(prev => Math.max(0.5, prev - 0.5))}
          className="p-2 rounded bg-gray-100 hover:bg-gray-200"
        >
          <ZoomOut size={20} />
        </button>
        <button
          onClick={() => setZoom(prev => Math.min(2, prev + 0.5))}
          className="p-2 rounded bg-gray-100 hover:bg-gray-200"
        >
          <ZoomIn size={20} />
        </button>
      </div>

      {/* Timeline container */}
      <div className="relative w-full h-64">
        {/* Main horizontal line */}
        <div className="absolute top-8 w-full h-0.5 bg-gray-300" />
        
        {/* Time markers */}
        {markers.map((marker, index) => (
          <div
            key={index}
            className="absolute top-0"
            style={{ left: `${getPosition(marker.date)}%` }}
          >
            <div className="relative -translate-x-1/2">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-500 mb-2" />
              <span className="text-xs text-gray-600">{marker.label}</span>
            </div>
          </div>
        ))}

        {/* Events */}
        {events.map((event, index) => (
          <div
            key={index}
            className="absolute flex flex-col items-center group"
            style={{ left: `${getPosition(event.date)}%`, top: '1.5rem' }}
          >
            {/* Event dot */}
            <div className="w-3 h-3 rounded-full bg-red-500" />
            
            {/* Dashed line */}
            <div className="h-12 border-l-2 border-dashed border-green-600" />
            
            {/* Event label and hover details */}
            <div className="relative">
              <div className="bg-green-600 text-white px-4 py-2 rounded-md whitespace-nowrap">
                {event.name}
              </div>
              
              {/* Hover details */}
              <div className="absolute bottom-full mb-2 bg-white border border-gray-200 rounded-lg p-4 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-normal w-64 z-10">
                <p className="text-sm text-gray-700">{event.details}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {event.date.toLocaleDateString('default', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineComponent;