export const departments = [
  { value: 'Nursing', label: 'Nursing' },
  { value: 'Accounting', label: 'Accounting' },
  { value: 'Cashier', label: 'Cashier' },
  { value: 'Records', label: 'Records' },
  { value: 'Engineering', label: 'Engineering' },
  { value: 'CADS', label: 'CADS' },
  { value: 'Maritime', label: 'Maritime' },
  { value: 'CCS', label: 'CCS' },
]

export const sortedDepartments = [...departments].sort((a, b) => a.label.localeCompare(b.label));