import React, { useState, useEffect } from "react";
import axios from "axios";

export default function NewOrder() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const API = "http://localhost:5000/api/orders";

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  const fetchOrders = () => {
    const url =
      filter === "all" ? API : `${API}/filter?type=${filter}`;

    axios
      .get(url)
      .then((res) => setOrders(res.data))
      .catch((err) => console.log("Fetch error:", err));
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Order Reports</h2>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-4">
        {["all", "weekly", "monthly", "yearly"].map((f) => (
          <button
            key={f}
            className={`px-4 py-1 rounded-lg border ${
              filter === f ? "bg-black text-white" : ""
            }`}
            onClick={() => setFilter(f)}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="overflow-auto shadow-lg rounded-lg">
          <table className="w-full border text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">#</th>
                <th className="p-2 border">Date & Time</th>
                <th className="p-2 border">Customer</th>
                <th className="p-2 border">Payment</th>
                <th className="p-2 border">Total</th>
                <th className="p-2 border">Items</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id} className="text-center">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">
                    {new Date(order.date).toLocaleString()}
                  </td>
                  <td className="p-2 border">{order.customer?.name || "Walk-in"}</td>
                  <td className="p-2 border">{order.payment?.method}</td>
                  <td className="p-2 border font-semibold">₹{order.totals?.grandTotal}</td>
                  <td className="p-2 border">{order.items?.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
