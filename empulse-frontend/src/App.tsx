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
import HRDashboard from './pages/hr/HRDashboard'
import OwnerDashboard from './pages/owner/OwnerDashboard'
import DemoGuidePage from './pages/DemoGuidePage'

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
          <Route path="/hr" element={<HRDashboard />} />
          <Route path="/owner" element={<OwnerDashboard />} />
          <Route path="/demo-guide" element={<DemoGuidePage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
