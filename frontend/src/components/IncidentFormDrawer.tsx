import React, { useEffect } from "react";
import { Drawer, Form, Input, Select, Button } from "antd";
import type { Status, Severity } from "../types/Incident";
import {
  statusLabelMap,
  severityLabelMap,
} from "../constants/colorLabelMappings";

import { IncidentFormDrawerProps } from "../types/Incident";

const IncidentFormDrawer: React.FC<IncidentFormDrawerProps> = ({
  visible,
  onClose,
  onSubmit,
  initialValues,
  isEdit = false,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [visible, initialValues, form]);

  const handleFinish = (values: any) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Drawer
      title={isEdit ? "Edit Incident" : "Create New Incident"}
      width={480}
      onClose={() => {
        form.resetFields();
        onClose();
      }}
      open={visible}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter a title" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select a status" }]}
        >
          <Select>
            {(Object.keys(statusLabelMap) as Status[]).map((status) => (
              <Select.Option key={status} value={status}>
                {statusLabelMap[status]}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Severity"
          name="severity"
          rules={[{ required: true, message: "Please select a severity" }]}
        >
          <Select>
            {(Object.keys(severityLabelMap) as Severity[]).map((severity) => (
              <Select.Option key={severity} value={severity}>
                {severityLabelMap[severity]}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {isEdit ? "Update Incident" : "Create Incident"}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default IncidentFormDrawer;
