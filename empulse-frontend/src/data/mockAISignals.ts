// AI-generated signals surfaced across all dashboards

export interface AISignal {
  id: string
  type:
    | 'group-velocity'
    | 'sla-gaming'
    | 'vote-cluster'
    | 'session-anomaly'
    | 'synthetic-account'
    | 'coercion-pattern'
    | 'low-confidence'
    | 'confirmation-pending'
    | 'kanonymity'
    | 'owner-login-anomaly'
    | 'supervisor-change'
  severity: 'critical' | 'warning' | 'info'
  dashboard: 'employee' | 'admin' | 'hr' | 'owner'
  title: string
  detail: string
  affectedId?: string
  timestamp: string
  resolved: boolean
}

export const mockAISignals: AISignal[] = [
  // Loophole 5 — Group velocity (coordinated 15-day cycle bypass)
  {
    id: 'SIG-001',
    type: 'group-velocity',
    severity: 'warning',
    dashboard: 'admin',
    title: '⚠️ Group Velocity Flag',
    detail: '8 workers from Assembly Line A sub-group each submitted once about Supervisor Kannan within 15 days. Individual limits not breached but collective pattern is statistically abnormal. AI confidence this is genuine: 29%.',
    affectedId: 'Assembly Line A',
    timestamp: '17 Jan, 4:00pm',
    resolved: false,
  },

  // Loophole 6 — SLA gaming via "Under Review"
  {
    id: 'SIG-002',
    type: 'sla-gaming',
    severity: 'critical',
    dashboard: 'admin',
    title: '🕐 SLA Clock Running — Under Review Does Not Pause',
    detail: 'CMP-004 (Packaging — Facility) has been in "Under Review" for 14 hours. SLA clock is NOT paused. Only worker-confirmed resolution stops the timer. 34 hours remaining before auto-escalation to HR.',
    affectedId: 'CMP-004',
    timestamp: '16 Jan, 9:00am',
    resolved: false,
  },

  // Loophole 7 — Silence not acceptance
  {
    id: 'SIG-003',
    type: 'confirmation-pending',
    severity: 'warning',
    dashboard: 'admin',
    title: '⏳ Resolution Confirmation Pending',
    detail: 'CMP-009 (Canteen — Quality Control) marked resolved 31 hours ago. Worker has not confirmed. Auto-reopens in 17 hours if no response. Silence is NOT acceptance.',
    affectedId: 'CMP-009',
    timestamp: '16 Jan, 3:00pm',
    resolved: false,
  },

  // Loophole 8 — Vote cluster
  {
    id: 'SIG-004',
    type: 'vote-cluster',
    severity: 'warning',
    dashboard: 'hr',
    title: '🗳️ Vote Cluster Detected',
    detail: 'EMP-1003 (Arjun P.) received 6 of 7 votes from the same sub-group in Quality Control. Cross-sector votes: 1. Vote confidence score: Low (42%). Reward score adjusted with 0.3x same-team weight.',
    affectedId: 'EMP-1003',
    timestamp: '17 Jan, 8:00am',
    resolved: false,
  },

  // Loophole 9 — Session anomaly (fingerprint shared)
  {
    id: 'SIG-005',
    type: 'session-anomaly',
    severity: 'warning',
    dashboard: 'admin',
    title: '👤 Possible Identity Mismatch',
    detail: 'EMP-1001 (Ravi Kumar) session behavior deviates from baseline profile. Navigation speed 3x faster than usual. Touch pattern differs from last 8 sessions. Possible shared device access. Complaint submitted in this session is flagged for review.',
    affectedId: 'EMP-1001',
    timestamp: '17 Jan, 9:10am',
    resolved: false,
  },

  // Loophole 10 — Synthetic account
  {
    id: 'SIG-006',
    type: 'synthetic-account',
    severity: 'critical',
    dashboard: 'owner',
    title: '🤖 Synthetic Account Suspected',
    detail: 'EMP-1009 was registered 2 days ago. Submitted 3 complaints on day 1. No attendance record exists. All 3 complaints target the same supervisor. Account created during Admin session. AI confidence this is a ghost account: 81%.',
    affectedId: 'EMP-1009',
    timestamp: '16 Jan, 11:00am',
    resolved: false,
  },

  // Loophole 11 — K-anonymity triggered
  {
    id: 'SIG-007',
    type: 'kanonymity',
    severity: 'info',
    dashboard: 'admin',
    title: '🔒 K-Anonymity Protection Active',
    detail: 'Only 2 workers submitted feedback from Warehouse this week. Individual complaints are hidden and shown as aggregate only. Minimum 3 submissions required before individual entries are visible. This prevents re-identification.',
    affectedId: 'Warehouse',
    timestamp: '17 Jan, 12:00pm',
    resolved: false,
  },

  // Loophole 12 — Owner login anomaly
  {
    id: 'SIG-008',
    type: 'owner-login-anomaly',
    severity: 'critical',
    dashboard: 'owner',
    title: '⚠️ Anomalous Owner Login Detected',
    detail: 'Owner account logged in at 2:43am from a device not previously associated with this account. Location differs from usual pattern. If this was not you, your audit data may be at risk. Review recent actions in the Audit Log immediately.',
    affectedId: 'OWN-001',
    timestamp: '17 Jan, 2:43am',
    resolved: false,
  },

  // Loophole 13 — Coercion pattern
  {
    id: 'SIG-009',
    type: 'coercion-pattern',
    severity: 'critical',
    dashboard: 'owner',
    title: '🚨 Possible Worker Coercion Detected',
    detail: 'EMP-1002 (Meena S.) confirmed 3 resolutions as "Fixed" in the past 4 days after previously denying 6 consecutive resolutions. Sudden confirmation pattern shift is statistically abnormal. AI suspects external pressure. Escalated for confidential review.',
    affectedId: 'EMP-1002',
    timestamp: '17 Jan, 1:00pm',
    resolved: false,
  },

  // Loophole 14 — Low AI confidence
  {
    id: 'SIG-010',
    type: 'low-confidence',
    severity: 'warning',
    dashboard: 'admin',
    title: '🤖 Low AI Confidence — Manual Review Needed',
    detail: 'Voice complaint from Welding sector (CMP-007) transcribed with 58% confidence. Regional dialect detected — possible Coimbatore Tamil variant. Auto-categorization skipped. Requires human review before actioning.',
    affectedId: 'CMP-007',
    timestamp: '15 Jan, 7:46am',
    resolved: false,
  },

  // Loophole 3 — Supervisor change
  {
    id: 'SIG-011',
    type: 'supervisor-change',
    severity: 'info',
    dashboard: 'admin',
    title: '📋 Supervisor Change — History Segmented',
    detail: 'Assembly Line B supervisor changed on 10 Jan. All complaint history before this date has been segmented to previous supervisor tenure. New baseline established. Current complaints will not unfairly reflect previous supervisor\'s record.',
    affectedId: 'Assembly Line B',
    timestamp: '10 Jan, 9:00am',
    resolved: false,
  },
]

// Vote confidence helper
export interface VoteAnalysis {
  employeeId: string
  name: string
  totalVotes: number
  sameTeamVotes: number
  crossTeamVotes: number
  adjustedScore: number
  confidence: 'High' | 'Medium' | 'Low'
  flagged: boolean
}

export const voteAnalysis: VoteAnalysis[] = [
  { employeeId: 'EMP-1001', name: 'Ravi Kumar',  totalVotes: 7,  sameTeamVotes: 2, crossTeamVotes: 5, adjustedScore: 96, confidence: 'High',   flagged: false },
  { employeeId: 'EMP-1002', name: 'Meena S.',    totalVotes: 5,  sameTeamVotes: 3, crossTeamVotes: 2, adjustedScore: 78, confidence: 'Medium', flagged: false },
  { employeeId: 'EMP-1003', name: 'Arjun P.',    totalVotes: 7,  sameTeamVotes: 6, crossTeamVotes: 1, adjustedScore: 54, confidence: 'Low',    flagged: true  },
  { employeeId: 'EMP-1004', name: 'Suresh M.',   totalVotes: 4,  sameTeamVotes: 1, crossTeamVotes: 3, adjustedScore: 88, confidence: 'High',   flagged: false },
]
