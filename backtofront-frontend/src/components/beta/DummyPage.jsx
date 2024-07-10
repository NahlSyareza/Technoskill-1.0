import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DummyPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-[#CED1DA] h-screen w-screen flex">
        <button
          onClick={() => {
            toast.success("🦄 Wow so easy!", {
              onClose: () => {
                navigate("/login");
              },
            });
          }}
          className="bg-[#6F90AF] w-[84px] h-[56px] m-auto font-jetbrains-mono text-[20px] text-white rounded-2xl"
        >
          Login
        </button>
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
      </div>
    </>
  );
}
