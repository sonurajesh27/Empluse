const API_BASE = '/api'
const AI_BASE = '/api/ai'

// ── Auth ──
export async function loginWithPin(pin: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pin }),
  })
  if (!res.ok) throw new Error('Invalid PIN')
  return res.json()
}

// ── Employees ──
export async function getEmployees() {
  const res = await fetch(`${API_BASE}/employees`)
  return res.json()
}

// ── Complaints ──
export async function getComplaints(params?: { sector?: string; status?: string; category?: string }) {
  const query = new URLSearchParams()
  if (params?.sector) query.set('sector', params.sector)
  if (params?.status) query.set('status', params.status)
  if (params?.category) query.set('category', params.category)
  const url = query.toString() ? `${API_BASE}/complaints?${query}` : `${API_BASE}/complaints`
  const res = await fetch(url)
  return res.json()
}

export async function getComplaintById(id: string) {
  const res = await fetch(`${API_BASE}/complaints/${id}`)
  return res.json()
}

export async function createComplaint(complaint: {
  sector: string
  category: string
  subCategory: string
  text: string
  isVoice: boolean
  confidenceScore?: number
}) {
  const res = await fetch(`${API_BASE}/complaints`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...complaint,
      status: 'pending',
      biasFlag: 'none',
      slaBreached: false,
      raisedCount: 1,
      hoursOpen: 0,
    }),
  })
  return res.json()
}

export async function escalateComplaint(id: string) {
  const res = await fetch(`${API_BASE}/complaints/${id}/escalate`, { method: 'PUT' })
  return res.json()
}

export async function resolveComplaint(id: string, resolvedBy: string) {
  const res = await fetch(`${API_BASE}/complaints/${id}/resolve`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resolvedBy }),
  })
  return res.json()
}

export async function confirmComplaint(id: string, confirmed: boolean) {
  const res = await fetch(`${API_BASE}/complaints/${id}/confirm`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ confirmed }),
  })
  return res.json()
}

// ── Audit ──
export async function getAuditLog() {
  const res = await fetch(`${API_BASE}/audit`)
  return res.json()
}

// ── Rewards ──
export async function getRewards() {
  const res = await fetch(`${API_BASE}/rewards`)
  return res.json()
}

export async function getRewardsBySector(sector: string) {
  const res = await fetch(`${API_BASE}/rewards/sector/${encodeURIComponent(sector)}`)
  return res.json()
}

// ── AI Service ──
export async function analyzeText(text: string, language: string = 'en') {
  const res = await fetch(`${AI_BASE}/analyze-text`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, language }),
  })
  return res.json()
}

export async function analyzeVoice(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  const res = await fetch(`${AI_BASE}/analyze-voice`, {
    method: 'POST',
    body: formData,
  })
  return res.json()
}
