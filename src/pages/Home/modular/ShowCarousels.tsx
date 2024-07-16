import React, { useRef } from "react";
import Card from "../../../components/Card";
import { BuildingDetails } from "../../../interfaces/building";
import {
  formattedCurrencyIDR,
  scrollCarousel,
} from "../../../utils/functions/global";
import {
  NavigateFunction,
  useNavigate,
} from "react-router-dom";

interface ShowGrabableStoreCardCarouselProps {
  uniqueKey: string;
  values: BuildingDetails[];
}

const navigateToDetails = (
  navigate: NavigateFunction,
  args: BuildingDetails
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
        <Card
          onClick={() => navigateToDetails(navigate, obj)}
          key={`carousel-card-${props.uniqueKey}-${index}-id${obj.id}`}>
          <img
            className="card-img"
            src={obj.image_url[0]}
            alt={obj.image_url[0]}
          />
          <div className="breakline" />
          <div className="breakline" />
          <h3 className="light-color">
            {obj?.building_title}
          </h3>
          <p className="margin-bottom-0 main-color">
            {formattedCurrencyIDR(
              parseFloat(obj?.housing_price)
            )}
          </p>
          <p className="light-color">
            {obj?.building_address}
          </p>
        </Card>
      ))}
    </div>
  );
};
