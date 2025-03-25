import React from "react";
import { Layout } from "antd";
import NavBar from "./components/NavBar";
import IncidentsTable from "./components/IncidentsTable";

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <NavBar />
      <Content style={{ padding: "90px 50px 0px 50px" }}>
        <IncidentsTable />
      </Content>
    </Layout>
  );
};

export default App;
