import React, { useState } from "react";
import { Select, Popconfirm, Tag } from "antd";
import { ConfirmActionSelectProps } from "../types/Incident";

export const ConfirmActionSelect = <T extends string>({
  value,
  options,
  labelMap,
  colorMap,
  onConfirm,
  width = 130,
  confirmText = "Confirm?",
}: ConfirmActionSelectProps<T>) => {
  const [pendingValue, setPendingValue] = useState<T | null>(null);
  const [visible, setVisible] = useState(false);

  const handleChange = (newValue: T) => {
    if (newValue !== value) {
      setPendingValue(newValue);
      setVisible(true);
    }
  };

  const handleConfirm = async () => {
    if (pendingValue) {
      await onConfirm(pendingValue);
      setVisible(false);
    }
  };

  return (
    <Popconfirm
      title={confirmText}
      open={visible}
      onConfirm={handleConfirm}
      onCancel={() => setVisible(false)}
      okText="Yes"
      cancelText="No"
    >
      <Select
        value={value}
        onChange={handleChange}
        style={{ width }}
        variant="borderless"
      >
        {options.map((opt) => (
          <Select.Option key={opt} value={opt}>
            {colorMap ? (
              <Tag color={colorMap[opt]} style={{ margin: 0 }}>
                {labelMap[opt]}
              </Tag>
            ) : (
              labelMap[opt]
            )}
          </Select.Option>
        ))}
      </Select>
    </Popconfirm>
  );
};

export default ConfirmActionSelect;
