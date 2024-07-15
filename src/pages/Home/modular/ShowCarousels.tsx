import React, { Fragment } from "react";
import Card from "../../../components/Card";
import { BuildingDetails } from "../../../interfaces/building";
import { formattedNumber } from "../../../utils/functions/global";

interface ShowGrabableStoreCardCarouselProps {
  uniqueKey: string;
  values: BuildingDetails[];
}

export const ShowGrabableStoreCardCarousel: React.FC<
  ShowGrabableStoreCardCarouselProps
> = (props) => (
  <Fragment>
    {props.values?.map((obj, index) => {
      obj.image_url = obj.image_url.replace(/'/g, '"');
      const actualImages: string[] = JSON.parse(
        obj.image_url
      );
      return (
        <Card
          onClick={() => {
            console.log(actualImages);
          }}
          key={`carousel-card-${props.uniqueKey}-${index}-id${obj.id}`}>
          <img
            className="card-img"
            src={actualImages[0]}
            alt={actualImages[0]}
          />
          <div className="breakline" />
          <div className="breakline" />
          <h3 className="light-color">
            {obj?.building_title}
          </h3>
          <p className="margin-bottom-0 light-color">
            {formattedNumber(
              parseFloat(obj?.housing_price)
            )}
          </p>
          <p className="light-color">
            {obj?.building_address}
          </p>
          <p className="light-color">
            {obj?.building_description}
          </p>
          <button>see more</button>
        </Card>
      );
    })}
  </Fragment>
);
