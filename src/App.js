import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
// Pages & components
import Layout from "./Layout/Layout";
import HomeLayout from "./Layout/HomeLayout";
import Reports from "./Pages/Reports/Reports";
import SignUp from "./Pages/SignUp/SignUp";
import Verify from "./Pages/Verify/Verify";
import NotAuth from "./Utils/NotAuth";
import NotFound from "./Pages/NotFound/NotFound";
import Create from "./Pages/Create/Create";
import Individuals from "./Pages/Individuals/Individuals";
import Companies from "./Pages/Companies/Companies";
import Falak from "./Pages/Falak/Falak";
import ContactUs from "./Pages/ContactUs/ContactUs";
import Home from "./Pages/Home/Home";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path={`${process.env.PUBLIC_URL}/`} element={<Layout />}>
        <Route element={<NotAuth />}>
          {/* Start Check if login */}
          <Route path={`${process.env.PUBLIC_URL}/login`} element={<SignUp />} />
          <Route path={`${process.env.PUBLIC_URL}/verify`} element={<Verify />} />
          <Route path={`${process.env.PUBLIC_URL}/signup`} element={<Create />} />
          <Route path={`${process.env.PUBLIC_URL}/individuals`} element={<Individuals />} />
          <Route path={`${process.env.PUBLIC_URL}/companies`} element={<Companies />} />
          {/* End Check if login */}
        </Route>


        {/* Start protected route */}
        <Route element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path={`${process.env.PUBLIC_URL}/reports`} element={<Reports />} />
          <Route path={`${process.env.PUBLIC_URL}/falak`} element={<Falak />} />
          <Route path={`${process.env.PUBLIC_URL}/contact`} element={<ContactUs />} />
        </Route>
        {/* End protected route */}

        <Route path={`${process.env.PUBLIC_URL}/*`} element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} basename="/dashboard" />;
}
