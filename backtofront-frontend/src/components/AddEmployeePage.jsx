import react, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DashboardElement from "./elements/DashboardElement";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddEmployeePage() {
  const [getName, setName] = useState("");
  const [getDivision, setDivision] = useState("IT");
  const [getSalary, setSalary] = useState(0.0);
  const navigate = useNavigate();
  const divisiones = ["IT", "Marketing", "Finance", "HR"];

  const handleAdd = (name, division, salary) => {
    axios
      .post("http://localhost:476/employee/add", {
        name: name,
        division: division,
        salary: salary,
      })
      .then((res) => {
        const response = res.data;
        console.log(response);
        if (response.state) {
          toast.success(response.message, {
            onClose: () => {
              window.location.reload(true);
            },
          });
        }
      })
      .catch((err) => {
        const error = err.data;
        console.log(error);
      });
  };

  return (
    <>
      <div className="bg-[#CED1DA] h-screen w-screen flex">
        <DashboardElement />
        <div className="bg-[#2B2E63] w-[622px] h-[675px] m-auto rounded-2xl flex flex-col font-jetbrains-mono text-white">
          <p className="text-[30px] mx-auto mt-20">Add New Employee</p>
          <div className="mx-auto mt-10">
            <p className="text-[20px]">Name</p>
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="bg-[#BFCBCE] w-[343px] h-[41px] text-gray-700 px-2"
            />
          </div>
          <div className="mx-auto mt-10">
            <p className="text-[20px]">Division</p>
            <select
              className="bg-[#BFCBCE] w-[343px] h-[41px] font-jetbrains-mono text-gray-700"
              onChange={(e) => {
                setDivision(e.target.value);
              }}
            >
              {divisiones.map((it, id) => (
                <option key={it} value={it}>
                  {it}
                </option>
              ))}
            </select>
          </div>
          <div className="mx-auto mt-10">
            <p className="text-[20px]">Salary</p>
            <input
              onChange={(e) => {
                setSalary(e.target.value);
              }}
              className="bg-[#BFCBCE] w-[343px] h-[41px] text-gray-700 px-2"
            />
          </div>
          <div className="mx-auto mt-20">
            <button
              onClick={() => {
                handleAdd(getName, getDivision, getSalary);
              }}
              className="bg-[#6F90AF] p-2 px-3 rounded-2xl"
            >
              Add
            </button>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  );
}
