export const SECTORS = [
  'Assembly Line A',
  'Assembly Line B',
  'Packaging',
  'Quality Control',
  'Welding',
  'Paint Shop',
  'Warehouse',
  'Maintenance',
]

export interface ComplaintCategoryDef {
  id: string
  label: string
  icon: string
  color: string
  subCategories: string[]
}

export const COMPLAINT_CATEGORIES: ComplaintCategoryDef[] = [
  {
    id: 'supervisor',
    label: 'Supervisor',
    icon: 'UserX',
    color: 'orange',
    subCategories: ['Rude behaviour', 'Favouritism', 'Unclear instructions', 'Forced overtime', 'Verbal abuse', 'Discrimination'],
  },
  {
    id: 'facility',
    label: 'Bathroom / Facility',
    icon: 'Building2',
    color: 'blue',
    subCategories: ['Toilet not clean', 'Lock broken', 'No water in bathroom', 'Overcrowded locker room', 'No rest area'],
  },
  {
    id: 'food',
    label: 'Canteen / Food',
    icon: 'UtensilsCrossed',
    color: 'green',
    subCategories: ['Food quality poor', 'Food not on time', 'Break too short', 'Canteen unhygienic', 'Not enough quantity'],
  },
  {
    id: 'safety',
    label: 'Safety',
    icon: 'ShieldAlert',
    color: 'red',
    subCategories: ['Machine breakdown ignored', 'Floor wet/slippery', 'No safety equipment', 'Fire exit blocked', 'Poor lighting', 'Electrical hazard'],
  },
  {
    id: 'maintenance',
    label: 'Maintenance',
    icon: 'Wrench',
    color: 'yellow',
    subCategories: ['Machine not repaired', 'Tool missing', 'Equipment damaged', 'Noise level high', 'No ventilation'],
  },
  {
    id: 'health',
    label: 'Health / Environment',
    icon: 'Heart',
    color: 'pink',
    subCategories: ['Too hot on floor', 'Dust/fume exposure', 'Medical room unavailable', 'Forced to work sick', 'No drinking water'],
  },
  {
    id: 'pay',
    label: 'Pay & HR',
    icon: 'Banknote',
    color: 'purple',
    subCategories: ['Salary delayed', 'Wrong deductions', 'Leave not approved', 'PF/ESI not updated', 'No payslip'],
  },
  {
    id: 'other',
    label: 'Other',
    icon: 'MessageSquare',
    color: 'gray',
    subCategories: ['General concern', 'Suggestion', 'Something else'],
  },
]
