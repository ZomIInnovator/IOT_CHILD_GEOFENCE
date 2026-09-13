import { Tooltip } from "antd";
import { GrLogout } from "react-icons/gr";
import { useLogout } from "../services/Auth/authMutation";

const Header = () => {
  const { mutateLogout } = useLogout();

  return (
    <header className="flex items-center justify-between px-2">
      <div className="flex flex-col items-center justify-center">
        <span className="text-sm text-gray-500 font-bold">
          INVENTORY AND BUDGET MANAGEMENT
        </span>
      </div>
      <div className="bg-gray-100 py-2 px-2 rounded-md hover:bg-amber-100">
        <Tooltip title="Log-Out" placement="leftTop" color="#87d068">
          <GrLogout size={21} onClick={mutateLogout} />
        </Tooltip>
      </div>
    </header>
  );
};

export default Header;
