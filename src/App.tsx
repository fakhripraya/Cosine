import "./App.scss";
import { Suspense } from "react";
import { routes } from "./config/routes/routes.tsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Spinner from "./components/Spinner/index.tsx";

function App() {
  const prefix = "/cl";
  return (
    <Router basename="/">
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={prefix}
              replace
            />
          }
        />
        {routes.map((item, index) => (
          <Route
            key={`route-${index}`}
            path={`${prefix}/${item.path}`}
            element={
              <Suspense fallback={<p>Loading...</p>}>
                {item.component}
              </Suspense>
            }
          />
        ))}
      </Routes>
      <Spinner />
    </Router>
  );
}

export default App;
