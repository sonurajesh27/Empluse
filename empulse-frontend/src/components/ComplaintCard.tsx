import { Complaint } from '../data/mockComplaints'
import StatusBadge from './StatusBadge'
import { COMPLAINT_CATEGORIES } from '../data/sectors'
import { Mic, FileText, AlertTriangle } from 'lucide-react'

interface Props {
  complaint: Complaint
  showActions?: boolean
  onEscalate?: (id: string) => void
  onResolve?: (id: string) => void
  onDetail?: (id: string) => void
}

function timeAgo(ts: string) {
  const diff = Date.now() - new Date(ts).getTime()
  const h = Math.floor(diff / 3600000)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

export default function ComplaintCard({ complaint, showActions, onEscalate, onResolve, onDetail }: Props) {
  const cat = COMPLAINT_CATEGORIES.find((c) => c.id === complaint.category)

  return (
    <div className="card p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="tag bg-latte-100 text-latte-700">{complaint.sector}</span>
          {cat && <span className="tag bg-latte-50 text-latte-600 border border-latte-200">{cat.label}</span>}
          {complaint.isVoice ? (
            <span className="tag bg-purple-50 text-purple-600 flex items-center gap-1"><Mic size={11} /> Voice</span>
          ) : (
            <span className="tag bg-gray-50 text-gray-500 flex items-center gap-1"><FileText size={11} /> Text</span>
          )}
        </div>
        <span className="text-latte-400 text-xs whitespace-nowrap shrink-0">{timeAgo(complaint.timestamp)}</span>
      </div>

      <div className="flex items-center justify-between gap-2">
        <p className="text-latte-700 text-sm font-medium">{complaint.subCategory}</p>
        <StatusBadge status={complaint.status} size="sm" />
      </div>

      <p className="text-latte-500 text-sm line-clamp-2">{complaint.text}</p>

      {complaint.raisedCount >= 3 && (
        <div className="flex items-center gap-1.5 bg-red-50 border border-red-200 rounded-xl px-3 py-1.5">
          <AlertTriangle size={14} className="text-red-500" />
          <span className="text-red-600 text-xs font-semibold">Pattern Detected — {complaint.raisedCount}x this sector</span>
        </div>
      )}

      {showActions && (
        <div className="flex gap-2 pt-1 flex-wrap">
          {complaint.status !== 'escalated' && (
            <button
              onClick={() => onEscalate?.(complaint.id)}
              className="text-xs px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded-xl hover:bg-red-100 font-medium transition-colors"
            >
              Escalate to HR
            </button>
          )}
          {complaint.status !== 'resolved' && (
            <button
              onClick={() => onResolve?.(complaint.id)}
              className="text-xs px-3 py-1.5 bg-green-50 text-green-600 border border-green-200 rounded-xl hover:bg-green-100 font-medium transition-colors"
            >
              ✓ Resolve
            </button>
          )}
          <button
            onClick={() => onDetail?.(complaint.id)}
            className="text-xs px-3 py-1.5 bg-latte-50 text-latte-600 border border-latte-200 rounded-xl hover:bg-latte-100 font-medium transition-colors"
          >
            → Details
          </button>
        </div>
      )}
    </div>
  )
}
