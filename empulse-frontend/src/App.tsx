import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import FingerprintPage from './pages/FingerprintPage'
import FeedbackPage from './pages/FeedbackPage'
import SuccessPage from './pages/SuccessPage'
import HRDashboard from './pages/HRDashboard'
import LandingPage from './pages/LandingPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/verify" element={<FingerprintPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/dashboard" element={<HRDashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}
