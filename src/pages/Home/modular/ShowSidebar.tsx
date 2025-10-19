import { useDispatch } from "react-redux";
import {
  setShowSidebar,
  setShowMobileSidebar,
  setSavedLocations,
  setChats,
} from "../../../redux/reducers/pages/home/index.ts";
import { useAppSelector } from "../../../utils/hooks/useRedux";
import HamburgerIcon from "../../../assets/svg/ic_hamburg_3.svg";
import DeleteIcon from "../../../assets/svg/trash-solid.svg";
import ClearIcon from "../../../assets/svg/clear-icon-solid.svg";
import { Fragment } from "react/jsx-runtime";
import Card from "../../../components/Card";
import { formattedCurrencyIDR } from "../../../utils/functions/global";
import { useNavigate } from "react-router-dom";
import { navigateToDetails } from "../../../utils/functions/navigation";
import db from "../../../config/dexie/dexie";
import { IUserSavedLocation } from "../../../interfaces/building";
import { IUserData } from "../../../interfaces/credential";
import { AI_ID } from "../../../variables/constants/ai.ts";
import { addPintrailNoteChatData } from "../../../utils/functions/db.ts";
import { useAxios } from "../../../utils/hooks/useAxios.ts";
import { handlePostClearMessageHistory } from "../../../services/home/POST/index.ts";
import { trackPromise } from "react-promise-tracker";

