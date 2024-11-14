import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Users from "./Users";
import EditUser from "./EditUser";
import Header from "./Header";

function App() {
  return (
    <div className="w-full">
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<EditUser />} />
      </Routes>
    </div>
  );
}

export default App;
