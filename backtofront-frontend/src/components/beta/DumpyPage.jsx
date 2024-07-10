export default function DumpyPage() {
  return (
    <>
      <div
        className="bg-[#CED1DA] h-screen w-screen flex"
        onClick={() => {
          console.log("Deleted!");
          localStorage.removeItem("loggedAccount");
          console.log(localStorage.getItem("loggedAccount"));
        }}
      ></div>
    </>
  );
}
