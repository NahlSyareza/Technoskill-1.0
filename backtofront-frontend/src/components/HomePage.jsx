import react, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import DashboardElement from "./elements/DashboardElement";

export default function HomePage() {
  const navigate = useNavigate();
  const [getEmployee, setEmployee] = useState([]);
  const [getSearchName, setSearchName] = useState("");

  useState(() => {
    axios
      .get("http://localhost:476/employee/getAll")
      .then((res) => {
        const response = res.data;
        console.log(response);
        setEmployee(response.payload);
      })
      .catch((err) => {
        const error = err.data;
        console.log(error);
      });
  }, []);

  const handleSearch = (name) => {
    axios
      .get("http://localhost:476/employee/search", {
        params: {
          name: name,
        },
      })
      .then((res) => {
        const response = res.data;
        console.log(response);
        setEmployee(response.payload);
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
        <div className="bg-[#798DC5] w-[1400px] h-[841px] m-auto rounded-2xl flex">
          <ol className="mx-20 my-8 overflow-auto w-full">
            {getEmployee.map((it, id) => (
              <li
                key={it.name}
                className="text-white font-jetbrains-mono text-[20px] p-3 flex bg-[#737CCF] m-2 rounded-2xl"
                onClick={() => {
                  navigate(`/details/${it.uid}`);
                }}
              >
                <p className="w-[75px]">{id + 1}. </p>
                <p className="w-[500px]">{it.name}</p>
                <p className="w-[500px]">{it.division}</p>
                <p className="ml-auto">{it.salary}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}
