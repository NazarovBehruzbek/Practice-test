import React from "react";

const MultiProgressCircle = ({ title, subtitle, completed, total, colors }) => {
  const percentage = (completed / total) * 100;

  return (
    <div className="relative flex items-center">
      <div className="relative w-20 h-20">
        <svg className="absolute inset-0" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r="15.9155"
            fill="none"
            stroke="#3182ce"
            strokeWidth="4"
          />
          <circle
            cx="18"
            cy="18"
            r="15.9155"
            fill="none"
            stroke={colors.fg}
            strokeWidth="4"
            strokeDasharray={`${percentage + 15}, 100`}
            strokeDashoffset="0"
            strokeLinecap="round"
          />
        </svg>
        <div
          className="absolute flex items-center justify-center w-6 h-6 text-xs font-bold text-[#3182ce] bg-white rounded-full"
          style={{ top: "5%", left: "70%" }}
        >
          {completed}
        </div>
        <div
          className="absolute flex items-center justify-center w-6 h-6 text-xs font-bold text-[#e53e3e] bg-white rounded-full"
          style={{ top: "75%", right: "55%" }}
        >
          {total}
        </div>
      </div>
      <div className="ml-4">
        <p className="mt-2 text-sm font-semibold text-white">{title}</p>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>
    </div>
  );
};

const ProgressCount = () => {
  const data = [
    {
      completed: 32,
      total: 68,
      colors: { fg: "#e53e3e", bg: "#2d3748" },
      title: "Угроза",
      subtitle: "Название сервера",
    },
    {
      completed: 32,
      total: 68,
      colors: { fg: "#e53e3e", bg: "#2d3748" },
      title: "Исправление",
      subtitle: "Самаркандской области",
    },
    {
      completed: 32,
      total: 68,
      colors: { fg: "#e53e3e", bg: "#2d3748" },
      subtitle: "Самаркандской области",
    },
  ];

  return (
    <div className="flex justify-around bg-gray-800 text-white w-[54%] py-3 m-3 rounded-lg">
      {data.map((item, index) => (
        <MultiProgressCircle
          key={index}
          title={item.title}
          subtitle={item.subtitle}
          completed={item.completed}
          total={item.total}
          colors={item.colors}
        />
      ))}
    </div>
  );
};

export default ProgressCount;
