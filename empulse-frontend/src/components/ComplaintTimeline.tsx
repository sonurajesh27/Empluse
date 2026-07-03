import { CheckCircle2, Circle, AlertCircle, Radio, Send, UserCheck, Shield, Eye, ThumbsUp } from 'lucide-react'

export interface TimelineStep {
  id: string
  label: string
  actor?: string
  timestamp?: string
  status: 'completed' | 'current' | 'future'
  delayed?: boolean
}

interface ComplaintTimelineProps {
  steps: TimelineStep[]
  hoursOpen?: number
}

const stepIcons: Record<string, React.ReactNode> = {
  raised: <Send size={14} />,
  received: <Eye size={14} />,
  review: <Radio size={14} />,
  escalated: <Shield size={14} />,
  hr_acted: <UserCheck size={14} />,
  resolved: <CheckCircle2 size={14} />,
  confirmed: <ThumbsUp size={14} />,
}

export function getTimelineSteps(complaint: {
  status: string
  timestamp: string
  hoursOpen: number
  auditLog?: { by: string; action: string; at: string; note?: string }[]
}): TimelineStep[] {
  const statusOrder = ['raised', 'received', 'review', 'escalated', 'hr_acted', 'resolved', 'confirmed']
  const statusLabels: Record<string, string> = {
    raised: 'Raised',
    received: 'Admin Received',
    review: 'Under Review',
    escalated: 'Escalated',
    hr_acted: 'HR Acted',
    resolved: 'Resolved',
    confirmed: 'Worker Confirmed',
  }

  // Determine current index based on complaint status
  let currentIndex = 0
  if (complaint.status === 'pending') currentIndex = 2
  else if (complaint.status === 'escalated') currentIndex = 3
  else if (complaint.status === 'resolved') currentIndex = 5

  return statusOrder.map((id, i) => ({
    id,
    label: statusLabels[id],
    actor: i === 0 ? 'Employee' : i <= 2 ? 'Admin' : i <= 4 ? 'HR Manager' : i === 5 ? 'System' : 'Worker',
    timestamp: i <= currentIndex ? complaint.timestamp : undefined,
    status: i < currentIndex ? 'completed' : i === currentIndex ? 'current' : 'future',
    delayed: i === currentIndex && complaint.hoursOpen > 48,
  }))
}

export default function ComplaintTimeline({ steps, hoursOpen }: ComplaintTimelineProps) {
  return (
    <div className="card">
      <p className="font-semibold text-latte-900 mb-4">Resolution Timeline</p>
      <div className="relative">
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1
          const icon = stepIcons[step.id] || <Circle size={14} />

          return (
            <div key={step.id} className="flex items-start gap-3 relative">
              {/* Vertical line */}
              {!isLast && (
                <div className={`absolute left-[15px] top-[30px] w-0.5 h-[calc(100%-6px)]
                  ${step.status === 'completed' ? 'bg-green-300' : 'bg-latte-200 border-dashed'}`}
                />
              )}

              {/* Icon circle */}
              <div className={`w-[30px] h-[30px] rounded-full flex items-center justify-center shrink-0 z-10 transition-all
                ${step.status === 'completed' ? 'bg-green-100 text-green-600' :
                  step.status === 'current' ? (step.delayed ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-latte-700 text-white animate-pulse') :
                  'bg-latte-100 text-latte-400 border-2 border-dashed border-latte-200'}`}
              >
                {step.status === 'completed' ? <CheckCircle2 size={14} /> : 
                 step.delayed ? <AlertCircle size={14} /> : icon}
              </div>

              {/* Content */}
              <div className={`pb-5 flex-1 ${isLast ? 'pb-0' : ''}`}>
                <p className={`text-sm font-medium
                  ${step.status === 'completed' ? 'text-green-700' :
                    step.status === 'current' ? (step.delayed ? 'text-red-700' : 'text-latte-900') :
                    'text-latte-400'}`}
                >
                  {step.label}
                  {step.delayed && (
                    <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                      Delayed ({hoursOpen}h+)
                    </span>
                  )}
                </p>
                {step.actor && (
                  <p className={`text-xs mt-0.5 ${step.status === 'future' ? 'text-latte-300' : 'text-latte-500'}`}>
                    {step.actor}
                  </p>
                )}
                {step.timestamp && step.status !== 'future' && (
                  <p className="text-xs text-latte-400 mt-0.5">
                    {new Date(step.timestamp).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
