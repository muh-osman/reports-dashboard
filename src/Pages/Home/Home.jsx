import style from "./Home.module.scss";
// MUI
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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

      <h5 className={style.last_reports_title}>آخر التقارير</h5>
      <Divider sx={{ marginBottom: "18px" }} />

      <div className={style.reports_cards_container}>

        <Card sx={{ width: 300, backgroundColor: "#f5f5f5" }}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              التاريخ: 12/12/2021
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              رقم الكارت: 89744123
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              الشركة المصنعة: تويوتا
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              ماركة السيارة: كامري
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              رقم اللوحة: 5468
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              الفرع: الدمام
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              نوع الخدمة: فحص شامل
            </Typography>
          </CardContent>

          <CardActions sx={{ backgroundColor: "#fff" }}>
            <Button sx={{ color: "#1976d2" }} size="small">
              معاينة التقرير
            </Button>
            <Button sx={{ color: "#1976d2" }} size="small">
              تحميل
            </Button>
          </CardActions>
        </Card>

        <Card sx={{ width: 300, backgroundColor: "#f5f5f5" }}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              التاريخ: 12/12/2021
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              رقم الكارت: 89744123
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              الشركة المصنعة: تويوتا
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              ماركة السيارة: كامري
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              رقم اللوحة: 5468
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              الفرع: الدمام
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              نوع الخدمة: فحص شامل
            </Typography>
          </CardContent>

          <CardActions sx={{ backgroundColor: "#fff" }}>
            <Button sx={{ color: "#1976d2" }} size="small">
              معاينة التقرير
            </Button>
            <Button sx={{ color: "#1976d2" }} size="small">
              تحميل
            </Button>
          </CardActions>
        </Card>

        <Card sx={{ width: 300, backgroundColor: "#f5f5f5" }}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              التاريخ: 12/12/2021
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              رقم الكارت: 89744123
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              الشركة المصنعة: تويوتا
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              ماركة السيارة: كامري
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              رقم اللوحة: 5468
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              الفرع: الدمام
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              نوع الخدمة: فحص شامل
            </Typography>
          </CardContent>

          <CardActions sx={{ backgroundColor: "#fff" }}>
            <Button sx={{ color: "#1976d2" }} size="small">
              معاينة التقرير
            </Button>
            <Button sx={{ color: "#1976d2" }} size="small">
              تحميل
            </Button>
          </CardActions>
        </Card>

        <Card sx={{ width: 300, backgroundColor: "#f5f5f5" }}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              التاريخ: 12/12/2021
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              رقم الكارت: 89744123
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              الشركة المصنعة: تويوتا
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              ماركة السيارة: كامري
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              رقم اللوحة: 5468
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              الفرع: الدمام
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              نوع الخدمة: فحص شامل
            </Typography>
          </CardContent>

          <CardActions sx={{ backgroundColor: "#fff" }}>
            <Button sx={{ color: "#1976d2" }} size="small">
              معاينة التقرير
            </Button>
            <Button sx={{ color: "#1976d2" }} size="small">
              تحميل
            </Button>
          </CardActions>
        </Card>

        <Card sx={{ width: 300, backgroundColor: "#f5f5f5" }}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              التاريخ: 12/12/2021
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              رقم الكارت: 89744123
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              الشركة المصنعة: تويوتا
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              ماركة السيارة: كامري
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              رقم اللوحة: 5468
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              الفرع: الدمام
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              نوع الخدمة: فحص شامل
            </Typography>
          </CardContent>

          <CardActions sx={{ backgroundColor: "#fff" }}>
            <Button sx={{ color: "#1976d2" }} size="small">
              معاينة التقرير
            </Button>
            <Button sx={{ color: "#1976d2" }} size="small">
              تحميل
            </Button>
          </CardActions>
        </Card>

        <Card sx={{ width: 300, backgroundColor: "#f5f5f5" }}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              التاريخ: 12/12/2021
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              رقم الكارت: 89744123
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              الشركة المصنعة: تويوتا
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              ماركة السيارة: كامري
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              رقم اللوحة: 5468
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              الفرع: الدمام
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              نوع الخدمة: فحص شامل
            </Typography>
          </CardContent>

          <CardActions sx={{ backgroundColor: "#fff" }}>
            <Button sx={{ color: "#1976d2" }} size="small">
              معاينة التقرير
            </Button>
            <Button sx={{ color: "#1976d2" }} size="small">
              تحميل
            </Button>
          </CardActions>
        </Card>

        <Card sx={{ width: 300, backgroundColor: "#f5f5f5" }}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              التاريخ: 12/12/2021
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              رقم الكارت: 89744123
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              الشركة المصنعة: تويوتا
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              ماركة السيارة: كامري
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              رقم اللوحة: 5468
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              الفرع: الدمام
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "14px" }}
            >
              نوع الخدمة: فحص شامل
            </Typography>
          </CardContent>

          <CardActions sx={{ backgroundColor: "#fff" }}>
            <Button sx={{ color: "#1976d2" }} size="small">
              معاينة التقرير
            </Button>
            <Button sx={{ color: "#1976d2" }} size="small">
              تحميل
            </Button>
          </CardActions>
        </Card>

      </div>
    </div>
  );
}
