import { Route, Routes } from "react-router-dom";

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

