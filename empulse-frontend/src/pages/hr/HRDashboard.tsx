import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, AlertTriangle, TrendingUp, Trophy, CheckCircle2, Clock } from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar
} from 'recharts'
import { useAuth } from '../../context/AuthContext'
import { mockComplaints, Complaint } from '../../data/mockComplaints'
import { mockRewards, mockFlightRisk, sectorTrendData } from '../../data/mockRewards'
import StatusBadge from '../../components/StatusBadge'

const SECTOR_COLORS = ['#6e4e2a', '#b08050', '#c4a07a', '#d9bfa0', '#ead9c2', '#8f6538', '#4d371e', '#2e2012']

export default function HRDashboard() {
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()
  const [tab, setTab] = useState('issues')
  const [complaints, setComplaints] = useState<Complaint[]>(mockComplaints)
  const [nominations, setNominations] = useState<Record<string, boolean>>({})
  const [letterGenerated, setLetterGenerated] = useState<Record<string, boolean>>({})

  const escalated = complaints.filter((c) => c.status === 'escalated')

  // Group escalated by sector
  const bySector: Record<string, Complaint[]> = {}
  escalated.forEach((c) => {
    if (!bySector[c.sector]) bySector[c.sector] = []
    bySector[c.sector].push(c)
  })

  const resolveComplaint = (id: string) => {
    setComplaints((prev) => prev.map((c) => c.id === id ? { ...c, status: 'resolved' } : c))
  }

  const topPerformers = [...mockRewards].sort((a, b) => b.score - a.score).slice(0, 5)

  const tabs = [
    { id: 'issues',  label: 'Issues',  icon: <AlertTriangle size={16}/> },
    { id: 'risk',    label: 'Risk',    icon: <TrendingUp size={16}/> },
    { id: 'rewards', label: 'Rewards', icon: <Trophy size={16}/> },
  ]

  const sectors = Object.keys(sectorTrendData[0]).filter((k) => k !== 'week').slice(0, 4)

  function timeAgo(ts: string) {
    const diff = Date.now() - new Date(ts).getTime()
    const h = Math.floor(diff / 3600000)
    if (h < 24) return `${h}h ago`
    return `${Math.floor(h / 24)}d ago`
  }

  return (
    <div className="min-h-screen bg-latte-50">
      {/* Header */}
      <div className="bg-latte-700 px-4 pt-10 pb-4 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          <div>
            <h1 className="text-white font-bold text-xl">EmPulse HR</h1>
            <p className="text-latte-300 text-sm">{currentUser?.name}</p>
          </div>
          <button onClick={() => { logout(); navigate('/') }} className="flex items-center gap-1.5 text-latte-300 hover:text-white text-sm border border-latte-500 px-3 py-1.5 rounded-xl transition-colors">
            <LogOut size={14} /> Logout
          </button>
        </div>
        <div className="flex gap-1 mt-3 max-w-3xl mx-auto bg-latte-800 rounded-xl p-1">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-all
                ${tab === t.id ? 'bg-white text-latte-700' : 'text-latte-300 hover:text-white'}`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-5 max-w-3xl mx-auto space-y-5">
        {/* ISSUES TAB */}
        {tab === 'issues' && (
          <>
            {/* Admin inaction alert banner */}
            {(() => {
              const adminIgnored = complaints.filter(c =>
                c.slaBreached && c.status === 'escalated' &&
                c.auditLog.some(a => a.action.includes('SLA Breached') || a.action.includes('Admin inaction'))
              )
              if (adminIgnored.length === 0) return null
              return (
                <div className="bg-red-50 border-l-4 border-l-red-500 border border-red-200 rounded-xl px-4 py-3">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-red-700">Admin Inaction Alert</p>
                      <p className="text-xs text-red-600 mt-0.5">
                        <strong>{adminIgnored.length} complaint{adminIgnored.length > 1 ? 's' : ''}</strong> were ignored by Admin for 48+ hours and auto-escalated to you.
                        These require your action within <strong>72 hours</strong> or they will escalate to the Owner.
                      </p>
                      <div className="mt-2 space-y-1">
                        {adminIgnored.map(c => (
                          <div key={c.id} className="flex items-center gap-2 text-xs text-red-500">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                            <span>{c.sector} — {c.subCategory} · <strong>{c.hoursOpen}h open</strong></span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })()}

            {/* SLA countdown for escalated complaints */}
            {escalated.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-amber-700">Your SLA: 72 hours per complaint</p>
                  <p className="text-xs text-amber-600 mt-0.5">
                    If you don't act within 72 hours of receiving a complaint, it auto-escalates to the Owner.
                    {escalated.filter(c => c.hoursOpen > 48).length > 0 && (
                      <span className="font-bold text-red-600"> {escalated.filter(c => c.hoursOpen > 48).length} complaint(s) approaching deadline.</span>
                    )}
                  </p>
                </div>
              </div>
            )}

            {/* Trend chart */}
            <div className="card">
              <p className="font-semibold text-latte-900 mb-1">Sector Health Trend</p>
              <p className="text-latte-400 text-xs mb-4">6-week open complaint count per sector</p>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={sectorTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ead9c2" />
                  <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#c4a07a' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#c4a07a' }} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, borderColor: '#ead9c2' }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  {sectors.map((s, i) => (
                    <Line key={s} type="monotone" dataKey={s} stroke={SECTOR_COLORS[i % SECTOR_COLORS.length]} strokeWidth={2} dot={false} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Escalated complaints by sector */}
            {escalated.length === 0 ? (
              <div className="card text-center py-10">
                <CheckCircle2 size={36} className="text-green-400 mx-auto mb-2" />
                <p className="text-latte-400 text-sm">No escalated complaints right now</p>
              </div>
            ) : (
              Object.entries(bySector).map(([sector, items]) => (
                <div key={sector}>
                  <h3 className="font-semibold text-latte-800 text-sm mb-2 flex items-center gap-2">
                    <span className="tag bg-latte-100 text-latte-700">{sector}</span>
                    <span className="text-latte-400">({items.length} escalated)</span>
                  </h3>
                  <div className="space-y-2">
                    {items.map((c) => (
                      <div key={c.id} className="card p-4">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <p className="font-medium text-latte-800 text-sm">{c.subCategory}</p>
                            <p className="text-latte-500 text-xs mt-0.5">{c.category} · {timeAgo(c.timestamp)}</p>
                          </div>
                          <StatusBadge status={c.status} size="sm" />
                        </div>
                        <p className="text-latte-500 text-sm line-clamp-2 mb-3">{c.text}</p>
                        <button
                          onClick={() => resolveComplaint(c.id)}
                          className="text-xs px-4 py-2 bg-green-50 text-green-600 border border-green-200 rounded-xl hover:bg-green-100 font-medium transition-colors"
                        >
                          ✓ Mark Resolved
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </>
        )}

        {/* RISK TAB */}
        {tab === 'risk' && (
          <>
            <div className="card">
              <p className="font-semibold text-latte-900 mb-1">Flight Risk Workers</p>
              <p className="text-latte-400 text-xs mb-4">Based on complaint frequency, attendance & engagement</p>
            </div>
            <div className="space-y-3">
              {mockFlightRisk.map((w) => (
                <div key={w.employeeId} className="card space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-latte-900">{w.name}</p>
                      <p className="text-latte-500 text-xs">{w.employeeId} · {w.sector}</p>
                    </div>
                    <span className={`text-2xl font-bold ${w.riskScore >= 70 ? 'text-red-600' : w.riskScore >= 50 ? 'text-amber-600' : 'text-green-600'}`}>
                      {w.riskScore}
                    </span>
                  </div>
                  {/* Risk bar */}
                  <div className="w-full bg-latte-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${w.riskScore >= 70 ? 'bg-red-500' : w.riskScore >= 50 ? 'bg-amber-500' : 'bg-green-500'}`}
                      style={{ width: `${w.riskScore}%` }}
                    />
                  </div>
                  <p className="text-latte-500 text-xs">{w.trend}</p>
                  <button className="text-xs px-4 py-2 bg-latte-50 text-latte-600 border border-latte-200 rounded-xl hover:bg-latte-100 font-medium transition-colors">
                    Schedule Check-in
                  </button>
                </div>
              ))}
            </div>

            <div className="card">
              <p className="font-semibold text-latte-900 mb-2">Risk Score Formula</p>
              <div className="bg-latte-50 rounded-xl p-3 text-xs text-latte-600 space-y-1">
                <p>• Unresolved complaint count (×10 pts each)</p>
                <p>• Attendance regularity (×15 pts)</p>
                <p>• Days since last positive feedback (×5 pts)</p>
                <p>• Escalation history (×8 pts)</p>
                <p className="font-medium text-latte-700 pt-1">Score &gt;70: High Risk · 50-69: Moderate · &lt;50: Low</p>
              </div>
            </div>
          </>
        )}

        {/* REWARDS TAB */}
        {tab === 'rewards' && (
          <>
            {/* Top performers chart */}
            <div className="card">
              <p className="font-semibold text-latte-900 mb-4">Top Performers — All Sectors</p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={topPerformers} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#ead9c2" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#c4a07a' }} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#6e4e2a' }} width={80} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, borderColor: '#ead9c2' }} />
                  <Bar dataKey="score" fill="#6e4e2a" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pending nominations */}
            <div>
              <h3 className="font-semibold text-latte-900 mb-3">Worker Recognition Cards</h3>
              <div className="space-y-3">
                {topPerformers.map((r) => (
                  <div key={r.employeeId} className="card flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-latte-100 flex items-center justify-center text-latte-700 font-bold text-sm shrink-0">
                      {r.name.split(' ').map((w) => w[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-latte-900 text-sm">{r.name}</p>
                      <p className="text-latte-400 text-xs">{r.sector} · Score {r.score}</p>
                      {r.badges.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {r.badges.slice(0, 2).map((b) => (
                            <span key={b} className="text-xs bg-latte-50 text-latte-600 border border-latte-100 px-2 py-0.5 rounded-full">{b}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => setLetterGenerated((prev) => ({ ...prev, [r.employeeId]: true }))}
                      className={`text-xs px-3 py-2 rounded-xl font-medium transition-colors shrink-0
                        ${letterGenerated[r.employeeId]
                          ? 'bg-green-50 text-green-600 border border-green-200'
                          : 'bg-latte-50 text-latte-600 border border-latte-200 hover:bg-latte-100'}`}
                    >
                      {letterGenerated[r.employeeId] ? '✓ Generated' : 'Generate Letter'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
