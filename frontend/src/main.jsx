import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";

import store from "./redux/store.js";
import ScrollToTop from "./components/scrollToPage.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <ChakraProvider>
          <ScrollToTop />
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  </>
);
