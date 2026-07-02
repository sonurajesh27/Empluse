export interface Employee {
  id: string
  name: string
  sector: string
  role: 'employee' | 'hr' | 'admin'
  roleType: 'technical' | 'non-technical'
  pin: string
}

export const mockEmployees: Employee[] = [
  { id: 'EMP-1001', name: 'Ravi Kumar',  sector: 'Assembly Line A', role: 'employee', roleType: 'non-technical', pin: '1001' },
  { id: 'EMP-1002', name: 'Meena S.',    sector: 'Packaging',        role: 'employee', roleType: 'non-technical', pin: '1002' },
  { id: 'EMP-1003', name: 'Arjun P.',    sector: 'Quality Control',  role: 'employee', roleType: 'technical',     pin: '1003' },
  { id: 'EMP-1004', name: 'Suresh M.',   sector: 'Welding',          role: 'employee', roleType: 'technical',     pin: '1004' },
  { id: 'EMP-1005', name: 'Lakshmi R.',  sector: 'Paint Shop',       role: 'employee', roleType: 'non-technical', pin: '1005' },
  { id: 'EMP-1006', name: 'Dinesh K.',   sector: 'Maintenance',      role: 'employee', roleType: 'technical',     pin: '1006' },
  { id: 'EMP-1007', name: 'Kavitha N.',  sector: 'Assembly Line B',  role: 'employee', roleType: 'non-technical', pin: '1007' },
  { id: 'EMP-1008', name: 'Muthu R.',    sector: 'Warehouse',        role: 'employee', roleType: 'non-technical', pin: '1008' },
  { id: 'EMP-2001', name: 'Priya HR',    sector: 'HR',               role: 'hr',       roleType: 'technical',     pin: '2001' },
  { id: 'ADM-001',  name: 'Admin User',  sector: 'Management',       role: 'admin',    roleType: 'technical',     pin: '0000' },
]
