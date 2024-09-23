import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { createRoot } from "react-dom/client"; // Importa o createRoot corretamente
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import store from "./reducers/store";
import "./index.css";
import Tasks from "./components/Tasks.jsx/Tasks.jsx";
import DetailsTask from "./components/DetailsTaks/DetailsTask.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/person_task",
    element: <Tasks />,
  },
  {
    path: "/person_task/task",
    element: <DetailsTask />,
  },
]);

// Use createRoot diretamente
const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>
);

reportWebVitals();
