import axios from "axios";
import react, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SimplePopupElement from "./elements/SimplePopupElement";
import DashboardElement from "./elements/DashboardElement";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [getName, setName] = useState("");
  const [getPassword, setPassword] = useState("");

  const handleLogin = (name, password) => {
    axios
      .get("http://localhost:476/manager/login", {
        params: {
          name: name,
          password: password,
        },
      })
      .then((res) => {
        const response = res.data;
        console.log(response);
        if (response.state) {
          toast.success(response.message, {
            onClose: () => {
              localStorage.setItem("loggedAccount", response.payload[0].name);
              navigate("/home");
            },
          });
        } else {
          toast.error(response.message);
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
        <div className="m-auto flex">
          <div className="bg-[#2B2E63] w-[622px] h-[564px] rounded-l-2xl font-jetbrains-mono text-white flex flex-col">
            <p className="text-[30px] mx-auto mt-12">Login Page</p>
            <div className="mx-auto mt-10">
              <p className="text-[20px]">Name</p>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="bg-[#BFCBCE] w-[343px] h-[41px] px-2 text-gray-700"
              />
            </div>
            <div className="mx-auto mt-10">
              <p className="text-[20px]">Password</p>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="bg-[#BFCBCE] w-[343px] h-[41px] px-2 text-gray-700"
              />
            </div>
            <u className="mt-10 mx-auto">
              <p
                onClick={() => {
                  toast.info("Registering new user!", {
                    onClose: () => {
                      navigate("/register");
                    },
                  });
                }}
              >
                Don't have an account? Register here!
              </p>
            </u>
            <div className="mx-auto mt-20">
              <button
                onClick={() => {
                  handleLogin(getName, getPassword);
                }}
                className="bg-[#6F90AF] rounded-2xl p-2"
              >
                Login
              </button>
            </div>
          </div>
          <div className="bg-[#798DC5] w-[200px] h-[564px] rounded-r-2xl"></div>
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
