import { useNavigate } from "react-router-dom";
import { useAxios } from "../../../utils/hooks/useAxios";
import {
  AUTHORIZATION,
  CLIENT_USER_INFO,
  X_SID,
} from "../../../variables/global";
import { cookies } from "../../../config/cookie";
import { trackPromise } from "react-promise-tracker";
import { URL_POST_LOGOUT } from "../../../config/xhr/routes/credentials";
import {
  ARES_SERVICE,
  OLYMPUS_SERVICE,
} from "../../../config/environment";
import {
  AdvanceAxiosRequestHeaders,
  IResponseObject,
} from "../../../interfaces/axios";
import {
  ICookieInfo,
  IUserData,
} from "../../../interfaces/credential";
import { handleException } from "../../../utils/functions/global";
import Avatar from "react-avatar";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../utils/hooks/useRedux";
import {
  setShowHeaderMenu,
  setShowTopUpMenu,
  setBalance,
  setShowErrorMessage,
} from "../../../redux/reducers/pages/home/index.ts";
import { URL_GET_BALANCE_AMOUNT } from "../../../config/xhr/routes/balance.ts";
import { useEffect } from "react";

interface ShowHeaderProps {
  user: IUserData | null;
}

const ShowHeader: React.FC<ShowHeaderProps> = ({
  user,
}) => {
  // HOOKS
  const navigate = useNavigate();
  const axiosService = useAxios();

  // STATES
  const { balance, showHeaderMenu } = useAppSelector(
    (state) => state.home
  );
  const dispatch = useAppDispatch();

  // VARIABLES
  const headerMenuClassName = showHeaderMenu
    ? "visible"
    : "hidden";

  const handleLogout = () => {
    const abortController = new AbortController();
    const axiosTimeout =
      axiosService.setAxiosTimeout(abortController);
    const clientUserInfo: ICookieInfo = cookies.get(
      CLIENT_USER_INFO
    );

    if (!user) return;
    if (!clientUserInfo) return;

    trackPromise(
      axiosService
        .postData({
          headers: {
            [X_SID]: clientUserInfo.sid || "",
          } as unknown as AdvanceAxiosRequestHeaders,
          endpoint: OLYMPUS_SERVICE,
          url: URL_POST_LOGOUT,
          controller: abortController,
        })
        .then(() => navigate("/login"))
        .catch((error) => handleException(error))
        .finally(() => {
          cookies.remove(CLIENT_USER_INFO, { path: "/" });
          clearTimeout(axiosTimeout);
        })
    );
  };

  useEffect(() => {
    const abortController = new AbortController();
    const axiosTimeout =
      axiosService.setAxiosTimeout(abortController);
    const clientUserInfo: ICookieInfo = cookies.get(
      CLIENT_USER_INFO
    );

    if (!user) return;
    if (!clientUserInfo) return;
    trackPromise(
      axiosService
        .getData({
          headers: {
            [AUTHORIZATION]:
              `Bearer ${clientUserInfo?.credentialToken.accessToken}` ||
              "",
            [X_SID]: clientUserInfo.sid || "",
          } as unknown as AdvanceAxiosRequestHeaders,
          endpoint: ARES_SERVICE,
          url: URL_GET_BALANCE_AMOUNT,
          controller: abortController,
        })
        .then((result: IResponseObject) => {
          dispatch(setBalance(result.responseData));
        })
        .catch((error: IResponseObject) => {
          dispatch(
            setShowErrorMessage({
              isError: error.responseError,
              errorContent: error.errorContent,
            })
          );
        })
        .finally(() => clearTimeout(axiosTimeout))
    );
  }, []);

  if (user)
    return (
      <div className="home-page-body-header">
        <label className="margin-right-8 white-space-pre-line">
          {user.fullName ?? "Guest"}
          {"\n"}
          <span
            onClick={() => dispatch(setShowTopUpMenu(true))}
            className="cursor-pointer ">
            {balance} Trailtokens
          </span>
        </label>
        <Avatar
          onClick={() =>
            dispatch(
              setShowHeaderMenu(
                showHeaderMenu ? false : true
              )
            )
          }
          style={{ cursor: "pointer" }}
          round={true}
          size={"50"}
          src={user.fullName}
          title={user.fullName}
          name={user.fullName}
        />
        <div
          className={`home-page-body-header-menu-container darker-bg-color ${headerMenuClassName}`}>
          <label
            onClick={() => dispatch(setShowTopUpMenu(true))}
            className="cursor-pointer">
            Top up
          </label>
          <div className="breakline" />
          <label
            onClick={handleLogout}
            className="red-color cursor-pointer">
            Logout
          </label>
        </div>
      </div>
    );

  return (
    <div className="home-page-body-header">
      <p
        onClick={() => navigate("/login")}
        className="main-color cursor-pointer">
        Login
      </p>
    </div>
  );
};

export default ShowHeader;
