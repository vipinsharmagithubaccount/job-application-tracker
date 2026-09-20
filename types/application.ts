export type ApplicationStatus =
  | "Applied"
  | "Interview"
  | "Rejected"
  | "Selected";

export interface JobApplication {
  id: string;
  companyName: string;
  jobRole: string;
  status: ApplicationStatus;
}