const SidebarContent = () => {
  const navigate = useNavigate();
  const axiosService = useAxios();
  const dispatch = useDispatch();
  const {
    user,
    chats,
    showSidebar,
    showMobileSidebar,
    savedLocations,
  } = useAppSelector((state) => state.home);

  const handleDeleteSavedLocation = async (
    user: IUserData,
    location: IUserSavedLocation
  ) => {
    try {
      const response = await db.transaction(
        "rw",
        db.user_saved_location_data,
        () => {
          db.user_saved_location_data
            .where("id")
            .equals(location.id)
            .delete();

          const locationDatas = db.user_saved_location_data
            .filter(
              (location) => location.userId === user.userId
            )
            .sortBy("timestamp");

          return locationDatas;
        }
      );

      dispatch(setSavedLocations(response));
    } catch (error) {
      alert(error);
    }
  };

  const handleClearSavedLocation = async (
    user: IUserData | null
  ) => {
    const title = "Yakin mau bersihkan lokasi tersimpan?";
    if (
      user &&
      savedLocations.length > 0 &&
      confirm(title)
    ) {
      try {
        await db.transaction(
          "rw",
          db.user_saved_location_data,
          () => {
            db.user_saved_location_data
              .where("userId")
              .equals(user.userId)
              .delete();
            dispatch(setSavedLocations([]));
          }
        );
      } catch (error) {
        alert(error);
      }
    }
  };

  const handleClearMessageHistory = async (
    user: IUserData | null
  ) => {
    const title =
      "Pintrail bakal lupain semua percakapan kamu loh, Yakin mau bersihkan chat?";
    if (user && chats.length > 0 && confirm(title)) {
      try {
        trackPromise(
          (async () => {
            await handlePostClearMessageHistory(
              user,
              axiosService,
              dispatch,
              navigate
            );
            await db.transaction(
              "rw",
              db.chat_data,
              async () => {
                await db.chat_data
                  .where("sender.id")
                  .equals(user.userId)
                  .delete();
                await db.chat_data
                  .where([
                    "sender.id",
                    "content.sendSpecificToId",
                  ])
                  .equals([AI_ID, user.userId])
                  .delete();
                const added = addPintrailNoteChatData(
                  user,
                  []
                );
                dispatch(setChats(added));
              }
            );
          })()
        );
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <Fragment>
      <div className="home-page-sidebar-header ">
        {showSidebar && (
          <img
            onClick={() => dispatch(setShowSidebar(false))}
            className="home-page-body-header-icon hide-on-mobile-flex cursor-pointer"
            src={HamburgerIcon}
            alt="hamburger-icon-header"
          />
        )}
        {showMobileSidebar && (
          <img
            onClick={() =>
              dispatch(setShowMobileSidebar(false))
            }
            className="home-page-body-header-icon show-on-mobile-flex cursor-pointer"
            src={HamburgerIcon}
            alt="hamburger-icon-header"
          />
        )}
        <img
          onClick={() => handleClearMessageHistory(user)}
          className="home-page-body-clear-icon cursor-pointer"
          src={ClearIcon}
          alt="clear-icon"
        />
      </div>
      <div className="breakline" />
      <hr className="max-width standard-line" />
      <div className="home-page-sidebar-body">
        {savedLocations.length > 0 ? (
          <Fragment>
            <div className="home-page-sidebar-body-item">
              <label
                onClick={() =>
                  handleClearSavedLocation(user)
                }
                className="red-color cursor-pointer">
                Clear
              </label>
            </div>
            {savedLocations.map(
              (
                location: IUserSavedLocation,
                index: number
              ) => (
                <div
                  key={`home-page-sidebar-body-item-${index}`}
                  className="home-page-sidebar-body-item">
                  <Card
                    className="margin-bottom-0"
                    onClick={() =>
                      navigateToDetails(
                        navigate,
                        location.savedLocation
                      )
                    }>
                    <img
                      className="card-img"
                      src={
                        location.savedLocation.image_url[0]
                      }
                      alt={
                        location.savedLocation.image_url[0]
                      }
                    />
                    <div className="breakline" />
                    <div className="breakline" />
                    <p className="light-color font-bold">
                      {
                        location.savedLocation
                          ?.building_title
                      }
                    </p>
                    <p className="margin-bottom-0 main-color">
                      {formattedCurrencyIDR(
                        parseFloat(
                          location.savedLocation
                            ?.housing_price
                        )
                      )}
                    </p>
                    <p className="light-color">
                      {
                        location.savedLocation
                          ?.building_address
                      }
                    </p>
                  </Card>
                  <img
                    onClick={() => {
                      if (user)
                        handleDeleteSavedLocation(
                          user,
                          location
                        );
                    }}
                    className="home-page-body-trash-icon cursor-pointer margin-top-bottom-8"
                    src={DeleteIcon}
                    alt="delete-icon-sidebar"
                  />
                </div>
              )
            )}
          </Fragment>
        ) : (
          <div className="home-page-sidebar-body-item">
            <label>Belum ada lokasi tersimpan</label>
          </div>
        )}
      </div>
      <hr className="max-width standard-line" />
      <div className="home-page-sidebar-footer ">
        <div className="home-page-sidebar-footer-info">
          <label
            onClick={() => navigate("/privacy-policy")}
            className="main-color cursor-pointer">
            Privacy
          </label>
          ·
          <label
            onClick={() => navigate("/tnc")}
            className="main-color cursor-pointer">
            Terms
          </label>
          ·
          <label
            onClick={() => navigate("/tnc")}
            className="main-color cursor-pointer">
            Feedback
          </label>
        </div>
        <label>© 2025 — Kringing Network. All Rights Reserved</label>
      </div>
    </Fragment>
  );
};

export const Sidebar = () => {
  const { showSidebar } = useAppSelector(
    (state) => state.home
  );
  const sidebarContainerClassName = showSidebar
    ? "visible home-page-sidebar-container hide-on-mobile-flex dark-bg-color"
    : "hidden no-width";

  return (
    <div className={sidebarContainerClassName}>
      <SidebarContent />
    </div>
  );
};

export const MobileSidebar = () => {
  const { showMobileSidebar } = useAppSelector(
    (state) => state.home
  );
  const sidebarContainerClassName = showMobileSidebar
    ? "visible home-page-mobile-sidebar-container show-on-mobile-flex dark-bg-color"
    : "hidden no-width";

  return (
    <div className={sidebarContainerClassName}>
      <SidebarContent />
    </div>
  );
};
