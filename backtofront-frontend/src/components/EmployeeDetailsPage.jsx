import react, { useEffect, useState } from "react";
import { useAsyncError, useNavigate, useParams } from "react-router-dom";
import employee from "../assets/employee.svg";
import axios from "axios";
import DashboardElement from "./elements/DashboardElement";

export default function EmployeeDetailsPage() {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [getName, setName] = useState("");
  const [getDivision, setDivision] = useState("");
  const [getSalary, setSalary] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:476/employee/get", {
        params: {
          uid: uid,
        },
      })
      .then((res) => {
        const response = res.data;
        console.log(response);
        setName(response.payload[0].name);
        setDivision(response.payload[0].division);
        setSalary(response.payload[0].salary);
      })
      .catch((err) => {
        const error = err.data;
        console.log(error);
      });
  });

  return (
    <>
      <div className="bg-[#CED1DA] w-screen h-screen flex">
        <DashboardElement />
        <div className="m-auto flex">
          <div className="bg-[#798DC5] w-[291px] h-[675px] rounded-l-2xl flex">
            <img src={employee} className="h-[200px] w-[200px] m-auto"></img>
          </div>
          <div className="bg-[#2B2E63] w-[622px] h-[675px] flex flex-col font-jetbrains-mono text-white">
            <p className="mx-auto mt-14 text-[30px]">Employee</p>
            <div className="mt-10 mx-auto">
              <p className="text-[20px]">Name</p>
              <div className="bg-[#BFCBCE] w-[343px] h-[41px] text-gray-700 p-2">
                {getName}
              </div>
            </div>
            <div className="mt-10 mx-auto">
              <p className="text-[20px]">Division</p>
              <div className="bg-[#BFCBCE] w-[343px] h-[41px] text-gray-700 p-2">
                {getDivision}
              </div>
            </div>
            <div className="mt-10 mx-auto">
              <p className="text-[20px]">Salary</p>
              <div className="bg-[#BFCBCE] w-[343px] h-[41px] text-gray-700 p-2">
                {getSalary}
              </div>
            </div>
            <div className="mt-10 mx-auto">
              <p className="text-[20px]">UID</p>
              <div className="bg-[#BFCBCE] w-[343px] h-auto text-gray-700 p-2">
                {uid}
              </div>
            </div>
          </div>
          <div className="bg-[#798DC5] w-[84px] h-[675px] rounded-r-2xl"></div>
        </div>
      </div>
    </>
  );
}
