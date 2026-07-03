export interface AuditEvent {
  id: string
  timestamp: string
  actor: string
  actorRole: string
  action: string
  target: string
  complaintId?: string
  severity: 'info' | 'warning' | 'critical'
}

export const mockAuditLog: AuditEvent[] = [
  {
    id: 'AUD-001',
    timestamp: '17 Jan, 3:31pm',
    actor: 'EmPulse AI',
    actorRole: 'System',
    action: 'Fake resolution flagged',
    target: 'CMP-003 (Canteen complaint)',
    complaintId: 'CMP-003',
    severity: 'critical',
  },
  {
    id: 'AUD-002',
    timestamp: '17 Jan, 3:30pm',
    actor: 'Anonymous Worker',
    actorRole: 'Employee',
    action: 'Denied resolution — issue not fixed',
    target: 'CMP-003 (Canteen complaint)',
    complaintId: 'CMP-003',
    severity: 'warning',
  },
  {
    id: 'AUD-003',
    timestamp: '17 Jan, 2:00pm',
    actor: 'Murugan A.',
    actorRole: 'Admin',
    action: 'Marked complaint resolved (no fix done)',
    target: 'CMP-003 (Canteen complaint)',
    complaintId: 'CMP-003',
    severity: 'critical',
  },
  {
    id: 'AUD-004',
    timestamp: '16 Jan, 9:01am',
    actor: 'System',
    actorRole: 'Auto-escalation',
    action: 'Escalated to Owner — HR SLA breached (72hr)',
    target: 'CMP-005 (Safety — Welding)',
    complaintId: 'CMP-005',
    severity: 'critical',
  },
  {
    id: 'AUD-005',
    timestamp: '16 Jan, 11:01am',
    actor: 'System',
    actorRole: 'Auto-escalation',
    action: 'Escalated to HR — Admin SLA breached (48hr)',
    target: 'CMP-004 (Facility — Packaging)',
    complaintId: 'CMP-004',
    severity: 'warning',
  },
  {
    id: 'AUD-006',
    timestamp: '17 Jan, 9:05am',
    actor: 'EmPulse AI',
    actorRole: 'System',
    action: 'Coordinated complaint detected — sent to neutral review',
    target: 'CMP-006 (Supervisor targeting — 7 complaints in 4hrs)',
    complaintId: 'CMP-006',
    severity: 'warning',
  },
  {
    id: 'AUD-007',
    timestamp: '15 Jan, 6:00pm',
    actor: 'System',
    actorRole: 'Pattern detection',
    action: 'Auto-escalated to HR — 4 supervisor complaints same sector',
    target: 'CMP-001 (Supervisor — Assembly Line A)',
    complaintId: 'CMP-001',
    severity: 'warning',
  },
  {
    id: 'AUD-008',
    timestamp: '14 Jan, 11:30am',
    actor: 'Murugan A.',
    actorRole: 'Admin',
    action: 'Complaint received — no action taken for 48hr',
    target: 'CMP-004 (Facility — Packaging)',
    complaintId: 'CMP-004',
    severity: 'info',
  },
]

export interface SuppressorStat {
  name: string
  role: string
  fakeResolutions: number
  slaBreaches: number
  suppressionScore: number
}

export const suppressorStats: SuppressorStat[] = [
  { name: 'Murugan A.', role: 'Admin', fakeResolutions: 2, slaBreaches: 3, suppressionScore: 74 },
  { name: 'Priya HR', role: 'HR Manager', fakeResolutions: 0, slaBreaches: 2, suppressionScore: 38 },
]
