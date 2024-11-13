import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Users from "./Users";
import EditUser from "./EditUser";

function App() {
  return (
    <>
      <div className="">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<EditUser />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

