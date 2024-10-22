import { useDispatch } from "react-redux";
import {
  setShowSidebar,
  setShowMobileSidebar,
  setSavedLocations,
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

const SidebarContent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    user,
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
    if (user) {
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
          onClick={() => handleClearSavedLocation(user)}
          className="home-page-body-clear-icon cursor-pointer"
          src={ClearIcon}
          alt="clear-icon"
        />
      </div>
      <div className="breakline" />
      <hr className="max-width standard-line" />
      <div className="home-page-sidebar-body">
        {savedLocations.length > 0 ? (
          savedLocations.map(
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
                    {location.savedLocation?.building_title}
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
          )
        ) : (
          <label>Belum ada lokasi tersimpan</label>
        )}
      </div>
      <hr className="max-width standard-line" />
      <div className="home-page-sidebar-footer ">
        <label>© 2024 All Rights Reserved</label>
        <div className="home-page-sidebar-footer-info">
          <label
            onClick={() => navigate("/privacy-policy")}
            className="main-color cursor-pointer">
            Privacy
          </label>
          <label
            onClick={() => navigate("/tnc")}
            className="main-color cursor-pointer">
            Terms
          </label>
          <label
            onClick={() => navigate("/tnc")}
            className="main-color cursor-pointer">
            Feedback
          </label>
        </div>
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
