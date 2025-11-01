import React, { useRef } from "react";
import Card from "../../../components/Card";
import {
  IBuildingDetails,
  IUserSavedLocation,
} from "../../../interfaces/building";
import {
  formattedCurrencyIDR,
  scrollCarousel,
} from "../../../utils/functions/global";
import { useNavigate } from "react-router-dom";
import HamburgerIcon from "../../../assets/svg/square-plus-solid.svg";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../utils/hooks/useRedux";
import {
  setSavedLocations,
  setShowMobileSidebar,
  setShowSidebar,
} from "../../../redux/reducers/pages/home";
import { createSavedLocationData } from "../../../utils/functions/db";
import db from "../../../config/dexie/dexie";
import { navigateToDetails } from "../../../utils/functions/navigation";

interface ShowGrabableStoreCardCarouselProps {
  uniqueKey: string;
  values: IBuildingDetails[];
}

export const ShowGrabableStoreCardCarousel: React.FC<
  ShowGrabableStoreCardCarouselProps
> = (props) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const { user, chatLoading, savedLocations } =
  useAppSelector((state) => state.home);
  const dispatch = useAppDispatch();

  const handleOnSaveLocation = async (
    location: IBuildingDetails
  ) => {
    try {
      if (chatLoading.isLoading)
        return window.alert("Sabar lagi loading nih !");
      if (!user) return navigate("/login");
      if (location) {
        const locationData: IUserSavedLocation =
          createSavedLocationData(location, user);

        const temp: IUserSavedLocation[] = [
          ...savedLocations,
        ];
        temp.push(locationData);

        await db.transaction(
          "rw",
          db.user_saved_location_data,
          async () => {
            const exist = await db.user_saved_location_data
              .where("savedLocationId")
              .equals(locationData.savedLocationId)
              .first();

            if (!exist) {
              await db.user_saved_location_data.add(
                locationData
              );
              dispatch(setSavedLocations(temp));
              dispatch(setShowSidebar(true));
              dispatch(setShowMobileSidebar(true));
            } else {
              alert("Lokasi sudah tersimpan");
            }
          }
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      onMouseDown={(event) =>
        scrollCarousel(event, carouselRef.current)
      }
      className="home-page-carousel-wrapper"
      ref={carouselRef}>
      {props.values?.map((obj, index) => {
        return (
          <div
            key={`carousel-card-${props.uniqueKey}-${index}-id${obj.id}`}>
            <Card
              className="margin-bottom-0"
              onClick={() =>
                navigateToDetails(navigate, obj)
              }>
              <img
                className="card-img"
                src={obj.image_url[0]}
                alt={obj.image_url[0]}
              />
              <div className="breakline" />
              <div className="breakline" />
              <p className="light-color font-bold">
                {obj?.building_title}
              </p>
              <p className="margin-bottom-0 main-color">
                {formattedCurrencyIDR(
                  parseFloat(obj?.housing_price)
                )}
              </p>
              <p className="light-color">
                {obj?.building_address}
              </p>
            </Card>
            <img
              onClick={() => handleOnSaveLocation(obj)}
              className="home-page-body-header-icon cursor-pointer margin-top-bottom-8"
              src={HamburgerIcon}
              alt="hamburger-icon-header"
            />
          </div>
        )
      })}
    </div>
  );
};
