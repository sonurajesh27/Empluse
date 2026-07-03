import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, AlertTriangle, CheckSquare, List, Activity, BrainCircuit } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { Complaint, ComplaintStatus } from '../../data/mockComplaints'
import { SECTORS, COMPLAINT_CATEGORIES } from '../../data/sectors'
import ComplaintCard from '../../components/ComplaintCard'
import AISignalCard from '../../components/AISignalCard'
import { mockAISignals } from '../../data/mockAISignals'
import { getComplaints, escalateComplaint as apiEscalate, resolveComplaint as apiResolve } from '../../api/apiClient'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()
  const [tab, setTab] = useState('queue')
  const [complaints, setComplaints] = useState<Complaint[]>([])

  // Fetch complaints from backend
  useEffect(() => {
    getComplaints().then(setComplaints).catch(() => {
      // Fallback to empty if backend is down
      setComplaints([])
    })
  }, [])

  // Filters
  const [filterSector, setFilterSector] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const filtered = useMemo(() => {
    return complaints.filter((c) => {
      if (filterSector !== 'all' && c.sector !== filterSector) return false
      if (filterCategory !== 'all' && c.category !== filterCategory) return false
      if (filterStatus !== 'all' && c.status !== filterStatus) return false
      return true
    })
  }, [complaints, filterSector, filterCategory, filterStatus])

  const updateStatus = async (id: string, status: ComplaintStatus) => {
    try {
      if (status === 'escalated') {
        await apiEscalate(id)
      } else if (status === 'resolved') {
        await apiResolve(id, currentUser?.name || 'Admin')
      }
    } catch (e) {
      console.error('API call failed:', e)
    }
    setComplaints((prev) => prev.map((c) => c.id === id ? { ...c, status } : c))
  }

  // Heatmap counts per sector
  const sectorCounts = useMemo(() => {
    const map: Record<string, number> = {}
    SECTORS.forEach((s) => { map[s] = 0 })
    complaints.forEach((c) => { if (c.status !== 'resolved') map[c.sector] = (map[c.sector] ?? 0) + 1 })
    return map
  }, [complaints])

  // Pattern alerts: sector + category with count >= 3
  const patterns = useMemo(() => {
    const map: Record<string, { sector: string; category: string; count: number; ids: string[] }> = {}
    complaints.forEach((c) => {
      if (c.status === 'resolved') return
      const key = `${c.sector}::${c.category}`
      if (!map[key]) map[key] = { sector: c.sector, category: c.category, count: 0, ids: [] }
      map[key].count++
      map[key].ids.push(c.id)
    })
    return Object.values(map).filter((p) => p.count >= 3)
  }, [complaints])

  const [resolvedAlerts, setResolvedAlerts] = useState<string[]>([])

  const handleAutoEscalate = (key: string, ids: string[]) => {
    ids.forEach((id) => updateStatus(id, 'escalated'))
    setResolvedAlerts((prev) => [...prev, key])
  }

  const heatColor = (count: number) =>
    count >= 4 ? 'bg-red-100 border-red-300 text-red-800' :
    count >= 2 ? 'bg-amber-100 border-amber-300 text-amber-800' :
    'bg-green-100 border-green-300 text-green-800'

  const totalOpen = complaints.filter((c) => c.status !== 'resolved').length
  const escalatedToday = complaints.filter((c) => c.status === 'escalated').length
  const resolvedWeek = complaints.filter((c) => c.status === 'resolved').length

  const tabs = [
    { id: 'queue',   label: 'Queue',   icon: <List size={16} /> },
    { id: 'heatmap', label: 'Heatmap', icon: <Activity size={16} /> },
    { id: 'alerts',  label: 'Alerts',  icon: <AlertTriangle size={16} /> },
    { id: 'ai',      label: 'AI',      icon: <BrainCircuit size={16} /> },
  ]

  return (
    <div className="min-h-screen bg-latte-50">
      {/* Header */}
      <div className="bg-latte-700 px-4 pt-10 pb-4 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          <div>
            <h1 className="text-white font-bold text-xl">EmPulse Admin</h1>
            <p className="text-latte-300 text-sm">{currentUser?.name}</p>
          </div>
          <button onClick={() => { logout(); navigate('/') }} className="flex items-center gap-1.5 text-latte-300 hover:text-white text-sm border border-latte-500 px-3 py-1.5 rounded-xl transition-colors">
            <LogOut size={14} /> Logout
          </button>
        </div>
        {/* Tab bar */}
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

      <div className="px-4 py-5 max-w-3xl mx-auto">
        {/* QUEUE */}
        {tab === 'queue' && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <StatBox label="Open" value={totalOpen} bg="bg-red-50" color="text-red-700" />
              <StatBox label="Escalated" value={escalatedToday} bg="bg-amber-50" color="text-amber-700" />
              <StatBox label="Resolved" value={resolvedWeek} bg="bg-green-50" color="text-green-700" />
            </div>

            {/* Filters */}
            <div className="flex gap-2 mb-4 flex-wrap">
              <select value={filterSector} onChange={(e) => setFilterSector(e.target.value)} className="input-field text-xs py-2 flex-1 min-w-[120px]">
                <option value="all">All Sectors</option>
                {SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="input-field text-xs py-2 flex-1 min-w-[120px]">
                <option value="all">All Categories</option>
                {COMPLAINT_CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="input-field text-xs py-2 flex-1 min-w-[100px]">
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="escalated">Escalated</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            {filtered.length === 0 ? (
              <div className="card text-center py-10">
                <CheckSquare size={36} className="text-latte-300 mx-auto mb-2" />
                <p className="text-latte-400 text-sm">No complaints match the selected filters</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((c) => (
                  <ComplaintCard
                    key={c.id}
                    complaint={c}
                    showActions
                    onEscalate={(id) => updateStatus(id, 'escalated')}
                    onResolve={(id) => updateStatus(id, 'resolved')}
                    onDetail={(id) => navigate(`/admin/complaint/${id}`)}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* HEATMAP */}
        {tab === 'heatmap' && (
          <>
            <h2 className="font-semibold text-latte-900 mb-1">Sector Heatmap</h2>
            <p className="text-latte-400 text-xs mb-4">Open issues per sector — click to filter queue</p>
            <div className="grid grid-cols-2 gap-3">
              {SECTORS.map((s) => {
                const count = sectorCounts[s] ?? 0
                return (
                  <button
                    key={s}
                    onClick={() => { setFilterSector(s); setTab('queue') }}
                    className={`p-4 rounded-2xl border-2 text-left hover:shadow-md active:scale-95 transition-all ${heatColor(count)}`}
                  >
                    <p className="font-semibold text-sm">{s}</p>
                    <p className="text-2xl font-bold mt-1">{count}</p>
                    <p className="text-xs opacity-70">open issues</p>
                  </button>
                )
              })}
            </div>
            <div className="flex gap-4 mt-5 text-xs text-latte-500">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-300 inline-block"/>4+ issues</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-300 inline-block"/>2-3 issues</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-green-300 inline-block"/>0-1 issues</span>
            </div>
          </>
        )}

        {/* ALERTS */}
        {tab === 'alerts' && (
          <>
            <h2 className="font-semibold text-latte-900 mb-1">Pattern Alerts</h2>
            <p className="text-latte-400 text-xs mb-4">Sectors with 3+ complaints in same category</p>
            {patterns.length === 0 ? (
              <div className="card text-center py-10">
                <AlertTriangle size={36} className="text-latte-300 mx-auto mb-2" />
                <p className="text-latte-400 text-sm">No patterns detected</p>
              </div>
            ) : (
              <div className="space-y-3">
                {patterns.map((p) => {
                  const key = `${p.sector}::${p.category}`
                  const catLabel = COMPLAINT_CATEGORIES.find((c) => c.id === p.category)?.label ?? p.category
                  const isResolved = resolvedAlerts.includes(key)
                  return (
                    <div key={key} className={`card ${isResolved ? 'opacity-50' : ''}`}>
                      <div className="flex items-start gap-2 mb-3">
                        <AlertTriangle size={18} className={isResolved ? 'text-latte-300' : 'text-amber-500'} />
                        <div>
                          <p className="font-semibold text-latte-800 text-sm">
                            {catLabel} — {p.count} complaints in {p.sector}
                          </p>
                          <p className="text-latte-400 text-xs mt-0.5">Reported this week</p>
                        </div>
                      </div>
                      {!isResolved && (
                        <button
                          onClick={() => handleAutoEscalate(key, p.ids)}
                          className="text-xs px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-xl hover:bg-red-100 font-medium transition-colors"
                        >
                          Auto-escalate to HR
                        </button>
                      )}
                      {isResolved && <p className="text-latte-400 text-xs">Escalated to HR</p>}
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}
        {/* AI SIGNALS */}
        {tab === 'ai' && (
          <>
            <div className="flex items-center gap-2 mb-4">
              <BrainCircuit size={18} className="text-latte-700" />
              <div>
                <h2 className="font-semibold text-latte-900">AI Intelligence Panel</h2>
                <p className="text-latte-400 text-xs">Loophole detection & integrity signals for Admin</p>
              </div>
            </div>
            <div className="space-y-3">
              {mockAISignals.filter(s => s.dashboard === 'admin').map(s => (
                <AISignalCard key={s.id} signal={s} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function StatBox({ label, value, bg, color }: { label: string; value: number; bg: string; color: string }) {
  return (
    <div className={`${bg} rounded-2xl p-4 text-center`}>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      <p className="text-latte-500 text-xs mt-0.5">{label}</p>
    </div>
  )
}
