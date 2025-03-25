import { Space, Button, Popconfirm } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { Incident, Status, Severity } from "../types/Incident";
import {
  statusColorMap,
  statusLabelMap,
  severityColorMap,
  severityLabelMap,
} from "../constants/colorLabelMappings";
import { ConfirmActionSelect } from "./ConfirmActionSelect";
import type { MutationFunction } from "@apollo/client";
import dayjs from "dayjs";

export const getIncidentTableColumns = (
  onEdit: (incident: Incident) => void,
  updateIncident: MutationFunction<
    any,
    { id: string; status?: Status; severity?: Severity }
  >,
  deleteIncident: MutationFunction<any, { id: string }>,
  onView: (incident: Incident) => void,
  sortField?: string,
  sortOrder?: "ASC" | "DESC"
): ColumnsType<Incident> => [
  {
    title: "ID",
    key: "rowId",
    width: 70,
    render: (_: any, __: Incident, index: number) => index + 1,
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    sorter: true,
    sortOrder:
      sortField === "title"
        ? sortOrder === "ASC"
          ? "ascend"
          : sortOrder === "DESC"
          ? "descend"
          : null
        : null,
    render: (text: string, record: Incident) => (
      <Button type="link" style={{ padding: 0 }} onClick={() => onView(record)}>
        {text}
      </Button>
    ),
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Severity",
    dataIndex: "severity",
    key: "severity",
    width: 150,
    filters: Object.entries(severityLabelMap).map(([key, label]) => ({
      text: label,
      value: key,
    })),
    onFilter: (value, record) => record.severity === value,
    sorter: true,
    sortOrder:
      sortField === "severity"
        ? sortOrder === "ASC"
          ? "ascend"
          : sortOrder === "DESC"
          ? "descend"
          : null
        : null,
    render: (severity: Severity, record: Incident) => (
      <ConfirmActionSelect
        confirmText="Confirm Severity Change?"
        value={severity}
        options={Object.keys(severityLabelMap) as Severity[]}
        labelMap={severityLabelMap}
        colorMap={severityColorMap}
        onConfirm={(newSeverity: Severity) =>
          updateIncident({
            variables: { id: record.id, severity: newSeverity },
          })
        }
      />
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 150,
    filters: Object.entries(statusLabelMap).map(([key, label]) => ({
      text: label,
      value: key,
    })),
    onFilter: (value, record) => record.status === value,
    sorter: true,
    sortOrder:
      sortField === "status"
        ? sortOrder === "ASC"
          ? "ascend"
          : sortOrder === "DESC"
          ? "descend"
          : null
        : null,
    render: (status: Status, record: Incident) => (
      <ConfirmActionSelect
        confirmText="Confirm Status Change?"
        value={status}
        options={Object.keys(statusLabelMap) as Status[]}
        labelMap={statusLabelMap}
        colorMap={statusColorMap}
        onConfirm={(newStatus: Status) =>
          updateIncident({
            variables: { id: record.id, status: newStatus },
          })
        }
      />
    ),
  },
  {
    title: "Created",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 180,
    sorter: true,
    sortOrder:
      sortField === "createdAt"
        ? sortOrder === "ASC"
          ? "ascend"
          : sortOrder === "DESC"
          ? "descend"
          : null
        : null,
    render: (timestamp: string | number) =>
      dayjs(Number(timestamp)).format("YYYY/MM/DD, HH:mm:ss"),
  },
  {
    title: "Updated",
    dataIndex: "updatedAt",
    key: "updatedAt",
    width: 180,
    sorter: true,
    sortOrder:
      sortField === "updatedAt"
        ? sortOrder === "ASC"
          ? "ascend"
          : sortOrder === "DESC"
          ? "descend"
          : null
        : null,
    render: (timestamp: string | number) =>
      dayjs(Number(timestamp)).format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    title: "Actions",
    key: "actions",
    width: 100,
    render: (_: any, record: Incident) => (
      <Space size={4}>
        <Button
          icon={<EditOutlined />}
          type="text"
          onClick={() => onEdit(record)}
        />
        <Popconfirm
          title="Proceed with deletion?"
          onConfirm={() => deleteIncident({ variables: { id: record.id } })}
          okText="Yes"
          cancelText="No"
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
        >
          <Button icon={<DeleteOutlined />} type="text" danger />
        </Popconfirm>
      </Space>
    ),
  },
];
