import { Fragment, useState, ChangeEvent } from "react";
import "./style.scss";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import GoogleIcon from "../../assets/svg/google.svg";
import { CLIENT_USER_INFO } from "../../variables/global";
import { useAxios } from "../../utils/hooks/useAxios";
import { trackPromise } from "react-promise-tracker";
import Modal from "../../components/Modal";
import { cookies } from "../../config/cookie";
import { useNavigate } from "react-router-dom";
import {
  URL_GET_GOOGLE_URL,
  URL_POST_LOGIN,
  URL_POST_REGISTER,
} from "../../config/xhr/routes/credentials";
import { OLYMPUS_SERVICE } from "../../config/environment";
import { delayInMilliSecond } from "../../utils/functions/global";
import { ERROR_CONFIRM_PASSWORD } from "../../variables/errorMessages/register";
import { IRegisterData } from "../../interfaces/credential";
import { ShowResponseModal } from "./modular/ShowModal";
import { IResponseObject } from "../../interfaces/axios";
import { AxiosRequestConfig } from "axios";

const initial: IRegisterData = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

export default function Register() {
  const navigate = useNavigate();
  const axiosService = useAxios();
  const [modalToggle, setModalToggle] = useState(false);
  const [postRegisterData, setPostRegisterData] =
    useState<IRegisterData>(initial);
  const [errorMessage, setErrorMessage] = useState<
    string | null
  >(null);

  function handleTextChange(
    field: keyof IRegisterData,
    event: ChangeEvent<HTMLInputElement>
  ) {
    const temp = { ...postRegisterData };
    temp[field] = event.target.value;
    setPostRegisterData(temp);
  }

  function handleLocalFilter() {
    const confirmPassword =
      postRegisterData.confirmPassword;
    const password = postRegisterData.password;
    if (confirmPassword !== password) return true;
    else return false;
  }

  function handleAfterRegister(
    data: AxiosRequestConfig["data"],
    callback: () => void
  ) {
    const abortController = new AbortController();
    const axiosTimeout =
      axiosService.setAxiosTimeout(abortController);
    trackPromise(
      axiosService
        .postData({
          endpoint: OLYMPUS_SERVICE,
          url: URL_POST_LOGIN,
          data: data,
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
          setErrorMessage(error.errorContent);
          setModalToggle(error.responseError);
        })
        .finally(() => clearTimeout(axiosTimeout))
    );
  }

  function handlePostRegister() {
    if (handleLocalFilter()) {
      setErrorMessage(ERROR_CONFIRM_PASSWORD.errorContent);
      setModalToggle(true);
    }

    const abortController = new AbortController();
    const axiosTimeout =
      axiosService.setAxiosTimeout(abortController);
    trackPromise(
      axiosService
        .postData({
          endpoint: OLYMPUS_SERVICE,
          url: URL_POST_REGISTER,
          data: postRegisterData,
          controller: abortController,
        })
        .then(() =>
          handleAfterRegister(
            {
              username: postRegisterData.username,
              password: postRegisterData.password,
            },
            () => navigate("/otp")
          )
        )
        .catch((error: IResponseObject) => {
          setErrorMessage(error.errorContent);
          setModalToggle(error.responseError);
        })
        .finally(() => clearTimeout(axiosTimeout))
    );
  }

  function handlePostGoogleAuth() {
    const abortController = new AbortController();
    const axiosTimeout =
      axiosService.setAxiosTimeout(abortController);

    trackPromise(
      axiosService
        .getData({
          endpoint: OLYMPUS_SERVICE,
          url: URL_GET_GOOGLE_URL,
          controller: abortController,
        })
        .then(async (result) => {
          window.location.replace(result.responseData);
          await delayInMilliSecond(10000);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => clearTimeout(axiosTimeout))
    );
  }

  function handleOpenForgotPassword() {
    navigate("/forgot-password");
  }

  function handleOpenLogin() {
    navigate("/login");
  }

  return (
    <Fragment>
      <Modal
        className="dark-bg-color"
        clicked={() => {}}
        toggle={modalToggle}>
        <ShowResponseModal
          closeModal={() => setModalToggle(false)}
          errorMessage={errorMessage}
        />
      </Modal>
      <div className="sticky-top">
        <div className="register-container">
          <div className="register-wrapper">
            <h3 className="margin-bottom-12-18">
              Sini{" "}
              <span className="main-color">Gabung</span>{" "}
              sama kita !
            </h3>
            <label className="margin-top-0 margin-bottom-12-18">
              Tunggu apa lagi ayo gabung sama kita, Cosine
              pengen banget ngobrol dan nyariin kamu kosan
              nih !
            </label>
            <div className="register-textinput-box">
              <label className="register-input-title">
                ID
              </label>
              <TextInput
                value={postRegisterData.username}
                onChange={(e) =>
                  handleTextChange("username", e)
                }
                type="text"
                className="register-textinput text-align-center"
              />
            </div>
            <div className="register-textinput-box">
              <label className="register-input-title">
                Email
              </label>
              <TextInput
                value={postRegisterData.email}
                onChange={(e) =>
                  handleTextChange("email", e)
                }
                type="text"
                className="register-textinput text-align-center"
              />
            </div>
            <div className="register-textinput-box">
              <label className="register-input-title">
                Sandi
              </label>
              <TextInput
                value={postRegisterData.password}
                onChange={(e) =>
                  handleTextChange("password", e)
                }
                type="password"
                className="register-textinput text-align-center"
              />
            </div>
            <div className="register-textinput-box">
              <label className="register-input-title">
                Konfirmasi
              </label>
              <TextInput
                value={postRegisterData.confirmPassword}
                onChange={(e) =>
                  handleTextChange("confirmPassword", e)
                }
                type="password"
                className="register-textinput text-align-center"
              />
            </div>
            <div className="breakline" />
            <label
              onClick={handleOpenForgotPassword}
              className="register-forgot-pass main-color cursor-pointer">
              Lupa kata sandi ?
            </label>
            <Button
              onClick={handlePostRegister}
              className="register-button">
              <p className="register-button-text">Daftar</p>
            </Button>
            <div className="breakline" />
            <div className="breakline" />
            <label className="register-middle-text">
              atau lanjut dengan
            </label>
            <div className="register-open-auths">
              <Button
                onClick={handlePostGoogleAuth}
                className="register-open-auths-button light-bg-color">
                <img
                  src={GoogleIcon}
                  alt={"google-icon"}
                />
              </Button>
            </div>
            <div className="breakline" />
            <div className="breakline" />
            <label className="register-middle-text">
              Sudah punya akun ?&nbsp;
              <span
                onClick={handleOpenLogin}
                className="main-color cursor-pointer">
                Login sekarang
              </span>
            </label>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
