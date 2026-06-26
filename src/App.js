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
import Shipping from "./Pages/Shippings/Shippings";
import PayShipping from "./Pages/PayShipping/PayShipping";
import ThanksShipping from "./Pages/ThanksShipping/ThanksShipping";
import Plans from "./Pages/Plans/Plans";
import PayPurchaseCheck from "./Pages/PayPurchaseCheck/PayPurchaseCheck";
import ThanksPurchaseCheck from "./Pages/ThanksPurchaseCheck/ThanksPurchaseCheck";
import PayMakdomCheck from "./Pages/PayMakdomCheck/PayMakdomCheck";
import ThanksMakdomCheck from "./Pages/ThanksMakdomCheck/ThanksMakdomCheck";
import PayPassengerCheck from "./Pages/PayPassengerCheck/PayPassengerCheck";
import PricesList from "./Pages/PricesList/PricesList";
import ViewVideosPage from "./Pages/ViewVideosPage/ViewVideosPage";
import SocialMedia from "./Pages/SocialMedia/SocialMedia";
import OfferPlans from "./Pages/OfferPlans/OfferPlans";
import AskMojazReport from "./Pages/AskMojazReport/AskMojazReport";
import PayMojaz from "./Pages/PayMojaz/PayMojaz";
import ThanksPayMojaz from "./Pages/ThanksPayMojaz/ThanksPayMojaz";
import MyOrders from "./Pages/MyOrders/MyOrders";
import PartnersOffers from "./Pages/PartnersOffers/PartnersOffers";
import PlansInGallery from "./Pages/PlansInGallery/PlansInGallery";
import StaticPlans from "./Pages/StaticPlans/StaticPlans";
// import Lottery from "./Pages/Lottery/Lottery";
// import LotteryAlreadyRegistered from "./Pages/LotteryAlreadyRegistered/LotteryAlreadyRegistered";

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
          <Route path={`${process.env.PUBLIC_URL}/plans`} element={<Plans />} />
          <Route path={`${process.env.PUBLIC_URL}/static-plans`} element={<StaticPlans />} />
          <Route path={`${process.env.PUBLIC_URL}/booking`} element={<Booking />} />
          <Route path={`${process.env.PUBLIC_URL}/edit-booking/:id`} element={<EditBooking />} />
          <Route path={`${process.env.PUBLIC_URL}/contact`} element={<ContactUs />} />
          <Route path={`${process.env.PUBLIC_URL}/logout`} element={<Logout />} />
          <Route path={`${process.env.PUBLIC_URL}/videos/:cardId`} element={<ViewVideosPage />} />

          <Route path={`${process.env.PUBLIC_URL}/shipping/:cardId`} element={<Shipping />} />
          <Route path={`${process.env.PUBLIC_URL}/pay/shipping`} element={<PayShipping />} />
          {/* <Route path={`${process.env.PUBLIC_URL}/pay/shipping/thanks`} element={<ThanksShipping />} /> */}

          {/* <Route path={`${process.env.PUBLIC_URL}/offer-plans`} element={<OfferPlans />} /> */}

          <Route path={`${process.env.PUBLIC_URL}/ask-mojaz-report/:reportId`} element={<AskMojazReport />} />
          <Route path={`${process.env.PUBLIC_URL}/pay-mojaz`} element={<PayMojaz />} />
          <Route path={`${process.env.PUBLIC_URL}/pay-mojaz/thanks`} element={<ThanksPayMojaz />} />

          <Route path={`${process.env.PUBLIC_URL}/pay/purchase-check`} element={<PayPurchaseCheck />} />
          <Route path={`${process.env.PUBLIC_URL}/pay/purchase-check/thanks`} element={<ThanksPurchaseCheck />} />

          <Route path={`${process.env.PUBLIC_URL}/pay/makdom-check`} element={<PayMakdomCheck />} />
          <Route path={`${process.env.PUBLIC_URL}/pay/makdom-check/thanks`} element={<ThanksMakdomCheck />} />

          <Route path={`${process.env.PUBLIC_URL}/pay/passenger-check`} element={<PayPassengerCheck />} />

          <Route path={`${process.env.PUBLIC_URL}/prices-list`} element={<PricesList />} />
          <Route path={`${process.env.PUBLIC_URL}/social-media`} element={<SocialMedia />} />
          <Route path={`${process.env.PUBLIC_URL}/my-orders`} element={<MyOrders />} />
          <Route path={`${process.env.PUBLIC_URL}/partners-offers`} element={<PartnersOffers />} />
          {/* <Route path={`${process.env.PUBLIC_URL}/1`} element={<Lottery />} /> */}
          {/* <Route path={`${process.env.PUBLIC_URL}/lottery-already-registered`} element={<LotteryAlreadyRegistered />} /> */}
        </Route>
        {/* End protected route */}

        <Route path={`${process.env.PUBLIC_URL}/plans-gallery`} element={<PlansInGallery />} />

        <Route path={`${process.env.PUBLIC_URL}/*`} element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} basename="/dashboard" />;
}
