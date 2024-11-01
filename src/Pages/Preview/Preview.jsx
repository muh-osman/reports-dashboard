import style from "./Preview.module.scss";
import { useParams } from "react-router-dom";
//
import testPdf from "../../Assets/Images/pdf-test.pdf";

export default function Preview() {
  let { id } = useParams();

  return (
    <div className={style.container}>

    </div>
  );
}
