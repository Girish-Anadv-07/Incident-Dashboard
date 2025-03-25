import React from "react";
import { Layout, Typography } from "antd";
import { SecurityScanOutlined } from "@ant-design/icons";

const { Header } = Layout;
const { Title } = Typography;

const NavBar: React.FC = () => {
  return (
    <Header
      style={{
        display: "flex",
        position: "fixed",
        top: "0px",
        right: "0px",
        left: "0px",
        overflow: "hidden",
        alignItems: "center",
        background: "#001529",
        padding: "0 24px",
        zIndex: "999",
      }}
    >
      <SecurityScanOutlined
        style={{ fontSize: "24px", color: "#fff", marginRight: "12px" }}
      />
      <Title level={3} style={{ color: "#fff", margin: 0 }}>
        Incident Dashboard
      </Title>
    </Header>
  );
};

export default NavBar;
