import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const ToastContainer = () => {
  const theme = useSelector((state: RootState) => state.system.theme);

  return (
    <Toaster
      position="top-center"
      reverseOrder={true}
      toastOptions={{
        duration: 1000,
        style: {
          background: theme === "dark" ? "#333333" : "#fff",
          color: theme === "dark" ? "#fff" : "#000",
        },
      }}
    />
  );
};

export default ToastContainer;
