import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";

export const AppRouter = createBrowserRouter([{
  path: "/",
  element:<LoginPage/>
}]);
