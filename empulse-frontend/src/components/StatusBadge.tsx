import { ComplaintStatus } from '../data/mockComplaints'

interface Props {
  status: ComplaintStatus
  size?: 'sm' | 'md'
}

export default function StatusBadge({ status, size = 'md' }: Props) {
  const base = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-3 py-1'
  const map: Record<ComplaintStatus, string> = {
    pending: 'bg-amber-100 text-amber-700 border border-amber-200',
    escalated: 'bg-red-100 text-red-700 border border-red-200',
    resolved: 'bg-green-100 text-green-700 border border-green-200',
  }
  const label: Record<ComplaintStatus, string> = {
    pending: '● Pending',
    escalated: '▲ Escalated',
    resolved: '✓ Resolved',
  }

  return (
    <span className={`inline-block rounded-full font-medium ${base} ${map[status]}`}>
      {label[status]}
    </span>
  )
}
