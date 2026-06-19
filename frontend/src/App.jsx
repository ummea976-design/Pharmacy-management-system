import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Layout from './components/Layout';
import OverviewDashboard from './pages/OverviewDashboard';
import ProductCatalog from './pages/ProductCatalog';
import StockManagement from './pages/StockManagement';
import SupplierManagement from './pages/SupplierManagement';
import POS from './pages/POS';
import SalesHistory from './pages/SalesHistory';
import StockAlerts from './pages/StockAlerts';
import AnalyticsReports from './pages/AnalyticsReports';
import Customer from './pages/Customer';
import SystemSettings from './pages/SystemSettings';
import UserProfile from './pages/UserProfile';
import Login from './pages/Login';
import ReceiptPrintView from './pages/ReceiptPrintView';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<OverviewDashboard />} />
            <Route path="products" element={<ProductCatalog />} />
            <Route path="stock" element={<StockManagement />} />
            <Route path="suppliers" element={<SupplierManagement />} />
            <Route path="pos" element={<POS />} />
            <Route path="sales-history" element={<SalesHistory />} />
            <Route path="alerts" element={<StockAlerts />} />
            <Route path="reports" element={<AnalyticsReports />} />
            <Route path="customers" element={<Customer />} />
            <Route path="settings" element={<SystemSettings />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
          <Route path="/print/receipt/:saleId" element={
            <ProtectedRoute>
              <ReceiptPrintView />
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
