import { useState } from "react";
import "./style.scss";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import GoogleIcon from "../../assets/svg/google.svg";
import { CLIENT_USER_INFO } from "../../variables/global";
import { useAxios } from "../../utils/hooks/useAxios";
import { cookies } from "../../config/cookie";
import { ILoginData } from "../../interfaces/login";
import {
  URL_GET_GOOGLE_URL,
  URL_POST_LOGIN,
} from "../../config/xhr/routes/credentials";
import { trackPromise } from "react-promise-tracker";
import { useNavigate } from "react-router-dom";
import { OLYMPUS_SERVICE } from "../../config/environment";
import { delayInMilliSecond } from "../../utils/functions/global";
import { IResponseObject } from "../../interfaces/axios";

const initial = {
  username: "",
  password: "",
};

export default function Login() {
  // HOOKS //
  const navigate = useNavigate();
  const axiosService = useAxios();
  const [postLoginData, setPostLoginData] =
    useState<ILoginData>(initial);

  // FUNCTIONS SPECIFIC //
  function handleTextChange(
    field: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const temp: ILoginData = { ...postLoginData };
    temp[field] = event.target.value;
    setPostLoginData(temp);
  }

  function handleLoginRequest(callback: () => void) {
    trackPromise(
      axiosService
        .postData({
          endpoint: OLYMPUS_SERVICE,
          url: URL_POST_LOGIN,
          data: postLoginData,
        })
        .then((result) => {
          cookies.set(
            CLIENT_USER_INFO,
            result.responseData
          );
          callback();
        })
        .catch((error) => {
          console.log(error);
        })
    );
  }

  function handlePostGoogleAuth() {
    trackPromise(
      axiosService
        .getData({
          endpoint: OLYMPUS_SERVICE,
          url: URL_GET_GOOGLE_URL,
        })
        .then(async (result: IResponseObject) => {
          window.location.replace(result.responseData);
          await delayInMilliSecond(10000);
        })
        .catch((error) => {
          console.log(error);
        })
    );
  }

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <h3 className="margin-bottom-12-18">
          <span className="main-color">Login</span> Untuk
          Mengakses
        </h3>
        <label className="margin-top-0 margin-bottom-12-18">
          Mulai bisnis dan komunitasmu sekarang, tunggu apa
          lagi?
        </label>
        <div className="login-textinput-box">
          <label className="login-input-title">ID</label>
          <TextInput
            value={postLoginData.username}
            onChange={(e) =>
              handleTextChange("username", e)
            }
            type="text"
            className="login-textinput text-align-center"
          />
        </div>
        <div className="login-textinput-box">
          <label className="login-input-title">Sandi</label>
          <TextInput
            value={postLoginData.password}
            onChange={(e) =>
              handleTextChange("password", e)
            }
            type="password"
            className="login-textinput text-align-center"
          />
        </div>
        <div className="breakline" />
        <label
          onClick={() => {}}
          className="login-forgot-pass main-color cursor-pointer">
          Lupa kata sandi ?
        </label>
        <Button
          onClick={() =>
            handleLoginRequest(() => navigate("/"))
          }
          className="login-button">
          <p className="login-button-text">Login</p>
        </Button>
        <div className="breakline" />
        <div className="breakline" />
        <label className="login-middle-text">
          Atau lanjut dengan
        </label>
        <div className="login-open-auths">
          <Button
            onClick={() => {
              handlePostGoogleAuth();
            }}
            className="login-open-auths-button light-bg-color">
            <img
              src={GoogleIcon}
              alt={"google-icon"}
            />
          </Button>
        </div>
        <div className="breakline" />
        <div className="breakline" />
        <label className="login-middle-text">
          Belum jadi member ?{" "}
          <span
            onClick={() => {}}
            className="main-color cursor-pointer">
            Daftar akun Sekarang
          </span>
        </label>
      </div>
    </div>
  );
}
