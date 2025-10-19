import { useNavigate } from "react-router-dom";
import { useAxios } from "../../../utils/hooks/useAxios";
import { IUserData } from "../../../interfaces/credential";
import Avatar from "react-avatar";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../utils/hooks/useRedux";
import {
  setShowHeaderMenu,
  setShowTopUpMenu,
} from "../../../redux/reducers/pages/home/index.ts";
import { handlePostLogout } from "../../../services/credentials/POST/index.ts";
import Button from "../../../components/Button/index.tsx";

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
            onClick={() => navigate("/register-place")}
            className="cursor-pointer">
            Register Place
          </label>
          <div className="breakline" />
          <label
            onClick={() =>
              handlePostLogout(axiosService, navigate)
            }
            className="red-color cursor-pointer">
            Logout
          </label>
        </div>
      </div>
    );

  return (
    <div className="home-page-body-header">
      <Button className="button-outlined cursor-pointer">
        <span
          onClick={() => navigate("/login")}
          className="main-color"
          >
          Login
        </span>
      </Button >
    </div>
  );
};

export default ShowHeader;
