import Router from "@router/Router";
import { Slide, ToastContainer } from "react-toastify";
import { useValidateAuth } from "@apis/hooks/useValidateAuth";

function App() {
  useValidateAuth();

  return (
    <>
      <Router />
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Slide}
      />
    </>
  );
}

export default App;
