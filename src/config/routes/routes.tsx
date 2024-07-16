import DetailBuilding from "../../pages/DetailBuilding/index.tsx";
import Home from "../../pages/Home/index.tsx";
import Login from "../../pages/Login/index.tsx";

export const routes = [
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/detail",
    component: <DetailBuilding />,
  },
  {
    path: "/login",
    component: <Login />,
  },
];
