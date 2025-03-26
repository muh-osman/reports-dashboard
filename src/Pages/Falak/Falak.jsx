import style from './Falak.module.scss';
// Cookies
import { useCookies } from "react-cookie";


export default function Falak() {
    // Cookies
    const [cookies, setCookie] = useCookies(["tokenApp"]);


  return (
    <div className={style.container}>

      {
              !cookies.tokenApp ? (
                <h1>Falek</h1>
                ) : (
                <h1>Falek</h1>
              )
      }



    </div>
  )
}

// * Marketer API : -
// create marketer (POST) : (/Marketers)
// get marketer : (/Marketers/GetByClientId/clientId)
// get payment types : (/TranferPaymentTypes)
// check if payment request is valid : (/TransferRequests/CheckWattingRequest?marketerId=$marketerId)
// get payment history : (/TransferRequests/GetByMarketerId?marketerId=$marketerId)
// transfeer payment (POST) : (/TransferRequests)
// get marketer settings : (/MarketerSettings)
// get latest payment details : (/TransferRequests/GetLastPaymentByIdAsync/clientId)*