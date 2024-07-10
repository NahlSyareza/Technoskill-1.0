import react from "react";
import { useNavigate } from "react-router-dom";

export default function SimplePopupElement({ text, nav }) {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="fixed h-screen w-screen bg-black opacity-35"
        onClick={() => {
          console.log("Tour");
          navigate(nav);
        }}
      ></div>
      <div className="fixed w-[500px] h-[300px] bg-[#303655] rounded-2xl inset-0 mx-auto my-auto flex">
        <p className="font-jetbrains-mono text-white text-[20px] m-auto">
          {text}
        </p>
      </div>
    </>
  );
}
