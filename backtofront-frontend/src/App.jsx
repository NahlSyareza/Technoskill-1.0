import { useState } from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import DummyPage from "./components/beta/DummyPage";
import DumpyPage from "./components/beta/DumpyPage";
import AddEmployeePage from "./components/AddEmployeePage";
import EmployeeDetailsPage from "./components/EmployeeDetailsPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace={true} />} />
          <Route path="/dummy" element={<DummyPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dumpy" element={<DumpyPage />} />
          <Route path="/add" element={<AddEmployeePage />} />
          <Route path="/details/:uid" element={<EmployeeDetailsPage />} />
          <Route
            path="/details"
            element={<Navigate to="/home" replace={true} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
