import Router from "@router/Router";
import { Slide, ToastContainer } from "react-toastify";
import { useValidateAuth } from "@apis/hooks/useValidateAuth";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { initialOptions } from "./payment/paypal/paypalOptions";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { useTheme } from "./contexts/ThemeContext";
import { lightTheme, darkTheme } from "./styles/theme";
import { GlobalStyle } from "./styles/GlobalStyle.tsx";

function App() {
  useValidateAuth();
  const { isDarkMode } = useTheme();

  return (
    <StyledThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
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
          theme={isDarkMode ? "dark" : "light"}
          transition={Slide}
        />
      </PayPalScriptProvider>
    </StyledThemeProvider>
  );
}

export default App;
