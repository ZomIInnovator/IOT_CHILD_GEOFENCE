import { Flex, Menu } from "antd";
import { GrMapLocation, GrDashboard, GrUser } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const SidebarMenu = () => {
  const navigate = useNavigate();
  const items = [
    getItem("Dashboard", "/", <GrDashboard />),

    getItem("Manage", "/ta-container", <GrUser />, [
      getItem("Guardian", "/records"),
      getItem("System User", "/ta-request-draft"),
    ]),
  ];

  return (
    <>
      <Flex align="center" justify="center" className="h-16 border-gray-300">
        <div className="logo flex gap-2 items-center">
          <GrMapLocation style={{ fontSize: "40px", color: "#1890ff" }} />
          <p className="font-mono font-extrabold">CPHTS</p>
        </div>
      </Flex>
      <Menu
        mode="inline"
        theme="light"
        defaultSelectedKeys={["/"]}
        onClick={(item) => {
          navigate(item.key);
        }}
        items={items}
      />
    </>
  );
};

export default SidebarMenu;
