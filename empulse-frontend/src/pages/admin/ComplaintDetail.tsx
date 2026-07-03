import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, Mic, FileText, AlertTriangle, CheckCircle2, Wrench } from 'lucide-react'
import { Complaint, ComplaintStatus } from '../../data/mockComplaints'
import { COMPLAINT_CATEGORIES } from '../../data/sectors'
import StatusBadge from '../../components/StatusBadge'
import ComplaintTimeline, { getTimelineSteps } from '../../components/ComplaintTimeline'
import { getComplaintById } from '../../api/apiClient'

function timeAgo(ts: string) {
  const diff = Date.now() - new Date(ts).getTime()
  const h = Math.floor(diff / 3600000)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

function formatDate(ts: string) {
  return new Date(ts).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
}

export default function ComplaintDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [complaint, setComplaint] = useState<Complaint | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [flagConfirm, setFlagConfirm] = useState(false)
  const [flagged, setFlagged] = useState(false)

  useEffect(() => {
    if (id) {
      getComplaintById(id)
        .then((data) => { setComplaint(data); setLoading(false) })
        .catch(() => setLoading(false))
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-latte-50 flex items-center justify-center">
        <div className="text-latte-400 text-sm">Loading...</div>
      </div>
    )
  }

  if (!complaint) {
    return (
      <div className="min-h-screen bg-latte-50 flex items-center justify-center">
        <div className="card text-center p-8">
          <p className="text-latte-500">Complaint not found</p>
          <button onClick={() => navigate('/admin')} className="btn-primary mt-4 text-sm">← Back to Queue</button>
        </div>
      </div>
    )
  }

  const cat = COMPLAINT_CATEGORIES.find((c) => c.id === complaint.category)

  const updateStatus = (status: ComplaintStatus) => {
    setComplaint((prev) => prev ? { ...prev, status } : prev)
  }

  const timeline = [
    { label: 'Received', done: true, time: complaint.timestamp },
    { label: 'Under Review', done: complaint.status !== 'pending', time: complaint.status !== 'pending' ? complaint.timestamp : null },
    { label: 'Escalated to HR', done: complaint.status === 'escalated', time: complaint.status === 'escalated' ? complaint.timestamp : null },
    { label: 'Resolved', done: complaint.status === 'resolved', time: complaint.status === 'resolved' ? complaint.timestamp : null },
  ]

  return (
    <div className="min-h-screen bg-latte-50 max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-latte-700 px-4 pt-10 pb-4 sticky top-0 z-10">
        <button onClick={() => navigate('/admin')} className="flex items-center gap-1.5 text-latte-300 hover:text-white text-sm mb-3">
          <ChevronLeft size={18} /> Back to Queue
        </button>
        <div className="flex items-center justify-between">
          <h1 className="text-white font-bold text-lg">Complaint {complaint.id}</h1>
          <StatusBadge status={complaint.status} />
        </div>
      </div>

      <div className="px-4 py-5 space-y-4">
        {/* Resolution Timeline */}
        <ComplaintTimeline
          steps={getTimelineSteps(complaint)}
          hoursOpen={complaint.hoursOpen}
        />

        {/* Meta info */}
        <div className="card space-y-3">
          <div className="flex flex-wrap gap-2">
            <span className="tag bg-latte-100 text-latte-700">{complaint.sector}</span>
            {cat && <span className="tag bg-latte-50 text-latte-600 border border-latte-200">{cat.label}</span>}
            <span className="tag bg-latte-50 text-latte-500 border border-latte-100">{complaint.subCategory}</span>
            {complaint.isVoice ? (
              <span className="tag bg-purple-50 text-purple-600 flex items-center gap-1"><Mic size={11}/> Voice</span>
            ) : (
              <span className="tag bg-gray-50 text-gray-500 flex items-center gap-1"><FileText size={11}/> Text</span>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-latte-400">{formatDate(complaint.timestamp)}</span>
            <span className="text-latte-400">{timeAgo(complaint.timestamp)}</span>
          </div>

          {/* Confidence */}
          <div className="flex items-center justify-between bg-latte-50 rounded-xl px-3 py-2">
            <span className="text-latte-600 text-sm">AI Confidence Score</span>
            <span className={`font-bold text-sm ${complaint.confidenceScore >= 90 ? 'text-green-600' : complaint.confidenceScore >= 75 ? 'text-amber-600' : 'text-red-500'}`}>
              {complaint.confidenceScore}%
            </span>
          </div>

          {complaint.raisedCount > 1 && (
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
              <AlertTriangle size={15} className="text-amber-500 shrink-0" />
              <p className="text-amber-700 text-sm">Previously raised {complaint.raisedCount}x in this sector this month</p>
            </div>
          )}
        </div>

        {/* Full text */}
        <div className="card">
          <p className="text-latte-500 text-xs font-medium mb-2 uppercase tracking-wide">
            {complaint.isVoice ? 'Voice Recording — AI Transcription' : 'Complaint Text'}
          </p>
          <p className="text-latte-800 text-sm leading-relaxed">{complaint.text}</p>
        </div>

        {/* Timeline */}
        <div className="card">
          <p className="font-semibold text-latte-900 mb-4">Status History</p>
          <div className="space-y-3">
            {timeline.map((t, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5
                  ${t.done ? 'bg-latte-700' : 'bg-latte-100 border-2 border-latte-200'}`}>
                  {t.done && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${t.done ? 'text-latte-800' : 'text-latte-300'}`}>{t.label}</p>
                  {t.time && <p className="text-xs text-latte-400">{timeAgo(t.time)}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="card space-y-3">
          <p className="font-semibold text-latte-900">Actions</p>
          <div className="flex flex-col gap-2">
            {complaint.status !== 'escalated' && (
              <button onClick={() => updateStatus('escalated')}
                className="w-full py-3 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors flex items-center justify-center gap-2">
                <AlertTriangle size={16} /> Escalate to HR
              </button>
            )}
            {complaint.status !== 'resolved' && (
              <button onClick={() => updateStatus('resolved')}
                className="w-full py-3 bg-green-50 text-green-600 border border-green-200 rounded-xl text-sm font-medium hover:bg-green-100 transition-colors flex items-center justify-center gap-2">
                <CheckCircle2 size={16} /> Mark Resolved
              </button>
            )}
            {!flagged && !flagConfirm && (
              <button onClick={() => setFlagConfirm(true)}
                className="w-full py-3 bg-latte-50 text-latte-600 border border-latte-200 rounded-xl text-sm font-medium hover:bg-latte-100 transition-colors flex items-center justify-center gap-2">
                <Wrench size={16} /> Flag for Maintenance
              </button>
            )}
            {flagConfirm && !flagged && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 space-y-2">
                <p className="text-amber-700 text-sm font-medium">Confirm: Flag for Maintenance Team?</p>
                <div className="flex gap-2">
                  <button onClick={() => { setFlagged(true); setFlagConfirm(false) }} className="flex-1 py-2 bg-amber-500 text-white rounded-xl text-xs font-medium">Confirm</button>
                  <button onClick={() => setFlagConfirm(false)} className="flex-1 py-2 bg-white border border-amber-200 text-amber-600 rounded-xl text-xs font-medium">Cancel</button>
                </div>
              </div>
            )}
            {flagged && <p className="text-center text-amber-600 text-sm">✓ Flagged for Maintenance Team</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
