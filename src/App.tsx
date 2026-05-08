import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import StatusBoard from "./pages/StatusBoard";
import Dashboard from "./pages/Dashboard";
import CustomerAnalytics from "./pages/CustomerAnalytics";
import Home from "./pages/Home";
import Notice from "./pages/Notice";
import Faq from "./pages/Faq";
import Inquiry from "./pages/Inquiry";
import Login from "./pages/Login";
import TermsAgreement from "./pages/TermsAgreement";
import AccessPermissionRequest from "./pages/AccessPermissionRequest";
import MyInfo from "./pages/MyInfo";
import UserManagement from "./pages/UserManagement";
import AffiliateManagement from "./pages/AffiliateManagement";
import PermissionManagement from "./pages/PermissionManagement";
import PermissionRequestManagement from "./pages/PermissionRequestManagement";
import AccessLog from "./pages/AccessLog";
import Admin from "./pages/Admin";
import GiftPointManagement from "./pages/GiftPointManagement";
import GiftPointCancelRequest from "./pages/GiftPointCancelRequest";
import SettlementSummary from "./pages/SettlementSummary";
import SettlementDetail from "./pages/SettlementDetail";
import PointHistory from "./pages/PointHistory";
import SettlementLedger from "./pages/SettlementLedger";
import DoubleAccrualSettlement from "./pages/DoubleAccrualSettlement";
import SpecialAccrualSettlement from "./pages/SpecialAccrualSettlement";
import PointConversion from "./pages/PointConversion";
import DirectUsePointSettlementDetail from "./pages/DirectUsePointSettlementDetail";
import HyundaiCardUseHistory from "./pages/HyundaiCardUseHistory";
import HyundaiCardSettlementDetail from "./pages/HyundaiCardSettlementDetail";
import UseBasisAccounting from "./pages/UseBasisAccounting";

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

            {/* ⑧ 대시보드 */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customer-analytics" element={<CustomerAnalytics />} />

            {/* ① 공통 기반 */}
            <Route path="/home" element={<Home />} />
            <Route path="/support/notice" element={<Notice />} />
            <Route path="/support/faq" element={<Faq />} />
            <Route path="/support/inquiry" element={<Inquiry />} />

            {/* ② 로그인 · 접근 제어 */}
            <Route path="/login" element={<Login />} />
            <Route path="/login/terms" element={<TermsAgreement />} />
            <Route path="/login/permission-request" element={<AccessPermissionRequest />} />
            <Route path="/myinfo" element={<MyInfo />} />

            {/* ③ 시스템 관리 */}
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/affiliates" element={<AffiliateManagement />} />
            <Route path="/admin/permission" element={<PermissionManagement />} />
            <Route path="/admin/permission-request" element={<PermissionRequestManagement />} />
            <Route path="/admin/access-log" element={<AccessLog />} />
            <Route path="/admin" element={<Admin />} />

            {/* ④ 포인트 관리 */}
            <Route path="/settlement/gift-point" element={<GiftPointManagement />} />
            <Route path="/settlement/gift-point-cancel" element={<GiftPointCancelRequest />} />

            {/* ⑤ 정산 관리 */}
            <Route path="/settlement/summary" element={<SettlementSummary />} />
            <Route path="/settlement/detail" element={<SettlementDetail />} />
            <Route path="/point-history/history" element={<PointHistory />} />
            <Route path="/point-history/ledger" element={<SettlementLedger />} />
            <Route path="/settlement/double-accrual" element={<DoubleAccrualSettlement />} />
            <Route path="/settlement/special-accrual" element={<SpecialAccrualSettlement />} />
            <Route path="/settlement/point-conversion" element={<PointConversion />} />
            <Route path="/settlement/direct-use-point" element={<DirectUsePointSettlementDetail />} />

            {/* ⑥ 올리브영 현대카드 */}
            <Route path="/hyundai-card/use-history" element={<HyundaiCardUseHistory />} />
            <Route path="/hyundai-card/settlement-detail" element={<HyundaiCardSettlementDetail />} />

            {/* ⑦ 회계 관리 */}
            <Route path="/point-history/use-basis" element={<UseBasisAccounting />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
