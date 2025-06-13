export type VacationRequestStatus = "pending" | "approved" | "rejected" | "cancelled";

export interface EmployeeVacationBalance {
  id: number;
  employee_id: number;
  year: number;
  accumulated_days: number;
  used_days: number;
  last_updated: string;
  policy_days_per_year: number;
  hire_anniversary: string | null;
  next_anniversary: string | null;
}

export interface VacationRequestDay {
  id: number;
  request_id: number;
  vacation_date: string; // YYYY-MM-DD
  is_half_day: boolean;
}

export interface VacationRequest {
  id: number;
  employee_id: number;
  status: VacationRequestStatus;
  requested_at: string;
  reviewed_at: string | null;
  total_days: number;
  decision_by: number | null;
  days: VacationRequestDay[];
  year: number; // Puedes calcularlo desde days[0].vacation_date o agregarlo en el backend
}