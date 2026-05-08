import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import StatusBoard from "./pages/StatusBoard";
import Dashboard from "./pages/Dashboard";
import SettlementSummary from "./pages/SettlementSummary";
import SettlementDetail from "./pages/SettlementDetail";
import PointConversion from "./pages/PointConversion";
import GiftPointManagement from "./pages/GiftPointManagement";
import GiftPointCancelRequest from "./pages/GiftPointCancelRequest";
import SpecialAccrualSettlement from "./pages/SpecialAccrualSettlement";
import DoubleAccrualSettlement from "./pages/DoubleAccrualSettlement";
import DirectUsePointSettlementDetail from "./pages/DirectUsePointSettlementDetail";
import HyundaiCardUseHistory from "./pages/HyundaiCardUseHistory";
import HyundaiCardSettlementDetail from "./pages/HyundaiCardSettlementDetail";
import PointHistory from "./pages/PointHistory";
import SettlementLedger from "./pages/SettlementLedger";
import UseBasisAccounting from "./pages/UseBasisAccounting";
import CustomerAnalytics from "./pages/CustomerAnalytics";
import Notice from "./pages/Notice";
import Faq from "./pages/Faq";
import Inquiry from "./pages/Inquiry";
import PermissionManagement from "./pages/PermissionManagement";
import PermissionRequestManagement from "./pages/PermissionRequestManagement";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <div className="flex flex-col h-screen bg-[#F5F6FA]">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto scroll-area">
          <Routes>
            <Route path="/" element={<Navigate to="/status-board" replace />} />
            <Route path="/status-board" element={<StatusBoard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settlement/summary" element={<SettlementSummary />} />
            <Route path="/settlement/detail" element={<SettlementDetail />} />
            <Route path="/settlement/point-conversion" element={<PointConversion />} />
            <Route path="/settlement/gift-point" element={<GiftPointManagement />} />
            <Route path="/settlement/gift-point-cancel" element={<GiftPointCancelRequest />} />
            <Route path="/settlement/special-accrual" element={<SpecialAccrualSettlement />} />
            <Route path="/settlement/double-accrual" element={<DoubleAccrualSettlement />} />
            <Route path="/settlement/direct-use-point" element={<DirectUsePointSettlementDetail />} />
            <Route path="/hyundai-card/use-history" element={<HyundaiCardUseHistory />} />
            <Route path="/hyundai-card/settlement-detail" element={<HyundaiCardSettlementDetail />} />
            <Route path="/point-history/history" element={<PointHistory />} />
            <Route path="/point-history/ledger" element={<SettlementLedger />} />
            <Route path="/point-history/use-basis" element={<UseBasisAccounting />} />
            <Route path="/customer-analytics" element={<CustomerAnalytics />} />
            <Route path="/support/notice" element={<Notice />} />
            <Route path="/support/faq" element={<Faq />} />
            <Route path="/support/inquiry" element={<Inquiry />} />
            <Route path="/admin/permission" element={<PermissionManagement />} />
            <Route path="/admin/permission-request" element={<PermissionRequestManagement />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
