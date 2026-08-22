import style from "./AcceptTerms.module.scss";
// Cookies
import { useCookies } from "react-cookie";
// MUI
import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import CircularProgress from "@mui/material/CircularProgress";
// React Query
import { useMutation, useQueryClient } from "@tanstack/react-query";
// Lang
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";

// Calls the API to record that the user accepted the terms & conditions.
// The phone number is taken from cookies and sent as part of the URL.
const acceptTermsRequest = async (phoneNumber) => {
  const response = await fetch(`https://cashif.online/back-end/public/api/i-accept-terms/${phoneNumber}`, { method: "POST" });

  const data = await response.json();

  if (!response.ok || data.status === "error") {
    throw new Error(data.message || "Failed to record terms acceptance");
  }

  return data;
};

export default function AcceptTerms() {
  React.useEffect(() => {
    // Scroll to the top of the page whenever we mount
    window.scrollTo(0, 0);
  }, []);
  //
  const { t } = useTranslation();
  const [languageText, setLanguageText] = React.useState(i18n.language);
  // Add language change listener
  React.useEffect(() => {
    const handleLanguageChange = (lng) => {
      setLanguageText(lng);
    };

    i18n.on("languageChanged", handleLanguageChange);

    // Cleanup function to remove the listener when component unmounts
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);
  // Cookies
  const [cookies] = useCookies(["phoneNumber"]);
  // Used to refetch the "acceptedNumbers" query (shared with IsUserAcceptTerms)
  // once the terms have been accepted, so the guard picks up the fresh status.
  const queryClient = useQueryClient();

  // Which of the 3 sections is currently shown: 1 = Falak, 2 = Conditions, 3 = HowWorks
  const [step, setStep] = React.useState(1);
  // Terms checkbox state
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  // Scroll to top every time the step changes
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  // Mutation that sends the phone number to the API once the user
  // finishes reading everything and clicks "Continue" on the last step.
  const {
    mutate: acceptTerms,
    isPending: isAccepting,
    isError: isAcceptError,
    error: acceptError,
  } = useMutation({
    mutationFn: async () => {
      const result = await acceptTermsRequest(cookies.phoneNumber);
      // Same key used in "IsUserAcceptTerms.js" -> refetch it now.
      // Awaiting here keeps isPending/isAccepting true (button stays in its
      // loading state) until IsUserAcceptTerms has fresh data and swaps
      // this component out for <Outlet /> on its own — no manual redirect needed.
      // بمجرد عمل refetch رح يفتح Outlet
      await queryClient.invalidateQueries({ queryKey: ["acceptedNumbers"] });
      return result;
    },
  });

  const goToConditions = () => setStep(2);
  const goToHowWorks = () => setStep(3);
  const handleFinish = () => {
    acceptTerms();
  };

  return (
    <div dir={languageText === "ar" ? "rtl" : "ltr"} className={style.container}>
      {/* -------------------------- Step 1: Falak intro -------------------------- */}
      {step === 1 && (
        <div className={style.not_auth_container}>
          <div className={style.not_auth_box}>
            <div>
              <div className={style.not_auth_img}>
                <svg style={{ width: "100px", fill: "#174545" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                  <path d="M323.4 85.2l-96.8 78.4c-16.1 13-19.2 36.4-7 53.1c12.9 17.8 38 21.3 55.3 7.8l99.3-77.2c7-5.4 17-4.2 22.5 2.8s4.2 17-2.8 22.5l-20.9 16.2L512 316.8 512 128l-.7 0-3.9-2.5L434.8 79c-15.3-9.8-33.2-15-51.4-15c-21.8 0-43 7.5-60 21.2zm22.8 124.4l-51.7 40.2C263 274.4 217.3 268 193.7 235.6c-22.2-30.5-16.6-73.1 12.7-96.8l83.2-67.3c-11.6-4.9-24.1-7.4-36.8-7.4C234 64 215.7 69.6 200 80l-72 48 0 224 28.2 0 91.4 83.4c19.6 17.9 49.9 16.5 67.8-3.1c5.5-6.1 9.2-13.2 11.1-20.6l17 15.6c19.5 17.9 49.9 16.6 67.8-2.9c4.5-4.9 7.8-10.6 9.9-16.5c19.4 13 45.8 10.3 62.1-7.5c17.9-19.5 16.6-49.9-2.9-67.8l-134.2-123zM16 128c-8.8 0-16 7.2-16 16L0 352c0 17.7 14.3 32 32 32l32 0c17.7 0 32-14.3 32-32l0-224-80 0zM48 320a16 16 0 1 1 0 32 16 16 0 1 1 0-32zM544 128l0 224c0 17.7 14.3 32 32 32l32 0c17.7 0 32-14.3 32-32l0-208c0-8.8-7.2-16-16-16l-80 0zm32 208a16 16 0 1 1 32 0 16 16 0 1 1 -32 0z" />
                </svg>
              </div>
              <h1>{t("Falak.title")}</h1>
              <p>{t("Falak.subTitleOne")}</p>
              <p>{t("Falak.subTitleTwo")}</p>
              <p>
                {t("Falak.subTitleThree")} <span style={{ fontWeight: "bold" }}>{t("Falak.subTitleFour")}</span>
              </p>
            </div>

            <Button fullWidth sx={{ marginTop: "30px" }} variant="contained" size="large" onClick={goToConditions}>
              {t("Falak.joinNow")}
            </Button>
          </div>
        </div>
      )}

      {/* ------------------------ Step 2: Terms & Conditions ----------------------- */}
      {step === 2 && (
        <div className={style.not_auth_container}>
          <div className={style.not_auth_box}>
            <div>
              <h1>{t("Conditions.termsAndConditions")}:</h1>
              <p>{t("Conditions.termsHeader")}</p>

              <h6>{t("Conditions.definitions")}</h6>
              <div>
                <ul style={languageText === "ar" ? { paddingRight: 16 } : { paddingLeft: 16 }}>
                  <li>{t("Conditions.definitionsA")}</li>
                  <li>{t("Conditions.definitionsB")}</li>
                  <li>{t("Conditions.definitionsC")}</li>
                  <li>{t("Conditions.definitionsD")}</li>
                </ul>
              </div>

              <h6>{t("Conditions.registrationTerms")}</h6>
              <div>
                <ul style={languageText === "ar" ? { paddingRight: 16 } : { paddingLeft: 16 }}>
                  <li>{t("Conditions.registrationTermsA")}</li>
                  <li>{t("Conditions.registrationTermsB")}</li>
                  <li>{t("Conditions.registrationTermsC")}</li>
                  <li>{t("Conditions.registrationTermsD")}</li>
                  <li>{t("Conditions.registrationTermsE")}</li>
                  <li>{t("Conditions.registrationTermsF")}</li>
                  <li>{t("Conditions.registrationTermsG")}</li>
                </ul>
              </div>

              <h6>{t("Conditions.mechanismOfAction")}</h6>
              <div>
                <ul style={languageText === "ar" ? { paddingRight: 16 } : { paddingLeft: 16 }}>
                  <li>{t("Conditions.mechanismOfActionA")}</li>
                  <li>{t("Conditions.mechanismOfActionB")}</li>
                  <li>{t("Conditions.mechanismOfActionC")}</li>
                  <li>{t("Conditions.mechanismOfActionD")}</li>
                  <li>{t("Conditions.mechanismOfActionE")}</li>
                  <li>{t("Conditions.mechanismOfActionF")}</li>
                  <li>{t("Conditions.mechanismOfActionG")}</li>
                </ul>
              </div>

              <h6>{t("Conditions.payment")}</h6>
              <div>
                <ul style={languageText === "ar" ? { paddingRight: 16 } : { paddingLeft: 16 }}>
                  <li>{t("Conditions.paymentA")}</li>
                  <li>{t("Conditions.paymentB")}</li>
                  <li>{t("Conditions.paymentC")}</li>
                  <li>{t("Conditions.paymentD")}</li>
                  <li>{t("Conditions.paymentE")}</li>
                </ul>
              </div>

              <h6>{t("Conditions.marketerObligations")}</h6>
              <div>
                <ul style={languageText === "ar" ? { paddingRight: 16 } : { paddingLeft: 16 }}>
                  <li>{t("Conditions.marketerObligationsA")}</li>
                  <li>{t("Conditions.marketerObligationsB")}</li>
                  <li>{t("Conditions.marketerObligationsC")}</li>
                  <li>{t("Conditions.marketerObligationsD")}</li>
                </ul>
              </div>

              <h6>{t("Conditions.companyObligations")}</h6>
              <div>
                <ul style={languageText === "ar" ? { paddingRight: 16 } : { paddingLeft: 16 }}>
                  <li>{t("Conditions.companyObligationsA")}</li>
                  <li>{t("Conditions.companyObligationsB")}</li>
                  <li>{t("Conditions.companyObligationsC")}</li>
                </ul>
              </div>

              <h6>{t("Conditions.cancellation")}</h6>
              <div>
                <ul style={languageText === "ar" ? { paddingRight: 16 } : { paddingLeft: 16 }}>
                  <li>{t("Conditions.cancellationA")}</li>
                  <li>{t("Conditions.cancellationB")}</li>
                  <li>{t("Conditions.cancellationC")}</li>
                  <li>{t("Conditions.cancellationD")}</li>
                </ul>
              </div>

              <h6>{t("Conditions.modifications")}</h6>
              <div>
                <ul style={languageText === "ar" ? { paddingRight: 16 } : { paddingLeft: 16 }}>
                  <li>{t("Conditions.modificationsA")}</li>
                  <li>{t("Conditions.modificationsB")}</li>
                </ul>
              </div>

              <h6>{t("Conditions.applicableLaws")}</h6>
              <div>
                <ul style={languageText === "ar" ? { paddingRight: 16 } : { paddingLeft: 16 }}>
                  <li>{t("Conditions.applicableLawsA")}</li>
                  <li>{t("Conditions.applicableLawsB")}</li>
                </ul>
              </div>

              <h6>{t("Conditions.disclaimer")}</h6>
              <p>{t("Conditions.disclaimerA")}</p>
            </div>

            <div>
              <FormControlLabel control={<Checkbox required checked={checked} onChange={handleChange} />} label={t("Conditions.label")} />
            </div>

            <Button fullWidth sx={{ marginTop: "30px" }} variant="contained" size="large" onClick={goToHowWorks} disabled={!checked}>
              {t("Conditions.ok")}
            </Button>
          </div>
        </div>
      )}

      {/* --------------------------- Step 3: How it works -------------------------- */}
      {step === 3 && (
        <div className={style.not_auth_container}>
          <div className={style.not_auth_box}>
            <div>
              <h1>{t("HowWorks.weAreExcitedToHaveYouJoinTheFalkProgram")}</h1>

              <p>
                {t("HowWorks.usingMarketingImageThatContains")} <span style={{ fontWeight: "bold" }}>{t("HowWorks.yourOwnCode")}</span>
                {t("HowWorks.youCanPromoteYourCarInspectionService")}
              </p>
              <p>
                {t("HowWorks.theCodeGivesCustomers")} <span style={{ fontWeight: "bold" }}>{t("HowWorks.TwinyDiscount")}</span>
                {t("HowWorks.whileYouGet")} <span style={{ fontWeight: "bold" }}>{t("HowWorks.tenPrecentCommission")}</span> {t("HowWorks.forEveryReservationMadeUsingTheCode")}
              </p>

              <h3>{t("HowWorks.howToWork")}:</h3>
              <div>
                <ol style={languageText === "ar" ? { paddingRight: 16 } : { paddingLeft: 16 }}>
                  <li>
                    <span style={{ fontWeight: "bold" }}>{t("HowWorks.useImageAndCode")}</span> {t("HowWorks.toPromoteThroughYourOnlinePlatforms")}
                  </li>
                  <li>
                    <span style={{ fontWeight: "bold" }}>{t("HowWorks.shareWithYourAudience")}</span> {t("HowWorks.theCodeGivesThemTwentPercentDiscountWhenBookingCarInspection")}
                  </li>
                  <li>
                    <span style={{ fontWeight: "bold" }}>{t("HowWorks.getTenPercentCommission")}</span> {t("HowWorks.forEveryReservationMadeUsingYourCode")}
                  </li>
                </ol>
              </div>

              <p>{t("HowWorks.startPromotingNowAndStartMakingProfits")}</p>
              <p style={{ fontWeight: "bold" }}>{t("HowWorks.goodLuckToYou")}</p>
            </div>

            <Button fullWidth sx={{ marginTop: "30px" }} variant="contained" size="large" onClick={handleFinish} disabled={isAccepting}>
              {isAccepting ? <CircularProgress size={24} color="inherit" /> : t("HowWorks.continue")}
            </Button>

            {isAcceptError && (
              <Typography color="error" style={{ marginTop: "12px", textAlign: "center" }}>
                {acceptError?.message || t("HowWorks.errorAccepting")}
              </Typography>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
