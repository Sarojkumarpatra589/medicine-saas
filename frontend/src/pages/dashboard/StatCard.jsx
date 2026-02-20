import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
} from "recharts";

const StatCard = ({
  icon,
  title,
  value,
  growth,
  positive,
  color,
  data,
  type,
}) => {

  const chartData = data.map((d, i) => ({
    name: i,
    value: d,
  }));

  const gradientId = `gradient-${title.replace(/\s+/g, "")}`;

  return (
    <div className="advanced-stat-card">

      <div className="stat-top">
        <div
          className="stat-icon"
          style={{ backgroundColor: `${color}20`, color }}
        >
          {icon}
        </div>

        <div className={`stat-growth ${positive ? "up" : "down"}`}>
          {growth}
        </div>
      </div>

      <div className="stat-body">
        <h6>{title}</h6>
        <h3>{value}</h3>
      </div>

      <div className="stat-chart">
        <ResponsiveContainer width="100%" height={70}>
          {type === "area" && (
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke={color}
                fill={`url(#${gradientId})`}
                strokeWidth={2}
              />
            </AreaChart>
          )}

          {type === "line" && (
            <LineChart data={chartData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          )}

          {type === "bar" && (
            <BarChart data={chartData}>
              <Bar
                dataKey="value"
                fill={color}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default StatCard;
