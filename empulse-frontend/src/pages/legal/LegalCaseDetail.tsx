import { useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, FileText, Shield, Brain, Clock, Gavel,
  Upload, CheckCircle2, Circle, AlertTriangle
} from 'lucide-react'
import { mockLegalCases, LegalCase, InvestigationStatus, RiskLevel, AIReport } from '../../data/mockLegalCases'

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

const FILE_ICONS: Record<string, string> = {
  pdf: '📄',
  image: '🖼️',
  video: '🎥',
  audio: '🎤',
  document: '📝',
  text: '📝',
}

type Tab = 'summary' | 'evidence' | 'ai-report' | 'timeline' | 'decision'

export default function LegalCaseDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const caseData = mockLegalCases.find(c => c.id === id)
  const [activeTab, setActiveTab] = useState<Tab>('summary')
  const [localCase, setLocalCase] = useState<LegalCase | undefined>(caseData)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [decisionStatus, setDecisionStatus] = useState<InvestigationStatus>(caseData?.status || 'open')
  const [decisionUpdated, setDecisionUpdated] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)

  if (!localCase) {
    return (
      <div className="min-h-screen bg-latte-50 flex items-center justify-center">
        <div className="card text-center">
          <p className="text-latte-500">Case not found</p>
          <button onClick={() => navigate('/legal')} className="btn-primary mt-4">Back to Cases</button>
        </div>
      </div>
    )
  }

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'summary', label: 'Summary', icon: <FileText size={14} /> },
    { id: 'evidence', label: 'Evidence', icon: <Shield size={14} /> },
    { id: 'ai-report', label: 'AI Report', icon: <Brain size={14} /> },
    { id: 'timeline', label: 'Timeline', icon: <Clock size={14} /> },
    { id: 'decision', label: 'Decision', icon: <Gavel size={14} /> },
  ]

  const handleAnalyze = () => {
    setAnalyzing(true)
    // Simulate AI processing
    setTimeout(() => {
      const mockReport: AIReport = {
        summary: 'Worker reported missing inventory items from Warehouse Storage B. Access logs identify EMP-0078 as the last person to badge into the area. However, shared badge usage and incomplete CCTV coverage create gaps in the evidence chain. Further investigation is needed.',
        evidenceQuality: 'Moderate — 3 documents available. Access logs are circumstantial. CCTV has blind spots. No direct witness or physical evidence linking suspect to items.',
        patternAnalysis: [
          'No prior disciplinary history for EMP-0078',
          'Shared badge access policy creates ambiguity in access logs',
          'Inventory discrepancy first noticed 14 hours after alleged event',
          'Similar incidents reported in Warehouse in Oct 2024 (unresolved)',
        ],
        attendanceAnalysis: 'EMP-0078 has 98% attendance regularity. Present on the day in question. No unusual shift changes or early departures noted.',
        performanceAnalysis: 'EMP-0078 has been rated "Exceeds Expectations" for the last 2 quarters. No prior complaints or performance issues. Good standing with team.',
        previousHistory: [
          'Oct 2024 — Similar inventory discrepancy in Warehouse (different employee suspected, unresolved)',
          'No prior complaints or flags against EMP-0078',
        ],
        credibilityScore: 62,
        riskLevel: 'medium',
        recommendations: [
          'Conduct structured interview with EMP-0078 with union representative present',
          'Review shared badge access policy — identify all personnel with Storage B access on Jan 11',
          'Check CCTV from alternate angles and adjacent areas',
          'Cross-reference with inventory check-out logs',
          'Consider polygraph or voluntary statement (with consent only)',
        ],
        nextSteps: [
          'Interview all 4 personnel who had access to Storage B on Jan 11',
          'Request enhanced CCTV review from security vendor',
          'Audit badge sharing practices across Warehouse team',
          'Determine if insurance claim is applicable for lost inventory',
          'Report to Owner if evidence remains inconclusive after 7 days',
        ],
        confidence: 62,
        disclaimer: 'This report is AI-assisted and intended to support HR and Legal investigations. Final employment decisions must always be made by authorized human decision-makers. AI analysis does not constitute legal advice. All findings should be verified through formal investigation procedures.',
      }
      setLocalCase(prev => prev ? { ...prev, aiReport: mockReport, status: 'ai-report-ready' } : prev)
      setAnalyzing(false)
    }, 2000)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file.name)
    }
  }

  const handleDecisionUpdate = () => {
    setLocalCase(prev => prev ? { ...prev, status: decisionStatus } : prev)
    setDecisionUpdated(true)
    setTimeout(() => setDecisionUpdated(false), 3000)
  }

  // Progress ring component
  const ProgressRing = ({ score }: { score: number }) => {
    const radius = 40
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (score / 100) * circumference
    const color = score >= 80 ? '#dc2626' : score >= 60 ? '#d97706' : '#16a34a'

    return (
      <div className="flex items-center gap-4">
        <svg width="100" height="100" className="progress-ring-animate">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="#f5ede0" strokeWidth="8" />
          <circle
            cx="50" cy="50" r={radius} fill="none" stroke={color} strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 50 50)"
          />
          <text x="50" y="50" textAnchor="middle" dominantBaseline="central"
            className="text-xl font-bold" fill={color} fontSize="20">
            {score}%
          </text>
        </svg>
        <div>
          <p className="text-sm font-semibold text-latte-900">Credibility Score</p>
          <p className="text-xs text-latte-500">Based on evidence quality, consistency, and corroboration</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-latte-50">
      {/* Header */}
      <div className="bg-latte-700 px-4 pt-10 pb-4 sticky top-0 z-10">
        <div className="flex items-center gap-3 max-w-3xl mx-auto mb-3">
          <button onClick={() => navigate('/legal')} className="text-latte-300 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-white font-bold text-lg">{localCase.id}</h1>
              <span className={`tag text-xs ${STATUS_STYLES[localCase.status]}`}>{STATUS_LABELS[localCase.status]}</span>
              <span className={`tag text-xs ${RISK_STYLES[localCase.riskLevel]}`}>{localCase.riskLevel.charAt(0).toUpperCase() + localCase.riskLevel.slice(1)} Risk</span>
            </div>
            <p className="text-latte-300 text-sm">{localCase.complaintType} · {localCase.department}</p>
          </div>
        </div>
        {/* Tab bar */}
        <div className="flex gap-1 max-w-3xl mx-auto bg-latte-800 rounded-xl p-1 overflow-x-auto">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap px-2
                ${activeTab === t.id ? 'bg-white text-latte-700' : 'text-latte-300 hover:text-white'}`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-5 max-w-3xl mx-auto space-y-5">

        {/* SUMMARY TAB */}
        {activeTab === 'summary' && (
          <>
            <div className="card">
              <h3 className="font-semibold text-latte-900 mb-2">Complaint Description</h3>
              <p className="text-sm text-latte-700 leading-relaxed">{localCase.description}</p>
            </div>

            <div className="card">
              <h3 className="font-semibold text-latte-900 mb-3">Case Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-latte-400">Employee ID</p>
                  <p className="text-sm font-medium text-latte-800">{localCase.employeeId}</p>
                </div>
                <div>
                  <p className="text-xs text-latte-400">Department</p>
                  <p className="text-sm font-medium text-latte-800">{localCase.department}</p>
                </div>
                <div>
                  <p className="text-xs text-latte-400">Complaint Type</p>
                  <p className="text-sm font-medium text-latte-800">{localCase.complaintType}</p>
                </div>
                <div>
                  <p className="text-xs text-latte-400">Created</p>
                  <p className="text-sm font-medium text-latte-800">{localCase.createdAt}</p>
                </div>
                <div>
                  <p className="text-xs text-latte-400">Assigned HR</p>
                  <p className="text-sm font-medium text-latte-800">{localCase.assignedHR}</p>
                </div>
                <div>
                  <p className="text-xs text-latte-400">Assigned Legal</p>
                  <p className="text-sm font-medium text-latte-800">{localCase.assignedLegal}</p>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="font-semibold text-latte-900 mb-2">Quick Stats</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-latte-50 rounded-xl p-3 text-center">
                  <p className="text-xl font-bold text-latte-900">{localCase.evidence.length}</p>
                  <p className="text-xs text-latte-500">Evidence Items</p>
                </div>
                <div className="bg-latte-50 rounded-xl p-3 text-center">
                  <p className={`text-xl font-bold ${localCase.confidenceScore >= 80 ? 'text-red-600' : localCase.confidenceScore >= 60 ? 'text-amber-600' : 'text-green-600'}`}>
                    {localCase.confidenceScore}%
                  </p>
                  <p className="text-xs text-latte-500">Confidence</p>
                </div>
                <div className="bg-latte-50 rounded-xl p-3 text-center">
                  <p className="text-xl font-bold text-latte-900">{localCase.timeline.filter(t => t.done).length}/{localCase.timeline.length}</p>
                  <p className="text-xs text-latte-500">Steps Done</p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* EVIDENCE TAB */}
        {activeTab === 'evidence' && (
          <>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-latte-900">Uploaded Evidence ({localCase.evidence.length})</h3>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn-primary text-sm flex items-center gap-1.5 px-4 py-2"
              >
                <Upload size={14} /> Upload Evidence
              </button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileSelect}
              />
            </div>

            {selectedFile && (
              <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-700">
                ✓ Selected: <strong>{selectedFile}</strong> — Ready for upload
              </div>
            )}

            <div className="space-y-2">
              {localCase.evidence.map(ev => (
                <div key={ev.id} className="card p-4 flex items-center gap-3">
                  <span className="text-2xl">{FILE_ICONS[ev.type]}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-latte-900 truncate">{ev.name}</p>
                    <p className="text-xs text-latte-500">{ev.uploadedBy} · {ev.uploadedAt}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`tag text-xs ${
                      ev.type === 'pdf' ? 'bg-red-50 text-red-600' :
                      ev.type === 'video' ? 'bg-blue-50 text-blue-600' :
                      ev.type === 'audio' ? 'bg-purple-50 text-purple-600' :
                      ev.type === 'image' ? 'bg-green-50 text-green-600' :
                      'bg-latte-50 text-latte-600'
                    }`}>
                      {ev.type.toUpperCase()}
                    </span>
                    <p className="text-xs text-latte-400 mt-1">{ev.size}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-latte-400 text-center">Max 100MB per file. Supported: PDF, images, video, audio, documents.</p>
          </>
        )}

        {/* AI REPORT TAB */}
        {activeTab === 'ai-report' && (
          <>
            {!localCase.aiReport ? (
              <div className="card text-center py-16">
                <Brain size={48} className="text-latte-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-latte-900 mb-2">AI Investigation Analysis</h3>
                <p className="text-sm text-latte-500 mb-6 max-w-md mx-auto">
                  Run AI analysis on all uploaded evidence to generate an investigation report with pattern detection, credibility scoring, and recommendations.
                </p>
                <button
                  onClick={handleAnalyze}
                  disabled={analyzing}
                  className="btn-primary text-base px-8 py-3"
                >
                  {analyzing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Analyzing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Brain size={18} /> Analyze Investigation
                    </span>
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Summary */}
                <div className="card">
                  <h3 className="font-semibold text-latte-900 mb-2">Complaint Summary</h3>
                  <p className="text-sm text-latte-700 leading-relaxed">{localCase.aiReport.summary}</p>
                </div>

                {/* Evidence Quality */}
                <div className="card">
                  <h3 className="font-semibold text-latte-900 mb-2">Evidence Quality</h3>
                  <p className="text-sm text-latte-700">{localCase.aiReport.evidenceQuality}</p>
                </div>

                {/* Pattern Analysis */}
                <div className="card">
                  <h3 className="font-semibold text-latte-900 mb-2">Pattern Analysis</h3>
                  <ul className="space-y-2">
                    {localCase.aiReport.patternAnalysis.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-latte-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-latte-400 mt-2 shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Attendance & Performance */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="card">
                    <h3 className="font-semibold text-latte-900 mb-2">Attendance Analysis</h3>
                    <p className="text-sm text-latte-700">{localCase.aiReport.attendanceAnalysis}</p>
                  </div>
                  <div className="card">
                    <h3 className="font-semibold text-latte-900 mb-2">Performance Analysis</h3>
                    <p className="text-sm text-latte-700">{localCase.aiReport.performanceAnalysis}</p>
                  </div>
                </div>

                {/* Previous History */}
                <div className="card">
                  <h3 className="font-semibold text-latte-900 mb-2">Previous History</h3>
                  <ul className="space-y-2">
                    {localCase.aiReport.previousHistory.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-latte-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Credibility Score */}
                <div className="card">
                  <ProgressRing score={localCase.aiReport.credibilityScore} />
                </div>

                {/* Risk Level */}
                <div className="card">
                  <h3 className="font-semibold text-latte-900 mb-2">Risk Level</h3>
                  <span className={`tag text-sm px-4 py-1.5 ${RISK_STYLES[localCase.aiReport.riskLevel]}`}>
                    {localCase.aiReport.riskLevel.charAt(0).toUpperCase() + localCase.aiReport.riskLevel.slice(1)} Risk
                  </span>
                </div>

                {/* Recommendations */}
                <div className="card">
                  <h3 className="font-semibold text-latte-900 mb-2">Recommendations</h3>
                  <ol className="space-y-2">
                    {localCase.aiReport.recommendations.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-latte-700">
                        <span className="font-bold text-latte-500 shrink-0">{i + 1}.</span>
                        {r}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Next Steps */}
                <div className="card">
                  <h3 className="font-semibold text-latte-900 mb-2">Next Steps</h3>
                  <ul className="space-y-2">
                    {localCase.aiReport.nextSteps.map((s, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-latte-700">
                        <input type="checkbox" className="w-4 h-4 rounded border-latte-300 text-latte-700 focus:ring-latte-400" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Confidence */}
                <div className="card">
                  <h3 className="font-semibold text-latte-900 mb-2">Overall Confidence</h3>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-latte-100 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${localCase.aiReport.confidence >= 80 ? 'bg-red-500' : localCase.aiReport.confidence >= 60 ? 'bg-amber-500' : 'bg-green-500'}`}
                        style={{ width: `${localCase.aiReport.confidence}%` }}
                      />
                    </div>
                    <span className="font-bold text-latte-900">{localCase.aiReport.confidence}%</span>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-amber-800 mb-1">⚠️ Important Disclaimer</p>
                    <p className="text-sm text-amber-700">{localCase.aiReport.disclaimer}</p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* TIMELINE TAB */}
        {activeTab === 'timeline' && (
          <div className="card">
            <h3 className="font-semibold text-latte-900 mb-4">Investigation Timeline</h3>
            <div className="relative">
              {localCase.timeline.map((step, i) => {
                const isLast = i === localCase.timeline.length - 1
                const isCurrent = step.done && (i === localCase.timeline.length - 1 || !localCase.timeline[i + 1].done)
                return (
                  <div key={i} className="flex gap-4 pb-6 relative">
                    {/* Vertical line */}
                    {!isLast && (
                      <div className={`absolute left-[15px] top-[30px] w-0.5 h-[calc(100%-20px)] ${step.done ? 'bg-green-300' : 'bg-latte-200'}`} />
                    )}
                    {/* Circle */}
                    <div className="shrink-0 relative z-10">
                      {step.done ? (
                        <div className={`${isCurrent ? 'animate-pulse-glow' : ''}`}>
                          <CheckCircle2 size={30} className="text-green-500" />
                        </div>
                      ) : (
                        <Circle size={30} className="text-latte-300" />
                      )}
                    </div>
                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <p className={`text-sm font-medium ${step.done ? 'text-latte-900' : 'text-latte-400'}`}>{step.step}</p>
                      <p className="text-xs text-latte-500 mt-0.5">{step.actor}</p>
                      {step.date && <p className="text-xs text-latte-400 mt-0.5">{step.date}</p>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* DECISION TAB */}
        {activeTab === 'decision' && (
          <>
            <div className="card">
              <h3 className="font-semibold text-latte-900 mb-3">Current Status</h3>
              <span className={`tag text-sm px-4 py-1.5 ${STATUS_STYLES[localCase.status]}`}>
                {STATUS_LABELS[localCase.status]}
              </span>
            </div>

            <div className="card">
              <h3 className="font-semibold text-latte-900 mb-3">Update Decision</h3>
              <select
                value={decisionStatus}
                onChange={(e) => setDecisionStatus(e.target.value as InvestigationStatus)}
                className="input-field mb-4"
              >
                <option value="open">Open</option>
                <option value="under-investigation">Under Investigation</option>
                <option value="ai-report-ready">AI Report Ready</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
                <option value="no-action">No Action Required</option>
              </select>
              <button onClick={handleDecisionUpdate} className="btn-primary w-full">
                Update Decision
              </button>
            </div>

            {decisionUpdated && (
              <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center gap-2 text-sm text-green-700">
                <CheckCircle2 size={16} /> Decision updated successfully. This action has been logged.
              </div>
            )}

            <div className="card bg-latte-50 text-xs text-latte-400 text-center py-3">
              🔒 Only HR and Legal can update this field. All changes are permanently logged in the audit trail.
            </div>
          </>
        )}
      </div>
    </div>
  )
}
