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
    {props.values?.map((obj, index) => (
      <Card
        onClick={() => {}}
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
        <p className="margin-bottom-0 light-color">
          {formattedNumber(parseFloat(obj?.housing_price))}
        </p>
        <p className="light-color">
          {obj?.building_address}
        </p>
        <p className="light-color">
          {obj?.building_description}
        </p>
        <button>see more</button>
      </Card>
    ))}
  </Fragment>
);
