import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useLocation,
} from "react-router-dom";
// Pages & components
import Layout from "./Layout/Layout";
import HomeLayout from "./Layout/HomeLayout";
import Home from "./Pages/Home/Home";
import SignUp from "./Pages/SignUp/SignUp";
import Verify from "./Pages/Verify/Verify";
import Auth from "./Utils/Auth";
import NotAuth from "./Utils/NotAuth";
import NotFound from "./Pages/NotFound/NotFound";

// Animations
import MotionWrapper from "./Utils/MotionWrapper";
import { AnimatePresence } from "framer-motion";

function AnimatedRoute({ element }) {
  const location = useLocation();
  return <MotionWrapper key={location.pathname}>{element}</MotionWrapper>;
}

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path={`${process.env.PUBLIC_URL}/`} element={<Layout />}>
        <Route element={<NotAuth />}>
          {/* Start Check if login */}
          <Route index element={<SignUp />} />
          <Route
            path={`${process.env.PUBLIC_URL}/verify`}
            element={<AnimatedRoute element={<Verify />} />}
          />
          {/* End Check if login */}
        </Route>

        <Route element={<Auth />}>
          {/* Start protected route */}
          <Route element={<HomeLayout />}>
            <Route
              path={`${process.env.PUBLIC_URL}/reports`}
              element={<Home />}
            />
          </Route>
          {/* End protected route */}
        </Route>

        <Route path={`${process.env.PUBLIC_URL}/*`} element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} basename="/dashboard" />;
}
