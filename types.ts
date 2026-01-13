
export type Role = 'MD' | 'HR' | 'ShowroomManager' | 'SalesConsultant' | 'GateSecurity' | 'ServiceManager' | 'WarrantyCoordinator' | 'SparesManager';

export interface User {
  id: string;
  name: string;
  role: Role;
  branch: string;
  email: string;
}

export enum MovementType {
  TEST_DRIVE = 'Test Drive',
  WASHING = 'Washing',
  SERVICE = 'Service',
  REFUEL = 'Refuel',
  STOCK_TRANSFER = 'Stock Transfer',
  OTHER = 'Other'
}

export enum MovementStatus {
  ACTIVE = 'Active',
  DUE_SOON = 'Due Soon',
  OVERDUE = 'Overdue',
  RETURNED = 'Returned'
}

export interface MovementTimer {
  id: string;
  regNo: string;
  model: string;
  type: MovementType;
  staffName: string;
  startTime: number;
  durationMinutes: number;
  status: MovementStatus;
  escortedLevel: number;
}

export interface EmployeeReview {
  id: string;
  category: 'Performance' | 'Conduct' | 'Risk' | 'Integrity' | 'Exit';
  rating: number; // 1-5
  remarks: string;
  evidenceId?: string;
  authorDealer: string;
  date: string;
  status: 'Confirmed' | 'Under Dispute' | 'Resolved';
  employeeResponse?: string;
}

export interface Employee {
  id: string;
  name: string;
  pan: string;
  aadhaarMasked: string;
  trustScore: number;
  verifiedEmployments: number;
  currentRole?: string;
  department?: string;
  reviews: EmployeeReview[];
  flags: number;
  lastUpdated: string;
}

export interface JobCard {
  id: string;
  regNo: string;
  advisor: string;
  agingDays: number;
  reasonCode?: string;
  status: 'Draft' | 'Submitted' | 'OEM Review' | 'Approved' | 'Rejected' | 'Paid';
  mdActionRequired: boolean;
}

export interface SparePart {
  id: string;
  partNo: string;
  name: string;
  onHand: number;
  minLevel: number;
  category: 'Customer' | 'Warranty' | 'Internal';
}
