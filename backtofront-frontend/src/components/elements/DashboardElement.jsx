import person from "../../assets/person.svg";
import addPerson from "../../assets/addPerson.svg";
import home from "../../assets/home.svg";
import logout from "../../assets/logout.svg";
import login from "../../assets/login.svg";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DashboardElement() {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-[#2B2E63] h-screen w-[390px] flex flex-col">
        <p className="font-jetbrains-mono text-[30px] text-white mx-auto mt-[33px]">
          Dashboard
        </p>
        <div className="bg-[#BFCBCE] w-[343px] h-[5px] mx-auto my-5"></div>
        <div className="flex ml-5">
          <img src={person} />
          <p className="my-auto font-jetbrains-mono text-white ml-5 text-[20px]">
            My Info
          </p>
        </div>
        <div
          className="flex ml-5 mt-5"
          onClick={() => {
            toast.info("Returning to home page", {
              onClose: () => {
                navigate("/home");
              },
            });
          }}
        >
          <img src={home} />
          <p className="my-auto font-jetbrains-mono text-white ml-5 text-[20px]">
            Home
          </p>
        </div>
        <div
          className="flex ml-5 mt-5"
          onClick={() => {
            if (localStorage.getItem("loggedAccount") == null) {
              toast.info("No account is logged in!");
              return;
            }
            toast.info("Adding a new employee", {
              onClose: () => {
                navigate("/add");
              },
            });
          }}
        >
          <img src={addPerson} />
          <p className="my-auto font-jetbrains-mono text-white ml-5 text-[20px]">
            Add New Employee
          </p>
        </div>
        <div className="flex text-white font-jetbrains-mono text-[20px] mt-auto mb-5 mx-5 justify-between">
          <div
            className="flex flex-col"
            onClick={() => {
              toast.info("Going to login page", {
                onClose: () => {
                  navigate("/login");
                },
              });
            }}
          >
            <img src={login} />
            <p className="mx-auto">Login</p>
          </div>
          <div
            className="flex flex-col"
            onClick={() => {
              toast.info("Logging out user!", {
                onClose: () => {
                  localStorage.removeItem("loggedAccount");
                  navigate("/login");
                },
              });
            }}
          >
            <img src={logout} />
            <p className="mx-auto">Logout</p>
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
