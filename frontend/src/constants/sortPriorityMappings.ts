import { Status, Severity } from "../types/Incident";

export const statusSortOrder: Record<Status, number> = {
  NEW: 1,
  IN_PROGRESS: 2,
  RESOLVED: 3,
  CLOSED: 4,
};

export const severitySortOrder: Record<Severity, number> = {
  CRITICAL: 1,
  HIGH: 2,
  MEDIUM: 3,
  LOW: 4,
};
