import Router from "@router/Router";
import { Slide, ToastContainer } from "react-toastify";
import { useValidateAuth } from "@apis/hooks/useValidateAuth";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { initialOptions } from "./payment/paypal/paypalOptions";

function App() {
  useValidateAuth();

  return (
    <PayPalScriptProvider options={initialOptions}>
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
    </PayPalScriptProvider>
  );
}

export default App;
