import Card from "../../../components/Card";
import Tag from "../../../components/Tag";
import {
  formattedNumber,
  scrollCarousel,
} from "../../../utils/functions/global";
import Notfound404 from "../../../assets/svg/404-notfound-1.svg";

export function handleGoToProductDetail(navigate, id) {
  navigate(`/product-detail?productId=${id}`);
}

export function handleGoToCreativeStore(navigate, id) {
  navigate(`/creative-store?id=${id}`);
}

export const ShowGrabableStoreCardCarousel = (props) =>
  props.values?.map((obj, index) => (
    <Card
      onClick={() =>
        handleGoToCreativeStore(props.navigate, obj.id)
      }
      key={`carousel-card-${props.uniqueKey}-${index}-id${obj.id}`}>
      <img
        className="card-img"
        src={
          obj?.MasterFiles?.[0]?.destination
            ? `${
                process.env.REACT_APP_CHRONOS_SERVICE +
                obj?.MasterFiles?.[0]?.destination
              }`
            : Notfound404
        }
        alt={
          obj?.MasterFiles?.[0]?.destination ||
          obj?.storeName
        }></img>
      <div className="breakline" />
      <div className="breakline" />
      <h3 className="light-color">{obj?.storeName}</h3>
      <p className="margin-bottom-0 light-color">
        {obj?.storeProvince}
      </p>
      <p className="light-color">{obj?.storeDescription}</p>
    </Card>
  ));
