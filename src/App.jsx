import { Routes, Route } from "react-router-dom";
import MainLayouts from "./screen/MainLayouts";
import Landing from "./components/Landing";
import Geomap from "./screen/Geomap";
import AuthLogin from "./screen/AuthLogin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayouts />}>
          <Route index element={<Landing />} />
          <Route path="/map" element={<Geomap />} />
          <Route path="/auth" element={<AuthLogin />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
