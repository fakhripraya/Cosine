import { Fragment, useState, ChangeEvent } from "react";
import "./style.scss";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import { CLIENT_USER_INFO } from "../../variables/global";
import { trackPromise } from "react-promise-tracker";
import { useAxios } from "../../utils/hooks/useAxios";
import Modal from "../../components/Modal";
import { cookies } from "../../config/cookie";
import { URL_POST_FORGOT_PW } from "../../config/xhr/routes/credentials";
import { IForgotPWData } from "../../interfaces/credential";
import { ShowResponseModal } from "./modular/ShowModal";
import { useNavigate } from "react-router-dom";
import { OLYMPUS_SERVICE } from "../../config/environment";
import { IResponseObject } from "../../interfaces/axios";

const initial: IForgotPWData = {
  email: "",
};

export default function ForgotPassword() {
  // HOOKS //
  const navigate = useNavigate();
  const axiosService = useAxios();
  const [modalToggle, setModalToggle] = useState(false);
  const [postForgotPWData, setPostForgotPWData] =
    useState<IForgotPWData>(initial);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<
    string | null
  >(null);

  // FUNCTIONS SPECIFIC //
  function handleTextChange(
    field: keyof IForgotPWData,
    event: ChangeEvent<HTMLInputElement>
  ) {
    const temp = { ...postForgotPWData };
    temp[field] = event.target.value;
    setPostForgotPWData(temp);
  }

  function handleForgotPWRequest(callback: () => void) {
    const abortController = new AbortController();
    const axiosTimeout =
      axiosService.setAxiosTimeout(abortController);
    trackPromise(
      axiosService
        .postData({
          endpoint: OLYMPUS_SERVICE,
          url: URL_POST_FORGOT_PW,
          data: postForgotPWData,
          controller: abortController,
        })
        .then((result) => {
          cookies.set(
            CLIENT_USER_INFO,
            result.responseData
          );
          callback();
        })
        .catch((error: IResponseObject) => {
          setSuccess(false);
          setErrorMessage(error.errorContent);
          setModalToggle(error.responseError);
        })
        .finally(() => clearTimeout(axiosTimeout))
    );
  }

  function handleOpenLogin() {
    navigate("/login");
  }

  return (
    <Fragment>
      <Modal
        className="dark-bg-color"
        clicked={() => setModalToggle(false)}
        toggle={modalToggle}>
        <ShowResponseModal
          closeModal={() => setModalToggle(false)}
          success={success}
          errorMessage={errorMessage}
        />
      </Modal>
      <div className="sticky-top">
        <div className="forgot-password-container">
          <div className="forgot-password-wrapper">
            <h3 className="margin-bottom-12-18">
              <span className="main-color">Lupa</span> kata
              sandi kamu ?
            </h3>
            <label className="margin-top-0 margin-bottom-12-18">
              Jangan khawatir, kita bakal kirimin kamu email
              recovery
            </label>
            <div className="forgot-password-textinput-box">
              <label className="forgot-password-input-title">
                Email
              </label>
              <TextInput
                value={postForgotPWData.email}
                onChange={(e) =>
                  handleTextChange("email", e)
                }
                type="text"
                className="forgot-password-textinput text-align-center"
              />
            </div>
            <div className="breakline" />
            <label
              onClick={handleOpenLogin}
              className="forgot-password-forgot-pass main-color cursor-pointer">
              Gak jadi deh, aku ingat kata sandiku
            </label>
            <Button
              onClick={() =>
                handleForgotPWRequest(() =>
                  setSuccess(true)
                )
              }
              className="forgot-password-button">
              <p className="forgot-password-button-text">
                Kirim Email
              </p>
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
