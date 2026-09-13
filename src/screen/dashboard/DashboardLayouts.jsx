import { Outlet } from "react-router-dom";
import { Layout, Button } from "antd";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {GrLogout} from "react-icons/gr";
import SidebarMenu from "../../components/SidebarMenu";
import { useLogout } from "../../services/Auth/authMutation";

const { Header, Content, Footer, Sider } = Layout;

const DashboardLayouts = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { mutateLogout } = useLogout();

  return (
    <Layout>
      <Sider
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        width="250"
        className="max-h-full h-screen position-sticky top-0 left-0 z-20"
      >
        <SidebarMenu />
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0, background: "#fff" }}
          className="flex items-center justify-between"
        >
          <Button
            type="text"
            icon={collapsed ? <FaChevronLeft /> : <FaChevronRight />}
            onClick={() => setCollapsed(!collapsed)}
          />
          <p className="text-lg font-mono text-mauve-400-400">
            Child Protection and Heat Temperature Sensor IOT
          </p>
          <Button
            onClick={() => mutateLogout()}
            type={"primary"}
            icon={<GrLogout />}
            className="m-6"
            size={"medium"}
          />
        </Header>
        <Content className="flex flex-col gap-2 p-5">
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          <p className="text-gray-500 text-sm">
            Child Protection and Heat Temperature Sensor ©2026 Created by CHAN
            GROUP
          </p>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayouts;
