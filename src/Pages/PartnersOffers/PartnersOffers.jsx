import style from "./PartnersOffers.module.scss";
//MUI
import { Button } from "@mui/material";
// Images
import imageA from "../../Assets/Images/A.png";
import imageB from "../../Assets/Images/B.png";
import imageC from "../../Assets/Images/C.png";
import imageD from "../../Assets/Images/D.png";

export default function PartnersOffers() {
  return (
    <div className={style.container}>
      {/* Partner Coupon */}
      <div className={style.partner_container}>
        <h2 dir="rtl">
          خصم خاص <span>لعملاء كاشف!</span>
        </h2>
        <h4>اعرض الكوبونات لدى شركائنا عند وصولك</h4>
        <div className={style.partner_box}>
          {[
            { image: imageA, name: "A" },
            { image: imageB, name: "B" },
            { image: imageC, name: "C" },
            { image: imageD, name: "D" },
          ].map((partner, index) => (
            <div key={index}>
              <a href={partner.image} download={`coupon_${partner.name}.png`}>
                <img src={partner.image} alt="our partner" />
              </a>
              <Button
                variant="contained"
                href={partner.image}
                download=""
                className={style[`btn_${["one", "two", "three", "four"][index]}`]}
                sx={{
                  marginTop: 1,
                  textTransform: "none",
                  padding: "8px 16px",
                  fontWeight: "bold",
                }}
              >
                تحميل الكوبون
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
