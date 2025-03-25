import { Status, Severity } from "../types/Incident";

// Label text for each status
export const statusLabelMap: Record<Status, string> = {
  NEW: "New",
  IN_PROGRESS: "In Progress",
  RESOLVED: "Resolved",
  CLOSED: "Closed",
};

// Tag color for each status
export const statusColorMap: Record<Status, string> = {
  NEW: "blue",
  IN_PROGRESS: "orange",
  RESOLVED: "green",
  CLOSED: "gray",
};

// Label text for each severity level
export const severityLabelMap: Record<Severity, string> = {
  CRITICAL: "Critical",
  HIGH: "High",
  MEDIUM: "Medium",
  LOW: "Low",
};

// Tag color for each severity level
export const severityColorMap: Record<Severity, string> = {
  CRITICAL: "magenta",
  HIGH: "volcano",
  MEDIUM: "gold",
  LOW: "green",
};
