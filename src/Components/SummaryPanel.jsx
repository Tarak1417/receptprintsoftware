import React, { useEffect, useState } from "react";

function SummaryPanel() {
  const [receipts, setReceipts] = useState([]);
  const [filter, setFilter] = useState("today");
  const [filteredReceipts, setFilteredReceipts] = useState([]);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  // -------------------------
  // Fetch receipts from API
  // -------------------------
  const fetchReceipts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders");
      const data = await res.json();

      // IMPORTANT: Adjust according to your API response format
      // Assuming it returns an array of orders
      setReceipts(data);
    } catch (error) {
      console.error("Error fetching receipts:", error);
    }
  };

  // Fetch on component mount
  useEffect(() => {
    fetchReceipts();
  }, []);

  // -------------------------
  // Apply Date Filter
  // -------------------------
  const applyFilter = () => {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    const filtered = receipts.filter((r) => {
      const d = new Date(r.date);

      if (filter === "today") return d >= startOfToday;
      if (filter === "week") return d >= startOfWeek;
      if (filter === "month") return d >= startOfMonth;
      if (filter === "year") return d >= startOfYear;
      return true;
    });

    setFilteredReceipts(filtered);
  };

  // Reapply filter whenever filter changes OR receipts change
  useEffect(() => {
    applyFilter();
  }, [filter, receipts]);


  return (
    <div className="card p-6 shadow-lg rounded-xl bg-white">
      {/* Header */}
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold">Receipt Summary</h3>

        {/* Filter Dropdown */}
        <select
          className="border px-2 py-1 rounded text-sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {/* Receipt List */}
      <div className="mt-4">
        <h4 className="text-sm font-semibold mb-2 text-gray-700">Receipts</h4>

        {filteredReceipts.length === 0 ? (
          <p className="text-gray-500 text-sm">No receipts found.</p>
        ) : (
          <ul className="divide-y border rounded-lg">
            {filteredReceipts.map((r) => (
              <li
                key={r._id}  // use _id from MongoDB
                onClick={() => setSelectedReceipt(r)}
                className="p-3 hover:bg-gray-100 cursor-pointer flex justify-between"
              >
                <div>
                  <div className="font-semibold">Receipt #{r._id.slice(-5)}</div>
                  <div className="text-xs text-gray-500">{r.date}</div>
                </div>
                <div className="font-semibold">₹{r.total}</div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Selected Receipt Details */}
      {selectedReceipt && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
          <h4 className="text-md font-semibold mb-2">Receipt Details</h4>

          <p><strong>ID:</strong> {selectedReceipt._id}</p>
          <p><strong>Date:</strong> {selectedReceipt.date}</p>
          <p><strong>Payment Type:</strong> {selectedReceipt.paymentType}</p>
          <p><strong>Total Amount:</strong> ₹{selectedReceipt.total}</p>

          <h5 className="mt-3 font-semibold">Items:</h5>
          <ul className="list-disc ml-6 text-sm">
            {selectedReceipt.items?.map((item, index) => (
              <li key={index}>
                {item.name} — ₹{item.price} × {item.qty}
              </li>
            ))}
          </ul>

          <button
            onClick={() => setSelectedReceipt(null)}
            className="mt-4 bg-red-500 text-white px-3 py-1 rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default SummaryPanel;
