export type Status = "NEW" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";

export type Severity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";

export interface Incident {
  id: string;
  title: string;
  description: string;
  status: Status;
  severity: Severity;
  createdAt: string;
  updatedAt: string;
}

export interface ConfirmActionSelectProps<T extends string> {
  value: T;
  options: T[];
  labelMap: Record<T, string>;
  colorMap?: Record<T, string>;
  onConfirm: (newValue: T) => void;
  width?: number;
  confirmText?: string;
}

export interface IncidentFormDrawerProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: Partial<Incident>) => void;
  initialValues?: Partial<Incident>;
  isEdit?: boolean;
}

export type UpdateIncidentVariables = {
  id: string;
  status?: Status;
  severity?: Severity;
};

export type DeleteIncidentVariables = {
  id: string;
};

export type AddIncidentVariables = {
  title: string;
  description: string;
  status: Status;
  severity: Severity;
};
