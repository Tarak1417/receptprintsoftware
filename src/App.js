import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Sidebar from './Components/Sidebar';

// Pages
import DashboardPage from './Pages/Dashboard';
import ReceiptsPage from './Pages/Receipts';
import NewOrderPage from './Pages/NewOrder';
import MenuItemsPage from './Pages/MenuItems';
import CustomersPage from './Pages/Customers';
import ReportsPage from './Pages/Reports';
import SettingsPage from './Pages/Settings';
import PrintReceipt from './Pages/PrintReceipt';

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen app-bg">

        <Sidebar />

        <div className="flex-1 overflow-auto">
          <header className="p-4 border-b flex items-center justify-between bg-white">
            <div className="flex items-center gap-4">
              <button className="md:hidden">☰</button>
              <img src="/assets/pos-logo.png" className="h-8 hidden md:block" alt="logo" />
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full hover:bg-gray-100">🔄</button>
              <button className="p-2 rounded-full hover:bg-gray-100">⚙️</button>
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            </div>
          </header>

          <main className="p-4">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/receipts" element={<ReceiptsPage />} />
              <Route path="/new-order" element={<NewOrderPage />} />
              <Route path="/menu-items" element={<MenuItemsPage />} />
              <Route path="/customers" element={<CustomersPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/print" element={<PrintReceipt />} />
            </Routes>
          </main>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;
