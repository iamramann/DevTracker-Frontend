import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <div className="container mx-auto">
      {/* <button onClick={notify}>Notify!</button> */}
      <ToastContainer />
      <Outlet />
    </div>
  );
}
