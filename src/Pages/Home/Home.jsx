import style from "./Home.module.scss";
// MUI
import * as React from "react";
// Icons

export default function Home() {
  React.useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }, []);

  return (
    <div dir="rtl" className={style.container}>
      <div className={style.header_box}>
        <h1>كاشف لفحص السيارات</h1>

        <h3>
          مركز متخصص في فحص السيارات المستعملة، يقدم مفهومًا جديدًا يواكب أحدث
          التقنيات ليساعدك في قرار الشراء
        </h3>
      </div>
    </div>
  );
}
