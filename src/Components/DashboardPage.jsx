import React, { useEffect, useState } from "react";
import axios from "axios";
import TopCards from "./TopCards";
import SummaryPanel from "./SummaryPanel";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function DashboardPage() {
  const [dateTime, setDateTime] = useState(new Date());
  const [weather, setWeather] = useState(null);
  const [filter, setFilter] = useState("today");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const key = "YOUR_API_KEY"; 
        const city = "Hyderabad";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;

        const res = await axios.get(url);
        setWeather(res.data);
      } catch (err) {
        console.log("Weather error:", err);
      }
    };

    fetchWeather();
  }, []);

  const generateChartData = (type) => {
    switch (type) {
      case "today":
        return [
          { time: "9 AM", sales: 120 },
          { time: "12 PM", sales: 240 },
          { time: "3 PM", sales: 180 },
          { time: "6 PM", sales: 320 }
        ];
      case "yesterday":
        return [
          { time: "9 AM", sales: 90 },
          { time: "12 PM", sales: 150 },
          { time: "3 PM", sales: 210 },
          { time: "6 PM", sales: 280 }
        ];
      case "week":
        return [
          { time: "Mon", sales: 600 },
          { time: "Tue", sales: 800 },
          { time: "Wed", sales: 500 },
          { time: "Thu", sales: 900 },
          { time: "Fri", sales: 700 },
          { time: "Sat", sales: 1100 },
          { time: "Sun", sales: 950 }
        ];
      case "month":
        return [
          { time: "Week 1", sales: 3000 },
          { time: "Week 2", sales: 4200 },
          { time: "Week 3", sales: 3900 },
          { time: "Week 4", sales: 4500 }
        ];
      default:
        return [];
    }
  };

  
  useEffect(() => {
    setChartData(generateChartData(filter));
  }, [filter]);

  return (
    <div className="p-6 space-y-6">

     
      <div className="card p-6 bg-gradient-to-r from-pink-400 to-orange-400 text-white">
        <h2 className="text-xl font-semibold">Dashboard Overview</h2>

        <div className="flex justify-between mt-4 text-sm">
          <div>
            <p>Date {dateTime.toLocaleDateString()}</p>
            <p>Time {dateTime.toLocaleTimeString()}</p>
          </div>

         
          {weather && (
            <div className="flex items-center gap-2">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather"
                className="w-12"
              />
              <div>
                <p>{weather.name}</p>
                <p>{weather.main.temp}°C — {weather.weather[0].main}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <TopCards />

    
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
     
        <div className="lg:col-span-2 card p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Sales Graph</h3>

            <div className="flex gap-2">
              {["today", "yesterday", "week", "month"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded-md capitalize ${
                    filter === f
                      ? "bg-pink-500 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

        
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <Line type="monotone" dataKey="sales" stroke="#ef4444" strokeWidth={3} />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <SummaryPanel />
      </div>
    </div>
  );
}
