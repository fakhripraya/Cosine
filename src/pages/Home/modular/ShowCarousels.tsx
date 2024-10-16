import React, { useRef } from "react";
import Card from "../../../components/Card";
import { IBuildingDetails } from "../../../interfaces/building";
import {
  formattedCurrencyIDR,
  scrollCarousel,
} from "../../../utils/functions/global";
import {
  NavigateFunction,
  useNavigate,
} from "react-router-dom";
import HamburgerIcon from "../../../assets/svg/square-plus-solid.svg";

interface ShowGrabableStoreCardCarouselProps {
  uniqueKey: string;
  values: IBuildingDetails[];
}

const navigateToDetails = (
  navigate: NavigateFunction,
  args: IBuildingDetails
) => {
  navigate("/detail", {
    state: args,
  });
};

export const ShowGrabableStoreCardCarousel: React.FC<
  ShowGrabableStoreCardCarouselProps
> = (props) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  return (
    <div
      onMouseDown={(event) =>
        scrollCarousel(event, carouselRef.current)
      }
      className="home-page-carousel-wrapper"
      ref={carouselRef}>
      {props.values?.map((obj, index) => (
        <div>
          <Card
            className="margin-bottom-0"
            onClick={() => navigateToDetails(navigate, obj)}
            key={`carousel-card-${props.uniqueKey}-${index}-id${obj.id}`}>
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
            onClick={() => {}}
            className="home-page-body-header-icon cursor-pointer margin-top-bottom-8"
            src={HamburgerIcon}
            alt="hamburger-icon-header"
          />
        </div>
      ))}
    </div>
  );
};
