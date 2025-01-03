import React from "react";

const MultiProgressCircle = ({ title, subtitle, percentage, colors }) => {
  return (
    <div className="flex  items-center">
      <div className="relative w-16 h-16">
        <svg className="absolute inset-0" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r="15.9155"
            fill="none"
            stroke={colors.bg}
            strokeWidth="2"
          />
          <circle
            cx="18"
            cy="18"
            r="15.9155"
            fill="none"
            stroke={colors.fg}
            strokeWidth="2"
            strokeDasharray={`${percentage}, 100`}
            strokeDashoffset="0"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-white">{percentage}%</span>
        </div>
      </div>
      <div className="ml-4">
        <p className="mt-2 text-sm font-semibold text-white">{title}</p>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>
    </div>
  );
};

const ProgressBars = () => {
  const data = [
    {
      percentage: 27,
      colors: { fg: "#e53e3e", bg: "#2d3748" },
      subtitle: "Название сервера",
    },
    {
      percentage: 15,
      colors: { fg: "#3182ce", bg: "#2d3748" },
      title: "Исправление",
      subtitle: "Самаркандской области",
    },
    {
      percentage: 15,
      colors: { fg: "#38a169", bg: "#2d3748" },
      title: "Обработка",
      subtitle: "Самаркандской области",
    },
  ];

  return (
    <div className="flex justify-around bg-gray-800 text-white p-4 m-2 rounded-lg w-[54%]">
      {data.map((item, index) => (
        <MultiProgressCircle
          key={index}
          title={item.title}
          subtitle={item.subtitle}
          percentage={item.percentage}
          colors={item.colors}
        />
      ))}
    </div>
  );
};

export default ProgressBars;
