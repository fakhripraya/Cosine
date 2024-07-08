import React, { Fragment } from "react";
import Card from "../../../components/Card";
import Notfound404 from "../../../assets/svg/404-notfound-1.svg";
import { BuildingDetails } from "../../../interfaces/building";

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
          src={
            obj?.MasterFiles?.[0]?.destination
              ? `${process.env.REACT_APP_CHRONOS_SERVICE}${obj.MasterFiles[0].destination}`
              : Notfound404
          }
          alt={
            obj?.MasterFiles?.[0]?.destination ||
            obj?.storeName
          }
        />
        <div className="breakline" />
        <div className="breakline" />
        <h3 className="light-color">{obj?.storeName}</h3>
        <p className="margin-bottom-0 light-color">
          {obj?.storeProvince}
        </p>
        <p className="light-color">
          {obj?.storeDescription}
        </p>
      </Card>
    ))}
  </Fragment>
);
