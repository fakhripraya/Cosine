import Home from "../../pages/Home/index.tsx";
import Login from "../../pages/Login/index.tsx";

export const routes = [
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/login",
    component: <Login />,
  },
];
