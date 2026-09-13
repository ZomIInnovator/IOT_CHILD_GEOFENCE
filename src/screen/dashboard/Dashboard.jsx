import { useUser } from "../../services/Auth/authQuery";

const Dashboard = () => {

  const { authUser } = useUser();

  return (
    <div className="grid grid-cols-2 w-full gap-2 rounded-2xl">
      <div className=" flex flex-col bg-amber-100 gap-2 shadow-sm px-4 py-4">
        <div className="text-2xl">User Information:</div>
        <div className="font-mono">Email address: {authUser.email}</div>
      </div>
     
    </div>
  );
};

export default Dashboard;
