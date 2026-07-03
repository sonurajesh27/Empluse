import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import SplashPage from './pages/SplashPage'
import RoleSelectPage from './pages/RoleSelectPage'
import FingerprintPage from './pages/FingerprintPage'
import PINLoginPage from './pages/PINLoginPage'
import EmployeeDashboard from './pages/employee/EmployeeDashboard'
import RaiseComplaint from './pages/employee/RaiseComplaint'
import AdminDashboard from './pages/admin/AdminDashboard'
import ComplaintDetail from './pages/admin/ComplaintDetail'
import RegisterEmployee from './pages/admin/RegisterEmployee'
import ProductionDashboard from './pages/admin/ProductionDashboard'
import IncidentDetection from './pages/admin/IncidentDetection'
import WorkplaceMonitoring from './pages/admin/WorkplaceMonitoring'
import HRDashboard from './pages/hr/HRDashboard'
import QuickPoll from './pages/hr/QuickPoll'
import OwnerDashboard from './pages/owner/OwnerDashboard'
import MonthlyReport from './pages/owner/MonthlyReport'
import DemoGuidePage from './pages/DemoGuidePage'
import LegalCaseList from './pages/legal/LegalCaseList'
import LegalCaseDetail from './pages/legal/LegalCaseDetail'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/role" element={<RoleSelectPage />} />
          <Route path="/verify" element={<FingerprintPage />} />
          <Route path="/pin-login" element={<PINLoginPage />} />
          <Route path="/employee" element={<EmployeeDashboard />} />
          <Route path="/employee/raise" element={<RaiseComplaint />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/complaint/:id" element={<ComplaintDetail />} />
          <Route path="/admin/register" element={<RegisterEmployee />} />
          <Route path="/admin/production" element={<ProductionDashboard />} />
          <Route path="/admin/incidents" element={<IncidentDetection />} />
          <Route path="/admin/monitoring" element={<WorkplaceMonitoring />} />
          <Route path="/hr" element={<HRDashboard />} />
          <Route path="/hr/poll" element={<QuickPoll />} />
          <Route path="/owner" element={<OwnerDashboard />} />
          <Route path="/owner/report" element={<MonthlyReport />} />
          <Route path="/demo-guide" element={<DemoGuidePage />} />
          <Route path="/legal" element={<LegalCaseList />} />
          <Route path="/legal/case/:id" element={<LegalCaseDetail />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
