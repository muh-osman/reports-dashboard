import style from "./Home.module.scss";
// MUI

export default function Home() {
  return (
    <div dir="rtl" className={style.container}>
      <div className={style.points_container}>
        <div className={style.point_card}>
          <div>
            <h2 style={{ backgroundColor: "#873fe5" }}>4567</h2>
          </div>
          <div>
            <h3>مجموع النقاط المكتسبة</h3>
            <p>يتضمن جميع النقاط الحالية والمستهلكة</p>
          </div>
        </div>

        <div className={style.point_card}>
          <div>
            <h2 style={{ backgroundColor: "#0b89e5" }}>987</h2>
          </div>
          <div>
            <h3>رصيد النقاط الحالي</h3>
            <p>رصيد النقاط المتاحة في حسابك الآن</p>
          </div>
        </div>

        <div className={style.point_card}>
          <div>
            <h2 style={{ backgroundColor: "#696969" }}>123</h2>
          </div>
          <div>
            <h3>مجموع النقاط المستهلكة</h3>
            <p>جميع النقاط التي تم استخدامها من حسابك</p>
          </div>
        </div>

      </div>
    </div>
  );
}
