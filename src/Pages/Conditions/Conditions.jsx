import style from "./Conditions.module.scss";
import { Link, useNavigate } from "react-router-dom";
// Cookies
import { useCookies } from "react-cookie";
// MUI
import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function Conditions() {
  React.useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }, []);
  //
  const [isHovered, setIsHovered] = React.useState(false);
  // Cookies
  const [cookies, setCookie] = useCookies(["tokenApp"]);

  // State to manage the checkbox value
  const [checked, setChecked] = React.useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  // Page One localStorage status
  const navigate = useNavigate();
  React.useEffect(() => {
    const isPageTwoSeen = localStorage.getItem("pageTwo");
    if (isPageTwoSeen === "seen") {
      navigate(`${process.env.PUBLIC_URL}/falak/how-works`, { replace: true });
    }
  }, []);

  const pageTwo = () => {
    localStorage.setItem("pageTwo", "seen");
    navigate(`${process.env.PUBLIC_URL}/falak/how-works`, { replace: true });
  };

  return (
    <div dir="rtl" className={style.container}>
      {!cookies.tokenApp ? (
        <Typography
          variant="h6"
          component="div"
          style={{ textAlign: "center", margin: "20px", color: "#757575" }}
        >
          يرجى{" "}
          <Link
            to={`${process.env.PUBLIC_URL}/login`}
            style={{
              color: "#1976d2",
              textDecoration: isHovered ? "underline" : "none",
            }}
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
          >
            تسجيل الدخول
          </Link>{" "}
          لعرض الشروط والأحكام
        </Typography>
      ) : (
        <div className={style.not_auth_container}>
          <div className={style.not_auth_box}>
            <div>
              <h1>الشروط والأحكام:</h1>
              <p>
                فكرة التسويق بالعمولة هي فكرة تحت التجربة، وقد تكون قابلة
                للإيقاف أو التعديل في أي لحظة بناءً على تقييم الأداء ونتائج
                التجربة. نحرص على تقديم أفضل الحلول بما يتناسب مع أهدافنا
                المشتركة،
              </p>

              <h6>تعريفات</h6>
              <div>
                <ul>
                  <li>
                    الشركة: الجهة المالكة للمنتجات أو الخدمات المقدمة عبر برنامج
                    التسويق بالعمولة.
                  </li>
                  <li>
                    المسوق: الشخص أو الكيان المشترك في البرنامج والذي يسوّق
                    للمنتجات أو الخدمات مقابل عمولة.
                  </li>
                  <li>
                    العمولة: المبلغ أو النسبة المالية التي يحصل عليها المسوق
                    مقابل كل عملية بيع أو إجراء محدد تم تحقيقه من خلال الكود
                    التسويقي الخاص به.
                  </li>
                  <li>
                    كود المسوق: الرابط الفريد الخاص بكل مسوق لمتابعة الأداء
                    وتحديد العمليات التي تمت من خلاله.
                  </li>
                </ul>
              </div>

              <h6>شروط التسجيل</h6>
              <div>
                <ul>
                  <li>
                    يجب أن يكون المسوق شخصًا طبيعيًا أو اعتباريًا يتمتع بالأهلية
                    القانونية.
                  </li>
                  <li>الا يقل عمر المشترك عن 18 سنة.</li>
                  <li>يُشترط تقديم بيانات صحيحة ودقيقة أثناء التسجيل.</li>
                  <li>يحق للشركة في أي مرحلة طلب صورة من الهوية والإقامة.</li>
                  <li>يجب على المشارك الإبلاغ عن أي تغييرات في معلوماته</li>
                  <li>يحظر على المشارك تسجيل حسابات متعددة.</li>
                  <li>
                    تحتفظ الشركة بالحق في قبول أو رفض طلب التسجيل دون إبداء
                    أسباب.
                  </li>
                </ul>
              </div>

              <h6>آلية العمل</h6>
              <div>
                <ul>
                  <li>
                    يحصل المسوق على كود تسويقي فريد بعد التسجيل والموافقة.
                  </li>
                  <li>سيحصل المسوق على عمولة 10% من صافي قيمة الفاتورة.</li>
                  <li>
                    قد تتغير نسبة العمولة في أي وقت دون ابداء أسباب التغيير.
                  </li>
                  <li>
                    تُحسب العمولات بناءً على العمليات التي تتم من خلال الكود
                    التسويقي وفقًا للاتفاق المبرم.
                  </li>
                  <li>
                    التطبيق هي المنصة الوحيدة التي تعرض تقارير الزيارات التي
                    وصلت من خلال نشر الكود.
                  </li>
                  <li>
                    لا يُسمح باستخدام أساليب غير قانونية أو غير أخلاقية لجذب
                    العملاء.
                  </li>
                  <li>
                    يستفيد المسوق من الخصم فقط ولا يحصل على عمولة اذا استخدم
                    كوده التسويقي لزياراته الخاصة.
                  </li>
                </ul>
              </div>

              <h6>الدفع</h6>
              <div>
                <ul>
                  <li>
                    يتم دفع العمولات وفقًا لتقارير الأداء بعد التحقق من صحة
                    العمليات.
                  </li>
                  <li>
                    يُشترط أن تصل قيمة العمولات مستحقة الدفع إلى 200 ريال وهو
                    الحد الأدنى للدفع المحدد.
                  </li>
                  <li>
                    لا يتم الدفع والتحويل الا على حسابات بنكية محلية او تطبيقات
                    سعودية كـ stc pay او urpay
                  </li>
                  <li>
                    يجب ان يكون الحساب المحول عليه العمولة باسم المسوق المسجل في
                    التطبيق.
                  </li>
                  <li>
                    أي نزاع حول العمولات يتم حله وفقًا لتقارير الشركة النهائية.
                  </li>
                </ul>
              </div>

              <h6>التزامات المسوق</h6>
              <div>
                <ul>
                  <li>
                    الالتزام بالترويج لمنتجات وأنواع الفحص والخدمات بطريقة
                    قانونية وأخلاقية.
                  </li>
                  <li>الامتناع عن الإساءة لسمعة الشركة أو المنتجات بأي شكل.</li>
                  <li>
                    الامتناع عن استخدام العلامة التجارية للشركة في الإعلانات
                    المدفوعة دون إذن مسبق.
                  </li>
                  <li>
                    عدم انشاء أي حسابات في جميع مواقع التواصل باسم الشركة بغرض
                    التسويق للمنتجات.
                  </li>
                </ul>
              </div>

              <h6>التزامات الشركة</h6>
              <div>
                <ul>
                  <li>
                    تقديم أدوات التسويق اللازمة مثل اكواد التسويق والتقارير.
                  </li>
                  <li>دفع العمولات في الوقت المحدد بعد التحقق من العمليات.</li>
                  <li>
                    الاحتفاظ بسرية معلومات المسوق وعدم مشاركتها مع أطراف خارجية
                    دون موافقة.
                  </li>
                </ul>
              </div>

              <h6>الإلغاء</h6>
              <div>
                <ul>
                  <li>
                    تحتفظ الشركة بالحق في إنهاء عضوية أي مسوق إذا تم اكتشاف
                    انتهاك للشروط.
                  </li>
                  <li>
                    يحق للشركة إيقاف العمل في خطة التسويق بالعمولة في أي وقت دون
                    ان يترتب على ذلك أي التزامات قانونية او مالية تجاه الشركة.
                  </li>
                  <li>يمكن للمسوق إنهاء عضويته بإخطار مسبق للشركة.</li>
                  <li>
                    عند انهاء المسوق لعضويته فسيتم إزالة كافة بياناته وعليه
                    التسجيل من جديد في حال رغب بالانضمام مرة أخرى، ولا يحق له
                    المطالبة بأي عمولات متبقية من حسابه الملغي.
                  </li>
                </ul>
              </div>

              <h6>التعديلات</h6>
              <div>
                <ul>
                  <li>
                    يحق للشركة تعديل الشروط والأحكام في أي وقت، ويتم إشعار
                    المسوقين بالتعديلات قبل تطبيقها.
                  </li>
                  <li>
                    استمرار المسوق في استخدام البرنامج بعد التعديلات يعتبر
                    موافقة ضمنية عليها.
                  </li>
                </ul>
              </div>

              <h6>القوانين المعمول بها</h6>
              <div>
                <ul>
                  <li>تخضع هذه الشروط والأحكام للقوانين واللوائح المحلية.</li>
                  <li>يتم تسوية أي نزاع وفقًا للجهات القضائية المختصة.</li>
                </ul>
              </div>

              <h6>إخلاء المسؤولية</h6>
              <p>
                الشركة غير مسؤولة عن أي خسائر أو أضرار ناجمة عن سوء استخدام
                برنامج التسويق بالعمولة من قبل المسوق.
              </p>
            </div>

            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    required
                    checked={checked}
                    onChange={handleChange}
                  />
                }
                label="أوافق على الشروط والأحكام, وأقر بأنني قرأتها وفهمتها بالكامل"
              />
            </div>

            <Button
              fullWidth
              sx={{ marginTop: "30px" }}
              variant="contained"
              size="large"
              onClick={pageTwo}
              disabled={!checked}
            >
              موافق
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
