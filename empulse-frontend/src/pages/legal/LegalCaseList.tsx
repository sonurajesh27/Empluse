import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Scale, Search, ShieldAlert, Clock, AlertTriangle, Eye } from 'lucide-react'
import { mockLegalCases, InvestigationStatus, RiskLevel } from '../../data/mockLegalCases'

const STATUS_STYLES: Record<InvestigationStatus, string> = {
  'open': 'bg-blue-100 text-blue-700',
  'under-investigation': 'bg-amber-100 text-amber-700',
  'ai-report-ready': 'bg-purple-100 text-purple-700',
  'resolved': 'bg-green-100 text-green-700',
  'closed': 'bg-latte-100 text-latte-600',
  'no-action': 'bg-gray-100 text-gray-600',
}

const STATUS_LABELS: Record<InvestigationStatus, string> = {
  'open': 'Open',
  'under-investigation': 'Under Investigation',
  'ai-report-ready': 'AI Report Ready',
  'resolved': 'Resolved',
  'closed': 'Closed',
  'no-action': 'No Action',
}

const RISK_STYLES: Record<RiskLevel, string> = {
  'low': 'bg-green-100 text-green-700',
  'medium': 'bg-amber-100 text-amber-700',
  'high': 'bg-orange-100 text-orange-700',
  'critical': 'bg-red-100 text-red-700',
}

export default function LegalCaseList() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredCases = mockLegalCases.filter(c => {
    const matchesSearch = c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.complaintType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const openCount = mockLegalCases.filter(c => c.status === 'open' || c.status === 'under-investigation').length
  const criticalCount = mockLegalCases.filter(c => c.riskLevel === 'critical').length
  const avgResolution = '8.5 days'
  const mostCommon = 'Harassment'

  return (
    <div className="min-h-screen bg-latte-50">
      {/* Header */}
      <div className="bg-latte-700 px-4 pt-10 pb-4 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-latte-300 hover:text-white transition-colors">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-white font-bold text-xl flex items-center gap-2">
                <Scale size={20} /> Legal Investigation
              </h1>
              <p className="text-latte-300 text-sm">AI-Powered Investigation & Decision Support</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-5 max-w-3xl mx-auto space-y-5">
        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="card text-center">
            <ShieldAlert className="w-5 h-5 text-amber-500 mx-auto mb-1" />
            <p className="text-2xl font-bold text-latte-900">{openCount}</p>
            <p className="text-xs text-latte-500">Open Investigations</p>
          </div>
          <div className="card text-center">
            <AlertTriangle className="w-5 h-5 text-red-500 mx-auto mb-1" />
            <p className="text-2xl font-bold text-red-600">{criticalCount}</p>
            <p className="text-xs text-latte-500">Critical Cases</p>
          </div>
          <div className="card text-center">
            <Clock className="w-5 h-5 text-latte-500 mx-auto mb-1" />
            <p className="text-2xl font-bold text-latte-900">{avgResolution}</p>
            <p className="text-xs text-latte-500">Avg Resolution</p>
          </div>
          <div className="card text-center">
            <Eye className="w-5 h-5 text-latte-500 mx-auto mb-1" />
            <p className="text-2xl font-bold text-latte-900">{mostCommon}</p>
            <p className="text-xs text-latte-500">Most Common</p>
          </div>
        </div>

        {/* Filter row */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-latte-300" />
            <input
              type="text"
              placeholder="Search by ID, type, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-9"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field sm:w-48"
          >
            <option value="all">All Statuses</option>
            <option value="open">Open</option>
            <option value="under-investigation">Under Investigation</option>
            <option value="ai-report-ready">AI Report Ready</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
            <option value="no-action">No Action</option>
          </select>
        </div>

        {/* Cases List */}
        <div className="space-y-3">
          {filteredCases.map((c) => (
            <div key={c.id} className="card card-hover cursor-pointer" onClick={() => navigate(`/legal/case/${c.id}`)}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-bold text-latte-900 text-sm">{c.id}</span>
                    <span className={`tag ${STATUS_STYLES[c.status]}`}>{STATUS_LABELS[c.status]}</span>
                    <span className={`tag ${RISK_STYLES[c.riskLevel]}`}>{c.riskLevel.charAt(0).toUpperCase() + c.riskLevel.slice(1)} Risk</span>
                  </div>
                  <p className="text-sm font-medium text-latte-800">{c.complaintType}</p>
                  <p className="text-xs text-latte-500 mt-0.5">{c.department} · Created {c.createdAt}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className={`text-lg font-bold ${c.confidenceScore >= 80 ? 'text-red-600' : c.confidenceScore >= 60 ? 'text-amber-600' : 'text-latte-600'}`}>
                    {c.confidenceScore}%
                  </p>
                  <p className="text-xs text-latte-400">Confidence</p>
                </div>
              </div>
              <p className="text-xs text-latte-500 line-clamp-2 mb-3">{c.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-3 text-xs text-latte-400">
                  <span>HR: {c.assignedHR}</span>
                  <span>Legal: {c.assignedLegal}</span>
                </div>
                <button className="text-xs px-3 py-1.5 bg-latte-50 text-latte-700 border border-latte-200 rounded-lg hover:bg-latte-100 font-medium transition-colors">
                  View →
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCases.length === 0 && (
          <div className="card text-center py-10">
            <p className="text-latte-400 text-sm">No cases match your search criteria</p>
          </div>
        )}

        {/* Access note */}
        <div className="card bg-latte-50 text-center text-xs text-latte-400 py-3">
          🔒 Only HR, Legal, and Owner can access this module. All actions are logged in the audit trail.
        </div>
      </div>
    </div>
  )
}
