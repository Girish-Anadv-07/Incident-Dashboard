import React from "react";
import { Drawer, Descriptions, Tag } from "antd";
import type { Incident } from "../types/Incident";
import {
  statusLabelMap,
  statusColorMap,
  severityLabelMap,
  severityColorMap,
} from "../constants/colorLabelMappings";
import dayjs from "dayjs";

interface IncidentViewDrawerProps {
  visible: boolean;
  onClose: () => void;
  incident: Incident | null;
}

const IncidentViewDrawer: React.FC<IncidentViewDrawerProps> = ({
  visible,
  onClose,
  incident,
}) => {
  if (!incident) return null;

  return (
    <Drawer
      title={`Incident Details - ${incident.title}`}
      placement="right"
      width={480}
      onClose={onClose}
      open={visible}
    >
      <Descriptions column={1} bordered size="small">
        <Descriptions.Item label="Title">{incident.title}</Descriptions.Item>
        <Descriptions.Item label="Description">
          {incident.description}
        </Descriptions.Item>
        <Descriptions.Item label="Severity">
          <Tag color={severityColorMap[incident.severity]}>
            {severityLabelMap[incident.severity]}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color={statusColorMap[incident.status]}>
            {statusLabelMap[incident.status]}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Created At">
          {dayjs(Number(incident.createdAt)).format("MM/DD/YYYY, hh:mm A")}
        </Descriptions.Item>
        <Descriptions.Item label="Updated At">
          {dayjs(Number(incident.updatedAt)).format("MM/DD/YYYY, hh:mm A")}
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};

export default IncidentViewDrawer;
