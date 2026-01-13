
import { Employee, JobCard, MovementTimer, MovementType, MovementStatus, SparePart } from '../types';

export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: 'emp-1',
    name: 'Rahul Sharma',
    pan: 'ABCDE1234F',
    aadhaarMasked: 'XXXX-XXXX-1234',
    trustScore: 88,
    verifiedEmployments: 3,
    currentRole: 'Senior Sales Consultant',
    department: 'Showroom',
    lastUpdated: '2024-05-10',
    flags: 0,
    reviews: [
      {
        id: 'rev-1',
        category: 'Performance',
        rating: 5,
        remarks: 'Excellent target achievement for 3 consecutive quarters.',
        authorDealer: 'Elite Motors Hyundai',
        date: '2023-12-15',
        status: 'Confirmed'
      },
      {
        id: 'rev-2',
        category: 'Conduct',
        rating: 4,
        remarks: 'Disciplined and professional with customers.',
        authorDealer: 'Elite Motors Hyundai',
        date: '2024-01-20',
        status: 'Confirmed'
      }
    ]
  },
  {
    id: 'emp-2',
    name: 'Amit Varma',
    pan: 'VWXYZ9876Q',
    aadhaarMasked: 'XXXX-XXXX-5678',
    trustScore: 45,
    verifiedEmployments: 1,
    currentRole: 'Sales Executive',
    department: 'Showroom',
    lastUpdated: '2024-04-22',
    flags: 1,
    reviews: [
      {
        id: 'rev-3',
        category: 'Risk',
        rating: 1,
        remarks: 'Employee absconded without handing over CRM credentials and collection cash (INR 12,000).',
        evidenceId: 'DOC-9921',
        authorDealer: 'City Wheels Maruti',
        date: '2024-03-01',
        status: 'Confirmed'
      }
    ]
  }
];

export const MOCK_MOVEMENTS: MovementTimer[] = [
  {
    id: 'mov-1',
    regNo: 'KA01MH1234',
    model: 'Creta 2024',
    type: MovementType.TEST_DRIVE,
    staffName: 'Rahul Sharma',
    startTime: Date.now() - (20 * 60 * 1000), // 20 mins ago
    durationMinutes: 30,
    status: MovementStatus.ACTIVE,
    escortedLevel: 0
  },
  {
    id: 'mov-2',
    regNo: 'KA03NB5678',
    model: 'Verna 1.5 Turbo',
    type: MovementType.TEST_DRIVE,
    staffName: 'Sanjay Kumar',
    startTime: Date.now() - (55 * 60 * 1000), // 55 mins ago
    durationMinutes: 45,
    status: MovementStatus.OVERDUE,
    escortedLevel: 2
  }
];

export const MOCK_JOB_CARDS: JobCard[] = [
  {
    id: 'JC-99201',
    regNo: 'KA51P2233',
    advisor: 'Vikram Singh',
    agingDays: 3,
    reasonCode: 'Waiting for Part',
    status: 'OEM Review',
    mdActionRequired: true
  },
  {
    id: 'JC-99205',
    regNo: 'KA04L4455',
    advisor: 'Anjali P',
    agingDays: 1,
    status: 'Submitted',
    mdActionRequired: false
  }
];

export const MOCK_SPARES: SparePart[] = [
  { id: 'P-001', partNo: 'H-92101-1', name: 'Brake Pad Set (Front)', onHand: 42, minLevel: 10, category: 'Customer' },
  { id: 'P-002', partNo: 'H-11223-9', name: 'Oil Filter', onHand: 156, minLevel: 50, category: 'Customer' },
  { id: 'P-003', partNo: 'H-99887-W', name: 'Headlamp Assy (Warranty)', onHand: 5, minLevel: 2, category: 'Warranty' },
];
