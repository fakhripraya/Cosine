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
} from "../../variables/global";
import { useAxios } from "../../utils/hooks/useAxios";
import { trackPromise } from "react-promise-tracker";
import Modal from "../../components/Modal";
import { clearAllUrlParameters } from "../../utils/functions/global";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { cookies } from "../../config/cookie";
import { ShowResponseModal } from "./modular/ShowModal";
import { URL_POST_NEW_PW } from "../../config/xhr/routes/credentials";
import {
  AdvanceAxiosRequestHeaders,
  IResponseObject,
} from "../../interfaces/axios";
import { abortController } from "../../config/xhr/axios";
import { OLYMPUS_SERVICE } from "../../config/environment";
import { INewPasswordData } from "../../interfaces/credential";

const initial: INewPasswordData = {
  newPassword: "",
  confirmPassword: "",
};

export default function NewPassword() {
  // HOOKS //
  const navigate = useNavigate();
  const axiosService = useAxios();
  const [modalToggle, setModalToggle] = useState(false);
  const [postNewPWData, setPostNewPWData] =
    useState<INewPasswordData>(initial);
  const [errorMessage, setErrorMessage] = useState<
    string | null
  >(null);
  const [searchParams] = useSearchParams();

  // VARIABLES
  const userInfo = cookies.get(CLIENT_USER_INFO);
  const recoveryToken = searchParams.get("recoveryToken");
  if (recoveryToken) clearAllUrlParameters();

  // FUNCTIONS SPECIFIC //
  function handleTextChange(
    field: keyof INewPasswordData,
    event: ChangeEvent<HTMLInputElement>
  ) {
    const temp = { ...postNewPWData };
    temp[field] = event.target.value;
    setPostNewPWData(temp);
  }

  function handleNewPWRequest(callback: () => void) {
    if (recoveryToken) {
      const axiosTimeout =
        axiosService.setAxiosTimeout(abortController);
      trackPromise(
        axiosService
          .postData({
            headers: {
              [X_SID]: userInfo?.sid || "",
            } as unknown as AdvanceAxiosRequestHeaders,
            endpoint: OLYMPUS_SERVICE,
            url: URL_POST_NEW_PW,
            data: {
              recoveryToken: recoveryToken,
              ...postNewPWData,
            },
            controller: abortController,
          })
          .then(() => {
            callback();
          })
          .catch((error: IResponseObject) => {
            setErrorMessage(error.errorContent);
            setModalToggle(error.responseError);
          })
          .finally(() => clearTimeout(axiosTimeout))
      );
    }
  }

  function handleOpenLogin() {
    navigate("/login");
  }

  useEffect(() => {
    if (!recoveryToken) navigate("/login");
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
        <div className="new-password-container">
          <div className="new-password-wrapper">
            <h3 className="margin-bottom-12-18">
              Ternyata&nbsp;
              <span className="main-color">
                Beneran Kamu !
              </span>
              &nbsp;Nice !!
            </h3>
            <label className="margin-top-0 margin-bottom-12-18">
              Nicely done bro, sekarang tinggal input kata
              sandi barumu aja
            </label>
            <div className="new-password-textinput-box">
              <label className="new-password-input-title">
                Sandi baru
              </label>
              <TextInput
                value={postNewPWData.newPassword}
                onChange={(e) =>
                  handleTextChange("newPassword", e)
                }
                type="password"
                autoComplete="off"
                className="new-password-textinput text-align-center"
              />
            </div>
            <div className="new-password-textinput-box">
              <label className="new-password-input-title">
                Konfirmasi
              </label>
              <TextInput
                value={postNewPWData.confirmPassword}
                onChange={(e) =>
                  handleTextChange("confirmPassword", e)
                }
                type="password"
                autoComplete="off"
                className="new-password-textinput text-align-center"
              />
            </div>
            <div className="breakline" />
            <label
              onClick={() => handleOpenLogin()}
              className="new-password-forgot-pass main-color cursor-pointer">
              Gak jadi deh, aku ingat passwordku
            </label>
            <Button
              onClick={() =>
                handleNewPWRequest(handleOpenLogin)
              }
              className="new-password-button">
              <p className="new-password-button-text">
                Submit
              </p>
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
