export type InvestigationStatus = 'open' | 'under-investigation' | 'ai-report-ready' | 'resolved' | 'closed' | 'no-action'
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical'

export interface Evidence {
  id: string
  name: string
  type: 'pdf' | 'image' | 'video' | 'audio' | 'document' | 'text'
  uploadedBy: string
  uploadedAt: string
  size: string
}

export interface AIReport {
  summary: string
  evidenceQuality: string
  patternAnalysis: string[]
  attendanceAnalysis: string
  performanceAnalysis: string
  previousHistory: string[]
  credibilityScore: number
  riskLevel: RiskLevel
  recommendations: string[]
  nextSteps: string[]
  confidence: number
  disclaimer: string
}

export interface LegalCase {
  id: string
  employeeId: string
  complaintType: string
  department: string
  assignedHR: string
  assignedLegal: string
  status: InvestigationStatus
  riskLevel: RiskLevel
  confidenceScore: number
  createdAt: string
  description: string
  evidence: Evidence[]
  aiReport?: AIReport
  timeline: { step: string; actor: string; date: string; done: boolean }[]
  finalDecision?: string
}

export const mockLegalCases: LegalCase[] = [
  {
    id: 'LEG-001',
    employeeId: 'EMP-0042',
    complaintType: 'Harassment',
    department: 'Assembly Line A',
    assignedHR: 'Priya M.',
    assignedLegal: 'Advocate Ramesh K.',
    status: 'ai-report-ready',
    riskLevel: 'critical',
    confidenceScore: 87,
    createdAt: '2025-01-08',
    description: 'Worker reported inappropriate physical contact and verbal intimidation by Supervisor Kannan on 2 separate occasions (Jan 3 and Jan 6). Complaint was corroborated by one co-worker witness statement. Supervisor has prior warning on record from August 2024 for similar behaviour.',
    evidence: [
      { id: 'ev1', name: 'Written_Complaint_Worker_042.pdf', type: 'pdf', uploadedBy: 'Worker (EMP-0042)', uploadedAt: '2025-01-08', size: '245 KB' },
      { id: 'ev2', name: 'Witness_Statement_Rajan.pdf', type: 'pdf', uploadedBy: 'HR - Priya M.', uploadedAt: '2025-01-09', size: '180 KB' },
      { id: 'ev3', name: 'CCTV_Assembly_Jan3_Clip.mp4', type: 'video', uploadedBy: 'Security Team', uploadedAt: '2025-01-09', size: '48 MB' },
      { id: 'ev4', name: 'CCTV_Assembly_Jan6_Clip.mp4', type: 'video', uploadedBy: 'Security Team', uploadedAt: '2025-01-09', size: '52 MB' },
      { id: 'ev5', name: 'Prior_Warning_Letter_Kannan_Aug2024.pdf', type: 'pdf', uploadedBy: 'HR - Priya M.', uploadedAt: '2025-01-10', size: '120 KB' },
      { id: 'ev6', name: 'Attendance_Record_EMP042.pdf', type: 'pdf', uploadedBy: 'System', uploadedAt: '2025-01-10', size: '95 KB' },
      { id: 'ev7', name: 'Audio_Recording_Jan6.mp3', type: 'audio', uploadedBy: 'Worker (EMP-0042)', uploadedAt: '2025-01-10', size: '3.2 MB' },
      { id: 'ev8', name: 'Supervisor_Response_Statement.pdf', type: 'pdf', uploadedBy: 'Admin - Murugan A.', uploadedAt: '2025-01-11', size: '210 KB' },
    ],
    aiReport: {
      summary: 'Worker EMP-0042 reported inappropriate physical contact and verbal intimidation by Supervisor Kannan on 2 occasions (January 3 and January 6, 2025). One co-worker witness (Rajan) has corroborated the account. CCTV footage from both dates shows proximity and body language consistent with the complaint. Audio recording from Jan 6 contains raised voice and threatening language. Supervisor Kannan has a prior warning from August 2024 for similar behaviour toward a different worker.',
      evidenceQuality: 'Strong — 7 documents including video, audio, witness statement, and prior disciplinary record. Evidence is internally consistent and corroborated.',
      patternAnalysis: [
        'Supervisor Kannan has received 7 complaints in the last 6 months from 4 different workers',
        'Pattern of escalating behaviour: verbal → physical intimidation',
        'Incidents cluster around shift-end periods (fatigue/stress factor)',
        'Previous warning issued Aug 2024 — behaviour did not improve',
        'Assembly Line A has the highest complaint density in the factory',
      ],
      attendanceAnalysis: 'Worker EMP-0042 showed a 23% increase in absenteeism following the incidents (3 unplanned absences in 5 working days post-Jan 6). Prior attendance was 96% regular. Pattern suggests avoidance behaviour consistent with harassment claims.',
      performanceAnalysis: 'Worker EMP-0042 had consistent "Meets Expectations" ratings for 18 months. Performance score dropped from 4.1 to 3.2 in the week following Jan 6 incident. No prior disciplinary issues on record for the complainant.',
      previousHistory: [
        'Aug 2024 — Warning letter issued to Supervisor Kannan for verbal abuse (different complainant)',
        'Oct 2024 — Informal complaint about Kannan by EMP-0038, resolved with mediation',
        'Nov 2024 — Worker EMP-0042 raised facility complaint (unrelated, resolved normally)',
      ],
      credibilityScore: 87,
      riskLevel: 'critical',
      recommendations: [
        'Immediately suspend Supervisor Kannan from direct supervisory duties pending investigation conclusion',
        'Ensure Worker EMP-0042 is temporarily reassigned away from Assembly Line A',
        'Conduct formal disciplinary hearing within 7 working days',
        'Engage external harassment prevention counsellor for team debrief',
        'Review all complaints filed against Supervisor Kannan in the last 12 months',
        'Consider termination proceedings given repeated offence pattern',
      ],
      nextSteps: [
        'Schedule disciplinary hearing with Supervisor Kannan within 5 days',
        'Obtain legal opinion on termination risk and labor law compliance',
        'Document all evidence in sealed investigation file',
        'Inform Owner about critical risk and potential POSH Act implications',
        'Arrange counselling support for affected worker',
      ],
      confidence: 87,
      disclaimer: 'This report is AI-assisted and intended to support HR and Legal investigations. Final employment decisions must always be made by authorized human decision-makers. AI analysis does not constitute legal advice. All findings should be verified through formal investigation procedures.',
    },
    timeline: [
      { step: 'Complaint Submitted', actor: 'Worker EMP-0042', date: '2025-01-08', done: true },
      { step: 'HR Review', actor: 'Priya M.', date: '2025-01-09', done: true },
      { step: 'Forwarded to Legal', actor: 'Priya M.', date: '2025-01-09', done: true },
      { step: 'Evidence Uploaded', actor: 'Multiple', date: '2025-01-10', done: true },
      { step: 'AI Investigation', actor: 'EmPulse AI', date: '2025-01-11', done: true },
      { step: 'Report Generated', actor: 'EmPulse AI', date: '2025-01-11', done: true },
      { step: 'Owner + HR + Legal Review', actor: 'Pending', date: '', done: false },
      { step: 'Human Final Decision', actor: 'Pending', date: '', done: false },
    ],
  },
  {
    id: 'LEG-002',
    employeeId: 'EMP-0078',
    complaintType: 'Theft Allegation',
    department: 'Warehouse',
    assignedHR: 'Priya M.',
    assignedLegal: 'Advocate Ramesh K.',
    status: 'under-investigation',
    riskLevel: 'medium',
    confidenceScore: 62,
    createdAt: '2025-01-12',
    description: 'Warehouse supervisor reported missing inventory (12 units of copper wire rolls, approx. value ₹45,000). Access logs show EMP-0078 was the last person to access storage area B on the evening shift of Jan 11. Employee denies involvement and claims other workers also had access via shared badge.',
    evidence: [
      { id: 'ev9', name: 'Inventory_Discrepancy_Report.pdf', type: 'pdf', uploadedBy: 'Warehouse Supervisor', uploadedAt: '2025-01-12', size: '320 KB' },
      { id: 'ev10', name: 'Access_Log_StorageB_Jan11.pdf', type: 'document', uploadedBy: 'Security Team', uploadedAt: '2025-01-12', size: '85 KB' },
      { id: 'ev11', name: 'CCTV_Warehouse_Jan11_Night.mp4', type: 'video', uploadedBy: 'Security Team', uploadedAt: '2025-01-13', size: '128 MB' },
    ],
    timeline: [
      { step: 'Complaint Submitted', actor: 'Warehouse Supervisor', date: '2025-01-12', done: true },
      { step: 'HR Review', actor: 'Priya M.', date: '2025-01-12', done: true },
      { step: 'Forwarded to Legal', actor: 'Priya M.', date: '2025-01-13', done: true },
      { step: 'Evidence Uploaded', actor: 'Security Team', date: '2025-01-13', done: true },
      { step: 'AI Investigation', actor: 'Pending', date: '', done: false },
      { step: 'Report Generated', actor: 'Pending', date: '', done: false },
      { step: 'Owner + HR + Legal Review', actor: 'Pending', date: '', done: false },
      { step: 'Human Final Decision', actor: 'Pending', date: '', done: false },
    ],
  },
  {
    id: 'LEG-003',
    employeeId: 'EMP-0015',
    complaintType: 'Safety Negligence',
    department: 'Welding',
    assignedHR: 'Priya M.',
    assignedLegal: 'Advocate Ramesh K.',
    status: 'ai-report-ready',
    riskLevel: 'high',
    confidenceScore: 78,
    createdAt: '2025-01-06',
    description: 'Multiple workers (EMP-0015, EMP-0019, EMP-0022) reported that Welding Supervisor Senthil deliberately ignored safety hazard reports for 3 weeks. Broken shield on Press #1 was reported on Dec 18, Dec 26, and Jan 2 — no action taken. Worker EMP-0019 sustained minor burn injury on Jan 5 due to the unrepaired equipment.',
    evidence: [
      { id: 'ev12', name: 'Safety_Report_Dec18.pdf', type: 'pdf', uploadedBy: 'Worker EMP-0015', uploadedAt: '2025-01-06', size: '150 KB' },
      { id: 'ev13', name: 'Safety_Report_Dec26.pdf', type: 'pdf', uploadedBy: 'Worker EMP-0022', uploadedAt: '2025-01-06', size: '140 KB' },
      { id: 'ev14', name: 'Safety_Report_Jan2.pdf', type: 'pdf', uploadedBy: 'Worker EMP-0019', uploadedAt: '2025-01-06', size: '160 KB' },
      { id: 'ev15', name: 'Injury_Report_EMP019_Jan5.pdf', type: 'pdf', uploadedBy: 'Medical Room', uploadedAt: '2025-01-06', size: '280 KB' },
      { id: 'ev16', name: 'Photo_Broken_Shield_Press1.jpg', type: 'image', uploadedBy: 'Worker EMP-0015', uploadedAt: '2025-01-06', size: '4.5 MB' },
    ],
    aiReport: {
      summary: 'Three workers independently reported a broken safety shield on Press #1 in the Welding section over a 3-week period (Dec 18, Dec 26, Jan 2). Supervisor Senthil acknowledged receiving the reports but took no corrective action. On January 5, Worker EMP-0019 sustained a minor burn injury directly attributable to the unrepaired equipment. This constitutes willful safety negligence under factory regulations.',
      evidenceQuality: 'Moderate-Strong — 5 documents including 3 independent safety reports filed on different dates, a medical injury report, and photographic evidence. Reports are internally consistent with matching timelines.',
      patternAnalysis: [
        'Supervisor Senthil has a history of delayed maintenance responses (avg. 12 days vs 3-day standard)',
        'Welding section has 3x more safety complaints than any other department',
        'Pattern shows systematic deprioritization of safety reports in favour of production targets',
        'No evidence of malicious intent — likely negligence driven by production pressure',
      ],
      attendanceAnalysis: 'Worker EMP-0019 has been on medical leave since Jan 5 (burn injury). Workers EMP-0015 and EMP-0022 show no attendance anomalies. Their consistent presence strengthens the credibility of their reports.',
      performanceAnalysis: 'Supervisor Senthil has high production output scores (4.5/5) but consistently low safety compliance scores (2.1/5). This suggests prioritization of production over worker safety.',
      previousHistory: [
        'Sep 2024 — Safety audit flagged Welding section for overdue equipment maintenance',
        'Oct 2024 — Verbal warning issued to Supervisor Senthil regarding maintenance backlog',
        'Dec 2024 — Factory inspector noted 2 non-compliances in Welding section',
      ],
      credibilityScore: 78,
      riskLevel: 'high',
      recommendations: [
        'Immediately repair/replace broken shield on Press #1 — zero tolerance on safety equipment',
        'Issue formal written warning to Supervisor Senthil for safety negligence',
        'Conduct full safety audit of Welding section within 48 hours',
        'Review all pending maintenance requests across all sections',
        'Consider reassigning Supervisor Senthil if safety compliance does not improve within 14 days',
        'File incident report with factory inspector as required by regulation',
      ],
      nextSteps: [
        'Ensure Press #1 is taken offline until shield is repaired (immediate)',
        'Schedule formal meeting with Supervisor Senthil within 2 days',
        'Obtain medical clearance timeline for Worker EMP-0019',
        'Document incident for factory inspector compliance report',
        'Review insurance and compensation for injured worker',
      ],
      confidence: 78,
      disclaimer: 'This report is AI-assisted and intended to support HR and Legal investigations. Final employment decisions must always be made by authorized human decision-makers. AI analysis does not constitute legal advice. All findings should be verified through formal investigation procedures.',
    },
    timeline: [
      { step: 'Complaint Submitted', actor: 'Workers EMP-0015, EMP-0019, EMP-0022', date: '2025-01-06', done: true },
      { step: 'HR Review', actor: 'Priya M.', date: '2025-01-06', done: true },
      { step: 'Forwarded to Legal', actor: 'Priya M.', date: '2025-01-07', done: true },
      { step: 'Evidence Uploaded', actor: 'Multiple', date: '2025-01-07', done: true },
      { step: 'AI Investigation', actor: 'EmPulse AI', date: '2025-01-08', done: true },
      { step: 'Report Generated', actor: 'EmPulse AI', date: '2025-01-08', done: true },
      { step: 'Owner + HR + Legal Review', actor: 'Pending', date: '', done: false },
      { step: 'Human Final Decision', actor: 'Pending', date: '', done: false },
    ],
  },
]
