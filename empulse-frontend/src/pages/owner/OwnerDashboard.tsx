import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts'
import {
  ArrowLeft, ShieldAlert, Clock, 
  AlertTriangle, Eye, LogOut, TrendingDown, FileWarning, Users, BrainCircuit
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { mockComplaints } from '../../data/mockComplaints'
import { mockAuditLog, suppressorStats } from '../../data/mockAuditLog'
import AISignalCard from '../../components/AISignalCard'
import { mockAISignals } from '../../data/mockAISignals'

type Tab = 'overview' | 'audit' | 'bias' | 'escalations'

const weeklyData = [
  { week: 'W1', raised: 8, resolved: 6, fakeResolved: 0 },
  { week: 'W2', raised: 11, resolved: 7, fakeResolved: 1 },
  { week: 'W3', raised: 14, resolved: 6, fakeResolved: 2 },
  { week: 'W4', raised: 10, resolved: 4, fakeResolved: 2 },
]

const sectorHealth = [
  { sector: 'Asm A', score: 2.4 },
  { sector: 'Asm B', score: 3.1 },
  { sector: 'Pkg', score: 2.8 },
  { sector: 'QC', score: 3.5 },
  { sector: 'Weld', score: 1.9 },
  { sector: 'Paint', score: 2.2 },
  { sector: 'WH', score: 3.8 },
  { sector: 'Maint', score: 3.2 },
]

export default function OwnerDashboard() {
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'escalations', label: 'Escalations' },
    { id: 'audit', label: 'Audit Log' },
    { id: 'bias', label: 'Integrity' },
  ]

  const criticalComplaints = mockComplaints.filter(c => c.slaBreached || c.biasFlag === 'fake-resolution')
  const coordinatedFlags = mockComplaints.filter(c => c.biasFlag === 'coordinated')
  const fakeResolutions = mockComplaints.filter(c => c.biasFlag === 'fake-resolution')
  const slaBreaches = mockComplaints.filter(c => c.slaBreached)

  const SEVERITY_COLOR: Record<string, string> = {
    critical: 'bg-red-100 text-red-700 border-red-200',
    warning: 'bg-orange-100 text-orange-700 border-orange-200',
    info: 'bg-latte-100 text-latte-600 border-latte-200',
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-white border-b border-latte-100 px-5 py-4 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={() => navigate('/')} className="text-latte-400 hover:text-latte-700 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="font-semibold text-espresso">EmPulse Owner</h1>
            <span className="text-xs bg-espresso text-cream px-2 py-0.5 rounded-full">Full Access</span>
          </div>
          <p className="text-xs text-latte-400">{currentUser?.name} · Read-only with alerts</p>
        </div>
        <button onClick={() => { logout(); navigate('/') }} className="text-latte-400 hover:text-red-500 transition-colors">
          <LogOut className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-latte-100 px-5 overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap
                ${activeTab === tab.id ? 'border-espresso text-espresso' : 'border-transparent text-latte-400 hover:text-latte-600'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 py-6 space-y-5 max-w-2xl mx-auto">

        {/* Anomalous login banner */}
        {mockAISignals.filter(s => s.type === 'owner-login-anomaly').map(s => (
          <div key={s.id} className="bg-red-50 border-l-4 border-l-red-600 border border-red-200 rounded-xl px-4 py-3 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-red-700">{s.title}</p>
              <p className="text-xs text-red-600 mt-0.5">{s.detail}</p>
              <p className="text-xs text-red-400 mt-1">{s.timestamp} · 🤖 AI-detected</p>
            </div>
          </div>
        ))}

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <>
            {/* Critical alert */}
            {criticalComplaints.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-red-700">Attention Required</p>
                  <p className="text-xs text-red-500 mt-0.5">
                    {fakeResolutions.length} fake resolution(s) detected · {slaBreaches.length} SLA breach(es) · {coordinatedFlags.length} coordinated complaint flag(s)
                  </p>
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: FileWarning, val: fakeResolutions.length, label: 'Fake Resolutions', sub: 'Admin closed without fix', color: 'text-red-600' },
                { icon: Clock, val: slaBreaches.length, label: 'SLA Breaches', sub: 'Ignored complaints', color: 'text-orange-600' },
                { icon: AlertTriangle, val: coordinatedFlags.length, label: 'Bias Flags', sub: 'Coordinated targeting', color: 'text-yellow-600' },
                { icon: TrendingDown, val: '1.9', label: 'Lowest Sector', sub: 'Welding — critical', color: 'text-red-500' },
              ].map(s => {
                const Icon = s.icon
                return (
                  <div key={s.label} className="card">
                    <Icon className={`w-5 h-5 mb-2 ${s.color}`} />
                    <p className={`text-2xl font-bold ${s.color}`}>{s.val}</p>
                    <p className="text-sm font-medium text-espresso">{s.label}</p>
                    <p className="text-xs text-latte-400 mt-0.5">{s.sub}</p>
                  </div>
                )
              })}
            </div>

            {/* Complaint trend */}
            <div className="card">
              <p className="text-sm font-semibold text-espresso mb-4">Weekly Complaint vs Resolution</p>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={weeklyData} barSize={20}>
                  <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#b08050' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#b08050' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #ead9c2', borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="raised" fill="#d9bfa0" radius={[4, 4, 0, 0]} name="Raised" />
                  <Bar dataKey="resolved" fill="#6e4e2a" radius={[4, 4, 0, 0]} name="Resolved" />
                  <Bar dataKey="fakeResolved" fill="#ef4444" radius={[4, 4, 0, 0]} name="Fake Resolved" />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex gap-4 mt-2 justify-center">
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-latte-300 inline-block" /><span className="text-xs text-latte-500">Raised</span></div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-mocha inline-block" /><span className="text-xs text-latte-500">Resolved</span></div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-red-400 inline-block" /><span className="text-xs text-latte-500">Fake Resolved</span></div>
              </div>
            </div>

            {/* Sector health */}
            <div className="card">
              <p className="text-sm font-semibold text-espresso mb-4">Sector Health Scores</p>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={sectorHealth} barSize={24}>
                  <XAxis dataKey="sector" tick={{ fontSize: 10, fill: '#b08050' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 5]} tick={{ fontSize: 10, fill: '#b08050' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #ead9c2', borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="score" radius={[4, 4, 0, 0]}
                    fill="#6e4e2a"
                  />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs text-latte-400 text-center mt-2">Below 2.5 = Critical · 2.5–3.5 = Moderate · Above 3.5 = Healthy</p>
            </div>

            {/* AI integrity summary */}
            <div className="card bg-latte-50 border-latte-200">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="w-4 h-4 text-mocha" />
                <p className="text-sm font-semibold text-espresso">AI Weekly Integrity Report</p>
              </div>
              <div className="space-y-2 text-sm text-latte-700">
                <p>• Admin <strong>Murugan A.</strong> closed 2 complaints without genuine resolution — workers denied both.</p>
                <p>• HR <strong>Priya</strong> breached 72hr SLA on 2 safety complaints — auto-escalated to Owner.</p>
                <p>• <strong>Coordinated complaint</strong> detected targeting Supervisor Kannan — flagged, not escalated (confidence: 31%).</p>
                <p>• Welding sector health at <strong>1.9/5</strong> — lowest this month. Intervention recommended.</p>
              </div>
            </div>
          </>
        )}

        {/* ESCALATIONS */}
        {activeTab === 'escalations' && (
          <>
            <div>
              <h2 className="text-base font-semibold text-espresso mb-1">Escalated to You</h2>
              <p className="text-sm text-latte-500 mb-4">Complaints that Admin and HR failed to resolve. These require your direct attention.</p>
            </div>

            {/* HR inaction alert */}
            {slaBreaches.filter(c => c.auditLog.some(a => a.note?.includes('HR took no action') || a.action.includes('HR inaction'))).length > 0 && (
              <div className="bg-red-50 border-l-4 border-l-red-600 border border-red-200 rounded-xl px-4 py-3 mb-2">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-red-700">HR Inaction Alert</p>
                    <p className="text-xs text-red-600 mt-0.5">
                      <strong>Priya (HR Manager)</strong> took no action on {slaBreaches.length} complaint(s) for 72+ hours.
                      These have been escalated directly to you.
                    </p>
                    <p className="text-xs text-red-500 mt-1 font-medium">SLA breached — immediate attention required.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Admin fake resolution alert */}
            {fakeResolutions.length > 0 && (
              <div className="bg-orange-50 border-l-4 border-l-orange-500 border border-orange-200 rounded-xl px-4 py-3 mb-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-orange-700">Fake Resolution Detected</p>
                    <p className="text-xs text-orange-600 mt-0.5">
                      <strong>Murugan A. (Admin)</strong> marked {fakeResolutions.length} complaint(s) as resolved, but workers confirmed the issues were NOT fixed.
                      These complaints have been reopened and escalated to you.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {mockComplaints.filter(c => c.slaBreached || c.biasFlag === 'fake-resolution').map(c => (
                <div key={c.id} className="card border-l-4 border-l-red-400">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex flex-wrap gap-1.5">
                      <span className="tag bg-latte-100 text-latte-700">{c.sector}</span>
                      <span className="tag bg-red-100 text-red-700">
                        {c.biasFlag === 'fake-resolution' ? '⚠️ Fake Resolution' : '🕐 SLA Breached'}
                      </span>
                    </div>
                    <span className="text-xs text-latte-400 whitespace-nowrap">{c.hoursOpen}h open</span>
                  </div>
                  <p className="text-sm text-espresso mb-2">{c.text}</p>
                  <p className="text-xs text-latte-500 mb-3">{c.subCategory} · Raised {c.raisedCount}x in this sector</p>

                  {c.biasFlag === 'fake-resolution' && c.workerConfirmed === false && (
                    <div className="bg-red-50 border border-red-100 rounded-lg px-3 py-2 text-xs text-red-600 mb-3">
                      Worker confirmed: <strong>Still not fixed</strong> after Admin marked resolved
                    </div>
                  )}

                  <div className="space-y-1">
                    {c.auditLog.slice(-2).map((entry, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-latte-500">
                        <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-latte-300 flex-shrink-0" />
                        <span><strong>{entry.by}</strong>: {entry.action} · {entry.at}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* AUDIT LOG */}
        {activeTab === 'audit' && (
          <>
            <div>
              <h2 className="text-base font-semibold text-espresso mb-1">Audit Log</h2>
              <p className="text-sm text-latte-500 mb-4">Every action by every role. Permanent. Cannot be edited or deleted.</p>
            </div>

            <div className="space-y-2">
              {mockAuditLog.map(event => (
                <div key={event.id} className={`border rounded-xl px-4 py-3 ${SEVERITY_COLOR[event.severity]}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold">{event.actor}</span>
                        <span className="text-xs opacity-60">({event.actorRole})</span>
                      </div>
                      <p className="text-sm font-medium">{event.action}</p>
                      <p className="text-xs opacity-70 mt-0.5">→ {event.target}</p>
                    </div>
                    <span className="text-xs opacity-60 whitespace-nowrap">{event.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="card bg-latte-50 text-xs text-latte-500 text-center py-3">
              🔒 All entries are immutable and timestamped. No role can edit or delete audit entries.
            </div>
          </>
        )}

        {/* BIAS / INTEGRITY */}
        {activeTab === 'bias' && (
          <>
            <div>
              <h2 className="text-base font-semibold text-espresso mb-1">Integrity Analysis</h2>
              <p className="text-sm text-latte-500 mb-4">AI-generated suppression and bias analysis. Updated weekly.</p>
            </div>

            {/* Suppressor stats */}
            <div className="space-y-3 mb-5">
              {suppressorStats.map(s => (
                <div key={s.name} className="card">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-espresso">{s.name}</p>
                      <p className="text-sm text-latte-500">{s.role}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${s.suppressionScore > 60 ? 'text-red-500' : 'text-orange-500'}`}>
                        {s.suppressionScore}
                      </p>
                      <p className="text-xs text-latte-400">suppression score</p>
                    </div>
                  </div>
                  <div className="h-2 bg-latte-100 rounded-full overflow-hidden mb-3">
                    <div
                      className={`h-full rounded-full ${s.suppressionScore > 60 ? 'bg-red-400' : 'bg-orange-400'}`}
                      style={{ width: `${s.suppressionScore}%` }}
                    />
                  </div>
                  <div className="flex gap-4 text-xs text-latte-600">
                    <span>❌ Fake resolutions: <strong>{s.fakeResolutions}</strong></span>
                    <span>🕐 SLA breaches: <strong>{s.slaBreaches}</strong></span>
                  </div>
                </div>
              ))}
            </div>

            {/* Coordinated complaints */}
            <div className="card">
              <p className="text-sm font-semibold text-espresso mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-mocha" /> Coordinated Complaint Flags
              </p>
              {coordinatedFlags.map(c => (
                <div key={c.id} className="bg-orange-50 border border-orange-200 rounded-xl p-3 mb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="tag bg-orange-100 text-orange-700">⚠️ Coordinated</span>
                    <span className="text-xs text-latte-500">{c.sector}</span>
                  </div>
                  <p className="text-sm text-espresso">{c.text}</p>
                  <p className="text-xs text-latte-500 mt-1">
                    AI Confidence: <strong className="text-orange-600">{c.confidenceScore}% genuine</strong> ·
                    {c.raisedCount} complaints from same sub-group in 4 hours
                  </p>
                  <p className="text-xs text-latte-400 mt-1">Status: Sent to neutral review. NOT auto-escalated.</p>
                </div>
              ))}
            </div>

            {/* Formula card */}
            <div className="card bg-latte-50">
              <p className="text-xs font-semibold text-espresso mb-2">How suppression score is calculated</p>
              <div className="space-y-1 text-xs text-latte-600">
                <div className="flex justify-between"><span>Fake resolutions (worker denied)</span><span>40%</span></div>
                <div className="flex justify-between"><span>SLA breaches (no action taken)</span><span>35%</span></div>
                <div className="flex justify-between"><span>Repeated closure of same issue</span><span>25%</span></div>
              </div>
              <p className="text-xs text-latte-400 mt-2">Above 60 = High risk of suppression. Alert sent to Owner.</p>
            </div>

            {/* Owner-specific AI signals */}
            <div className="mt-2">
              <div className="flex items-center gap-2 mb-3">
                <BrainCircuit className="w-4 h-4 text-mocha" />
                <p className="text-sm font-semibold text-espresso">AI Integrity Signals</p>
              </div>
              <div className="space-y-3">
                {mockAISignals.filter(s => s.dashboard === 'owner').map(s => (
                  <AISignalCard key={s.id} signal={s} />
                ))}
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  )
}
