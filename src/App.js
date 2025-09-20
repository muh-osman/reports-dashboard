import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
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
import Prices from "./Pages/Prices/Prices";
import Booking from "./Pages/Booking/Booking";
import EditBooking from "./Pages/EditBooking/EditBooking";
import Conditions from "./Pages/Conditions/Conditions";
import HowWorks from "./Pages/HowWorks/HowWorks";
import Marketer from "./Pages/Marketer/Marketer";
import Transfer from "./Pages/Transfer/Transfer";
import History from "./Pages/History/History";
import AcceptedNumbers from "./Utils/AcceptedNumbers";
import Logout from "./Pages/Logout/Logout";

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

          <Route element={<AcceptedNumbers />}>
            <Route path={`${process.env.PUBLIC_URL}/falak`} element={<Falak />} />
            <Route path={`${process.env.PUBLIC_URL}/falak/conditions`} element={<Conditions />} />
            <Route path={`${process.env.PUBLIC_URL}/falak/how-works`} element={<HowWorks />} />
            <Route path={`${process.env.PUBLIC_URL}/falak/marketer`} element={<Marketer />} />

            <Route path={`${process.env.PUBLIC_URL}/falak/transfer`} element={<Transfer />} />
            <Route path={`${process.env.PUBLIC_URL}/falak/history`} element={<History />} />
          </Route>

          <Route path={`${process.env.PUBLIC_URL}/reports`} element={<Reports />} />
          <Route path={`${process.env.PUBLIC_URL}/prices`} element={<Prices />} />
          <Route path={`${process.env.PUBLIC_URL}/booking`} element={<Booking />} />
          <Route path={`${process.env.PUBLIC_URL}/edit-booking/:id`} element={<EditBooking />} />
          <Route path={`${process.env.PUBLIC_URL}/contact`} element={<ContactUs />} />
          <Route path={`${process.env.PUBLIC_URL}/logout`} element={<Logout />} />
        </Route>
        {/* End protected route */}

        <Route path={`${process.env.PUBLIC_URL}/*`} element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} basename="/dashboard" />;
}
