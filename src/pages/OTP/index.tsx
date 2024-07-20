/* eslint-disable react-hooks/exhaustive-deps */
import {
  Fragment,
  useState,
  ChangeEvent,
  useEffect,
} from "react";
import "./style.scss";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import {
  CLIENT_USER_INFO,
  X_SID,
  AUTHORIZATION,
} from "../../variables/global";
import { useAxios } from "../../utils/hooks/useAxios";
import Modal from "../../components/Modal";
import { trackPromise } from "react-promise-tracker";
import { acceptNumericOnly } from "../../utils/functions/global";
import { cookies } from "../../config/cookie";
import { ShowResponseModal } from "./modular/ShowModal";
import { URL_POST_OTP } from "../../config/xhr/routes/credentials";
import { useNavigate } from "react-router-dom";
import { IS_INPUT_OTP_ELIGIBLE } from "../../utils/validations/credential";
import { IOTPData } from "../../interfaces/credential";
import { AdvanceAxiosRequestHeaders } from "../../interfaces/axios";
import { OLYMPUS_SERVICE } from "../../config/environment";

const initial: IOTPData = {
  OTPInput: "",
  sid: undefined,
  credentialToken: undefined,
};

export default function OTP() {
  // VARIABLES
  const userInfo = cookies.get(CLIENT_USER_INFO);
  let otpEligible = false;
  if (IS_INPUT_OTP_ELIGIBLE(userInfo)) {
    initial.credentialToken = userInfo.credentialToken;
    initial.sid = userInfo.sid;
    otpEligible = true;
  }

  // HOOKS //
  const navigate = useNavigate();
  const axiosService = useAxios();
  const [modalToggle, setModalToggle] = useState(false);
  const [postOTPData, setPostOTPData] =
    useState<IOTPData>(initial);
  const [errorMessage, setErrorMessage] = useState<
    string | null
  >(null);

  // FUNCTIONS SPECIFIC //
  function handleNumericChange(
    field: keyof IOTPData,
    event: ChangeEvent<HTMLInputElement>
  ) {
    const temp = { ...postOTPData };
    temp[field] = acceptNumericOnly(event.target.value);
    setPostOTPData(temp);
  }

  function handleSubmitOTP() {
    if (!IS_INPUT_OTP_ELIGIBLE(userInfo)) return;
    const abortController = new AbortController();
    const axiosTimeout =
      axiosService.setAxiosTimeout(abortController);
    trackPromise(
      axiosService
        .postData({
          endpoint: OLYMPUS_SERVICE,
          headers: {
            [X_SID]:
              cookies.get(CLIENT_USER_INFO)?.sid || "",
            [AUTHORIZATION]: `Bearer ${
              cookies.get(CLIENT_USER_INFO)?.credentialToken
                ?.accessToken || ""
            }`,
          } as unknown as AdvanceAxiosRequestHeaders,
          url: URL_POST_OTP,
          data: postOTPData,
          controller: abortController,
        })
        .then((result) => {
          cookies.set(
            CLIENT_USER_INFO,
            result.responseData
          );
          navigate("/");
        })
        .catch((error) => {
          setErrorMessage(error.message);
          setModalToggle(true);
        })
        .finally(() => clearTimeout(axiosTimeout))
    );
  }

  useEffect(() => {
    if (!otpEligible) navigate("/login");
  }, []);

  return (
    <Fragment>
      <Modal
        className="dark-bg-color"
        clicked={() => setModalToggle(false)}
        toggle={modalToggle}>
        <ShowResponseModal
          closeModal={() => setModalToggle(false)}
          errorMessage={errorMessage}
        />
      </Modal>
      <div className="sticky-top">
        <div className="otp-container">
          <div className="otp-wrapper">
            <h3 className="margin-bottom-12-18">
              Input kode&nbsp;
              <span className="main-color">OTP</span>
            </h3>
            <label className="margin-top-0 margin-bottom-12-18">
              Kami telah mengirimi kode&nbsp;
              <span className="main-color">
                OTP (One Time Password)
              </span>
              &nbsp;melalui email anda, input disini agar
              kami bisa memverifikasi data anda
            </label>
            <div className="otp-textinput-box">
              <label className="otp-input-title">OTP</label>
              <TextInput
                value={postOTPData.OTPInput}
                onChange={(e) =>
                  handleNumericChange("OTPInput", e)
                }
                maxLength={6}
                type="password"
                className="otp-textinput text-align-center"
              />
            </div>
            <div className="breakline" />
            <Button
              onClick={() => handleSubmitOTP()}
              className="otp-button">
              <p className="otp-button-text">Submit</p>
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
