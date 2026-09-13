import { Routes, Route, Navigate } from "react-router-dom";
import MainLayouts from "./screen/MainLayouts";
import Landing from "./components/Landing";
import Geomap from "./screen/Geomap";
import AuthLogin from "./screen/AuthLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./screen/dashboard/Dashboard";
import DashboardLayouts from "./screen/dashboard/DashboardLayouts";
import { Georecord } from "./screen/dashboard";
import AuthAccessCode from "./screen/AuthAccessCode";
import SystemUser from "./screen/dashboard/SystemUser";
import SignUp from "./screen/dashboard/SignUp";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayouts />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="/records" element={<Georecord />} />

        <Route path="/register" element={<SignUp />} />
        <Route path="/sysuser" element={<SystemUser />} />
      </Route>

      <Route path="/" element={<MainLayouts />}>
        <Route path="/landing" element={<Landing />} />
        <Route path="/access" element={<AuthAccessCode />} />
        <Route path="/map" element={<Geomap />} />
        <Route path="/auth" element={<AuthLogin />} />
      </Route>
    </Routes>
  );
}

export default App;
