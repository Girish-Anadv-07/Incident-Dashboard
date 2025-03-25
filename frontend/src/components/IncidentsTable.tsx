import React, { useState } from "react";
import {
  Table,
  Button,
  Input,
  Space,
  Typography,
  Select,
  message,
  Divider,
} from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useQuery, useMutation } from "@apollo/client";
import { GET_INCIDENTS } from "../graphql/queries";
import {
  ADD_INCIDENT,
  UPDATE_INCIDENT,
  DELETE_INCIDENT,
} from "../graphql/mutations";
import {
  AddIncidentVariables,
  UpdateIncidentVariables,
  DeleteIncidentVariables,
  Incident,
} from "../types/Incident";
import {
  statusLabelMap,
  severityLabelMap,
} from "../constants/colorLabelMappings";
import { getIncidentTableColumns } from "./IncidentsTableColumns";
import IncidentFormDrawer from "./IncidentFormDrawer";
import IncidentViewDrawer from "./IncidentViewDrawer";
import CenteredSpinner from "./CenteredSpinner";
import dayjs from "dayjs";

const { Title } = Typography;

const IncidentsTable: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [activeGroup, setActiveGroup] = useState<
    "status" | "severity" | "createdAt" | "updatedAt" | null
  >(null);
  const [bufferFilters, setBufferFilters] = useState<string[]>([]);
  const [bufferGroup, setBufferGroup] = useState<typeof activeGroup>(null);
  const [open, setOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC" | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editIncident, setEditIncident] = useState<Incident | null>(null);
  const [viewIncident, setViewIncident] = useState<Incident | null>(null);
  const handleViewIncident = (incident: Incident) => {
    setViewIncident(incident);
  };

  // Date utility
  const getDateRange = (key: string) => {
    const now = dayjs();
    switch (key) {
      case "today":
        return {
          from: now.startOf("day").toISOString(),
          to: now.endOf("day").toISOString(),
        };
      case "week":
        return {
          from: now.subtract(7, "day").startOf("day").toISOString(),
          to: now.endOf("day").toISOString(),
        };
      case "month":
        return {
          from: now.subtract(30, "day").startOf("day").toISOString(),
          to: now.endOf("day").toISOString(),
        };
      default:
        return undefined;
    }
  };

  // Extract applied filters
  const filterGroup = selectedFilters[0]?.split(":")[0];
  const extractedValues = selectedFilters.map((item) => item.split(":")[1]);

  const status = filterGroup === "status" ? extractedValues : undefined;
  const severity = filterGroup === "severity" ? extractedValues : undefined;
  const createdRange =
    filterGroup === "createdAt" ? getDateRange(extractedValues[0]) : undefined;
  const updatedRange =
    filterGroup === "updatedAt" ? getDateRange(extractedValues[0]) : undefined;

  const { data, loading, refetch } = useQuery(GET_INCIDENTS, {
    variables: {
      page: currentPage,
      limit: pageSize,
      status,
      severity,
      createdRange,
      updatedRange,
      sortField: sortField || undefined,
      sortOrder: sortOrder || undefined,
    },
    fetchPolicy: "cache-and-network",
  });

  const [addIncident] = useMutation<any, AddIncidentVariables>(ADD_INCIDENT, {
    onError: () => message.error("Failed to add incident"),
    onCompleted: () => {
      message.success("Incident Added");
      refetch();
    },
  });

  const [updateIncident] = useMutation<any, UpdateIncidentVariables>(
    UPDATE_INCIDENT,
    {
      onError: () => message.error("Failed to update incident"),
      onCompleted: () => {
        message.success("Incident Updated");
        refetch();
      },
    }
  );

  const [deleteIncident] = useMutation<any, DeleteIncidentVariables>(
    DELETE_INCIDENT,
    {
      onError: () => message.error("Failed to delete incident"),
      onCompleted: () => {
        message.success("Incident Deleted");
        refetch();
      },
    }
  );

  const handleEditIncident = (incident: Incident) => {
    setEditIncident(incident);
    setDrawerVisible(true);
  };

  const handleSubmitIncident = (values: Partial<Incident>) => {
    if (editIncident) {
      updateIncident({ variables: { id: editIncident.id, ...values } });
    } else {
      addIncident({ variables: values as AddIncidentVariables });
    }
    setDrawerVisible(false);
  };

  const applyFilters = () => {
    if (bufferFilters.length === 0) {
      setSelectedFilters([]);
      setActiveGroup(null);
    } else {
      setSelectedFilters(bufferFilters);
      setActiveGroup(bufferGroup);
    }
    setOpen(false);
    // setBufferGroup(null);
  };

  const handleBufferChange = (values: string[]) => {
    if (values.length === 0) {
      setBufferFilters([]);
      setBufferGroup(null);
      return;
    }

    const latestGroup = values[values.length - 1].split(
      ":"
    )[0] as typeof activeGroup;

    if (!bufferGroup || latestGroup === bufferGroup) {
      setBufferFilters(values);
      setBufferGroup(latestGroup);
    } else {
      const filtered = values.filter((v) => v.startsWith(`${latestGroup}:`));
      setBufferFilters(filtered);
      setBufferGroup(latestGroup);
    }
  };

  const filteredData =
    data?.getIncidents.incidents.filter((incident: Incident) =>
      incident.title.toLowerCase().includes(searchText.toLowerCase())
    ) || [];

  const columns = getIncidentTableColumns(
    handleEditIncident,
    updateIncident,
    deleteIncident,
    handleViewIncident,
    sortField ?? undefined,
    sortOrder ?? undefined
  );

  if (loading) return <CenteredSpinner />;

  return (
    <div
      style={{
        background: "#fff",
        padding: 24,
        borderRadius: 10,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <Title level={4} style={{ margin: 0 }}>
          Incident Control Panel
        </Title>

        <Space wrap>
          <Input
            placeholder="Search Reports by Title"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 220 }}
          />

          <Select
            allowClear
            mode="multiple"
            placeholder="Filter by Status / Severity / Date"
            style={{ width: 370 }}
            open={open}
            value={bufferFilters}
            maxTagCount="responsive"
            onDropdownVisibleChange={(visible) => setOpen(visible)}
            onChange={handleBufferChange}
            onClear={() => {
              setBufferFilters([]);
              setSelectedFilters([]);
              setActiveGroup(null);
              setBufferGroup(null);
            }}
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider style={{ margin: "8px 0" }} />
                <div style={{ textAlign: "right", padding: "0 8px 4px" }}>
                  <Button type="primary" size="small" onClick={applyFilters}>
                    OK
                  </Button>
                </div>
              </>
            )}
          >
            <Select.OptGroup label="Status">
              {Object.entries(statusLabelMap).map(([key, label]) => (
                <Select.Option key={`status:${key}`} value={`status:${key}`}>
                  {label}
                </Select.Option>
              ))}
            </Select.OptGroup>

            <Select.OptGroup label="Severity">
              {Object.entries(severityLabelMap).map(([key, label]) => (
                <Select.Option
                  key={`severity:${key}`}
                  value={`severity:${key}`}
                >
                  {label}
                </Select.Option>
              ))}
            </Select.OptGroup>

            <Select.OptGroup label="Created At">
              <Select.Option value="createdAt:today">Today</Select.Option>
              <Select.Option value="createdAt:week">Past Week</Select.Option>
              <Select.Option value="createdAt:month">Past Month</Select.Option>
            </Select.OptGroup>

            <Select.OptGroup label="Updated At">
              <Select.Option value="updatedAt:today">Today</Select.Option>
              <Select.Option value="updatedAt:week">Past Week</Select.Option>
              <Select.Option value="updatedAt:month">Past Month</Select.Option>
            </Select.OptGroup>
          </Select>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditIncident(null);
              setDrawerVisible(true);
            }}
          >
            New Incident
          </Button>
        </Space>
      </div>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={filteredData}
        scroll={{ y: 470 }}
        pagination={{
          current: currentPage,
          pageSize,
          total: data?.getIncidents.totalCount,
          showSizeChanger: true,
          onChange: (page, size) => {
            setCurrentPage(page);
            setPageSize(size);
          },
        }}
        onChange={(pagination, filters, sorter) => {
          setCurrentPage(pagination.current || 1);
          setPageSize(pagination.pageSize || 10);

          if (!Array.isArray(sorter) && sorter.order) {
            setSortField(sorter.field as string);
            setSortOrder(sorter.order === "ascend" ? "ASC" : "DESC");
          } else {
            setSortField(null);
            setSortOrder(null);
          }
        }}
      />

      <IncidentFormDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        initialValues={editIncident || undefined}
        isEdit={!!editIncident}
        onSubmit={handleSubmitIncident}
      />
      <IncidentViewDrawer
        incident={viewIncident}
        visible={!!viewIncident}
        onClose={() => setViewIncident(null)}
      />
    </div>
  );
};

export default IncidentsTable;
