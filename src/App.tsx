import "./App.scss";
import { Suspense } from "react";
import { routes } from "./config/routes/routes.tsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Spinner from "./components/Spinner/index.tsx";
import Footer from "./components/Footer/index.tsx";
import PageLoading from "./pages/PageLoading/index.tsx";
import { PAGE_LOADING_MESSAGE } from "./variables/constants/global.ts";

function App() {
  return (
    <Router basename="/">
      <Routes>
        {routes.map((item, index) => (
          <Route
            key={`route-${index}`}
            path={item.path}
            element={
              <Suspense
                fallback={
                  <PageLoading
                    loadingMessage={PAGE_LOADING_MESSAGE}
                    noLogo={false}
                  />
                }>
                {item.component}
              </Suspense>
            }
          />
        ))}
      </Routes>
      <Footer />
      <Spinner />
    </Router>
  );
}

export default App;
