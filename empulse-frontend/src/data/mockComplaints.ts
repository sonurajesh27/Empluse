export type ComplaintStatus = 'pending' | 'escalated' | 'resolved'
export type BiasFlag = 'none' | 'coordinated' | 'single-source' | 'fake-resolution'

export interface AuditEntry {
  action: string
  by: string
  at: string
  note?: string
}

export interface Complaint {
  id: string
  sector: string
  category: string
  subCategory: string
  text: string
  timestamp: string
  status: ComplaintStatus
  isVoice: boolean
  confidenceScore: number
  raisedCount: number
  biasFlag: BiasFlag
  slaBreached: boolean
  workerConfirmed?: boolean
  resolvedBy?: string
  resolvedAt?: string
  auditLog: AuditEntry[]
  hoursOpen: number
}

export const mockComplaints: Complaint[] = [
  {
    id: 'CMP-001',
    sector: 'Assembly Line A',
    category: 'supervisor',
    subCategory: 'Verbal abuse',
    text: 'Supervisor uses harsh language during morning briefings. Team is uncomfortable and scared to speak up.',
    timestamp: '2024-01-15T08:30:00',
    status: 'escalated',
    isVoice: false,
    confidenceScore: 92,
    raisedCount: 4,
    biasFlag: 'none',
    slaBreached: false,
    workerConfirmed: undefined,
    auditLog: [
      { action: 'Complaint raised', by: 'Anonymous Worker', at: '15 Jan, 8:30am' },
      { action: 'Received by Admin', by: 'Murugan A.', at: '15 Jan, 9:00am' },
      { action: 'Escalated to HR', by: 'System (pattern detected)', at: '15 Jan, 6:00pm', note: '4 similar complaints in sector' },
    ],
    hoursOpen: 56,
  },
  {
    id: 'CMP-002',
    sector: 'Assembly Line A',
    category: 'supervisor',
    subCategory: 'Forced overtime',
    text: 'Workers are asked to stay back without prior notice or extra pay. Happened 4 times this week.',
    timestamp: '2024-01-16T10:15:00',
    status: 'escalated',
    isVoice: true,
    confidenceScore: 87,
    raisedCount: 4,
    biasFlag: 'none',
    slaBreached: false,
    workerConfirmed: undefined,
    auditLog: [
      { action: 'Voice complaint raised', by: 'Anonymous Worker', at: '16 Jan, 10:15am' },
      { action: 'AI transcribed & categorized', by: 'EmPulse AI', at: '16 Jan, 10:16am' },
      { action: 'Escalated to HR', by: 'System (SLA)', at: '17 Jan, 10:15am' },
    ],
    hoursOpen: 38,
  },
  {
    id: 'CMP-003',
    sector: 'Canteen',
    category: 'food',
    subCategory: 'Food quality poor',
    text: 'Canteen food is cold and stale. Break time is only 15 minutes but queue takes 10 minutes.',
    timestamp: '2024-01-17T12:00:00',
    status: 'resolved',
    isVoice: false,
    confidenceScore: 95,
    raisedCount: 6,
    biasFlag: 'fake-resolution',
    slaBreached: false,
    workerConfirmed: false,
    resolvedBy: 'Murugan A. (Admin)',
    resolvedAt: '17 Jan, 2:00pm',
    auditLog: [
      { action: 'Complaint raised', by: 'Anonymous Worker', at: '17 Jan, 12:00pm' },
      { action: 'Marked Resolved', by: 'Murugan A.', at: '17 Jan, 2:00pm', note: 'Canteen contractor informed. Issue addressed.' },
      { action: '⚠️ Worker denied resolution', by: 'Anonymous Worker', at: '17 Jan, 3:30pm', note: 'Worker tapped: Still not fixed' },
      { action: 'Complaint Reopened', by: 'System (auto)', at: '17 Jan, 3:30pm' },
      { action: 'Fake Resolution Flagged', by: 'EmPulse AI', at: '17 Jan, 3:31pm', note: 'Admin has 2 unconfirmed resolutions this week' },
    ],
    hoursOpen: 72,
  },
  {
    id: 'CMP-004',
    sector: 'Packaging',
    category: 'facility',
    subCategory: 'Toilet not clean',
    text: 'Bathroom near packaging zone not cleaned in 3 days. Very unhygienic. Workers avoiding it.',
    timestamp: '2024-01-14T11:00:00',
    status: 'pending',
    isVoice: false,
    confidenceScore: 95,
    raisedCount: 3,
    biasFlag: 'none',
    slaBreached: true,
    workerConfirmed: undefined,
    auditLog: [
      { action: 'Complaint raised', by: 'Anonymous Worker', at: '14 Jan, 11:00am' },
      { action: 'Received by Admin', by: 'Murugan A.', at: '14 Jan, 11:30am' },
      { action: '⚠️ SLA Breached (48hr)', by: 'System', at: '16 Jan, 11:00am', note: 'No action taken by Admin' },
      { action: 'Auto-escalated to HR', by: 'System', at: '16 Jan, 11:01am' },
    ],
    hoursOpen: 84,
  },
  {
    id: 'CMP-005',
    sector: 'Welding',
    category: 'safety',
    subCategory: 'No safety equipment',
    text: 'Only 2 face shields for 8 welders. Workers taking turns. High injury risk.',
    timestamp: '2024-01-13T09:00:00',
    status: 'escalated',
    isVoice: false,
    confidenceScore: 98,
    raisedCount: 5,
    biasFlag: 'none',
    slaBreached: true,
    workerConfirmed: undefined,
    auditLog: [
      { action: 'Complaint raised', by: 'Anonymous Worker', at: '13 Jan, 9:00am' },
      { action: 'Pattern detected (5x same sector)', by: 'EmPulse AI', at: '13 Jan, 9:01am' },
      { action: 'Escalated to HR', by: 'System', at: '13 Jan, 9:02am' },
      { action: '⚠️ SLA Breached (72hr)', by: 'System', at: '16 Jan, 9:00am', note: 'HR took no action' },
      { action: 'Auto-escalated to Owner', by: 'System', at: '16 Jan, 9:01am' },
    ],
    hoursOpen: 120,
  },
  {
    id: 'CMP-006',
    sector: 'Assembly Line A',
    category: 'supervisor',
    subCategory: 'Rude behaviour',
    text: 'Supervisor Kannan shouted at me in front of everyone for a minor mistake. Very humiliating.',
    timestamp: '2024-01-17T09:00:00',
    status: 'pending',
    isVoice: false,
    confidenceScore: 31,
    raisedCount: 7,
    biasFlag: 'coordinated',
    slaBreached: false,
    workerConfirmed: undefined,
    auditLog: [
      { action: 'Complaint raised', by: 'Anonymous Worker', at: '17 Jan, 9:00am' },
      { action: '⚠️ Coordinated Pattern Detected', by: 'EmPulse AI', at: '17 Jan, 9:05am', note: '7 complaints about same supervisor within 4 hours from same sub-group. Confidence: 31%. Flagged for neutral review.' },
      { action: 'Sent to neutral review (not auto-escalated)', by: 'System', at: '17 Jan, 9:06am' },
    ],
    hoursOpen: 12,
  },
  {
    id: 'CMP-007',
    sector: 'Welding',
    category: 'safety',
    subCategory: 'Floor wet/slippery',
    text: 'Water leaking from cooling unit. Floor is slippery near machine 3. Someone will get hurt.',
    timestamp: '2024-01-15T07:45:00',
    status: 'pending',
    isVoice: true,
    confidenceScore: 89,
    raisedCount: 5,
    biasFlag: 'none',
    slaBreached: false,
    workerConfirmed: undefined,
    auditLog: [
      { action: 'Voice complaint raised', by: 'Anonymous Worker', at: '15 Jan, 7:45am' },
      { action: 'AI transcribed: Tamil → English', by: 'EmPulse AI', at: '15 Jan, 7:46am' },
      { action: 'Received by Admin', by: 'Murugan A.', at: '15 Jan, 8:00am' },
    ],
    hoursOpen: 48,
  },
  {
    id: 'CMP-008',
    sector: 'Paint Shop',
    category: 'health',
    subCategory: 'Dust/fume exposure',
    text: 'Paint fumes are unbearable. No ventilation. 3 workers had headaches yesterday.',
    timestamp: '2024-01-15T10:00:00',
    status: 'escalated',
    isVoice: false,
    confidenceScore: 96,
    raisedCount: 3,
    biasFlag: 'none',
    slaBreached: false,
    workerConfirmed: undefined,
    auditLog: [
      { action: 'Complaint raised', by: 'Anonymous Worker', at: '15 Jan, 10:00am' },
      { action: 'Escalated to HR', by: 'System (pattern)', at: '15 Jan, 10:01am' },
    ],
    hoursOpen: 44,
  },
  {
    id: 'CMP-009',
    sector: 'Warehouse',
    category: 'pay',
    subCategory: 'Salary delayed',
    text: 'Salary for December not credited. Mid-January already. No communication from HR.',
    timestamp: '2024-01-17T16:00:00',
    status: 'pending',
    isVoice: false,
    confidenceScore: 99,
    raisedCount: 1,
    biasFlag: 'none',
    slaBreached: false,
    workerConfirmed: undefined,
    auditLog: [
      { action: 'Complaint raised', by: 'Anonymous Worker', at: '17 Jan, 4:00pm' },
      { action: 'Received by Admin', by: 'Murugan A.', at: '17 Jan, 4:30pm' },
    ],
    hoursOpen: 8,
  },
  {
    id: 'CMP-010',
    sector: 'Quality Control',
    category: 'health',
    subCategory: 'No drinking water',
    text: 'Water cooler in QC section broken for a week. Workers buying water from outside pocket.',
    timestamp: '2024-01-17T11:00:00',
    status: 'pending',
    isVoice: false,
    confidenceScore: 93,
    raisedCount: 1,
    biasFlag: 'none',
    slaBreached: false,
    workerConfirmed: undefined,
    auditLog: [
      { action: 'Complaint raised', by: 'Anonymous Worker', at: '17 Jan, 11:00am' },
    ],
    hoursOpen: 14,
  },
]
