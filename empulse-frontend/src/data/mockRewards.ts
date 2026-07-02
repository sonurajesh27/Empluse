export interface RewardEntry {
  employeeId: string
  name: string
  sector: string
  score: number
  streak: number
  votes: number
  badges: string[]
}

export const mockRewards: RewardEntry[] = [
  { employeeId: 'EMP-1001', name: 'Ravi Kumar',  sector: 'Assembly Line A', score: 96, streak: 18, votes: 7,  badges: ['⭐ Star Performer', '🔥 Consistent'] },
  { employeeId: 'EMP-1002', name: 'Meena S.',    sector: 'Packaging',        score: 88, streak: 10, votes: 5,  badges: ['🤝 Team Player'] },
  { employeeId: 'EMP-1003', name: 'Arjun P.',    sector: 'Quality Control',  score: 91, streak: 14, votes: 6,  badges: ['🎯 Precision', '⭐ Star Performer'] },
  { employeeId: 'EMP-1004', name: 'Suresh M.',   sector: 'Welding',          score: 79, streak: 7,  votes: 3,  badges: ['🔥 Consistent'] },
  { employeeId: 'EMP-1005', name: 'Lakshmi R.',  sector: 'Paint Shop',       score: 84, streak: 9,  votes: 4,  badges: ['🤝 Team Player', '🎯 Precision'] },
  { employeeId: 'EMP-1006', name: 'Dinesh K.',   sector: 'Maintenance',      score: 93, streak: 21, votes: 8,  badges: ['⭐ Star Performer', '🔥 Consistent', '🛠️ Fixer'] },
  { employeeId: 'EMP-1007', name: 'Kavitha N.',  sector: 'Assembly Line B',  score: 72, streak: 5,  votes: 2,  badges: [] },
  { employeeId: 'EMP-1008', name: 'Muthu R.',    sector: 'Warehouse',        score: 81, streak: 12, votes: 4,  badges: ['🤝 Team Player'] },
]

export const mockFlightRisk = [
  { employeeId: 'EMP-1007', name: 'Kavitha N.',  sector: 'Assembly Line B', riskScore: 78, trend: 'Declining attendance, 3 unresolved complaints, low engagement score' },
  { employeeId: 'EMP-1002', name: 'Meena S.',    sector: 'Packaging',       riskScore: 65, trend: 'Repeated facility complaints, low rewards score this cycle' },
  { employeeId: 'EMP-1008', name: 'Muthu R.',    sector: 'Warehouse',       riskScore: 54, trend: 'Pay complaint filed, no follow-up in 7 days' },
]

export const sectorTrendData = [
  { week: 'W1', 'Assembly Line A': 4, 'Packaging': 2, 'Quality Control': 1, 'Welding': 5, 'Paint Shop': 3, 'Maintenance': 2, 'Warehouse': 1, 'Assembly Line B': 2 },
  { week: 'W2', 'Assembly Line A': 5, 'Packaging': 3, 'Quality Control': 2, 'Welding': 6, 'Paint Shop': 3, 'Maintenance': 1, 'Warehouse': 2, 'Assembly Line B': 1 },
  { week: 'W3', 'Assembly Line A': 3, 'Packaging': 4, 'Quality Control': 1, 'Welding': 4, 'Paint Shop': 4, 'Maintenance': 3, 'Warehouse': 1, 'Assembly Line B': 3 },
  { week: 'W4', 'Assembly Line A': 6, 'Packaging': 3, 'Quality Control': 2, 'Welding': 7, 'Paint Shop': 2, 'Maintenance': 2, 'Warehouse': 2, 'Assembly Line B': 2 },
  { week: 'W5', 'Assembly Line A': 4, 'Packaging': 5, 'Quality Control': 3, 'Welding': 5, 'Paint Shop': 5, 'Maintenance': 1, 'Warehouse': 3, 'Assembly Line B': 2 },
  { week: 'W6', 'Assembly Line A': 5, 'Packaging': 4, 'Quality Control': 2, 'Welding': 8, 'Paint Shop': 3, 'Maintenance': 2, 'Warehouse': 1, 'Assembly Line B': 2 },
]
