/* eslint-disable react-hooks/exhaustive-deps */
import "./style.scss";
import { useEffect } from "react";
import { IBuildingDetails } from "../../interfaces/building";
import TextInput from "../../components/TextInput";
import {
  formattedNumber,
  sendWACS,
} from "../../utils/functions/global";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import TextArea from "../../components/TextArea";
import WhatsappIcon from "../../assets/svg/whatsapp_icon.svg";
import PageLoading from "../PageLoading";
import { PAGE_LOADING_MESSAGE } from "../../variables/constants/building";
import {
  useAppDispatch,
  useAppSelector,
} from "../../utils/hooks/useRedux";
import {
  setFailedImages,
  setSelectedImage,
} from "../../redux/reducers/pages/DetailBuilding";
import { setRendered } from "../../redux/reducers/pages/DetailBuilding";

export default function DetailBuilding() {
  // HOOKS //
  const location = useLocation();
  const navigation = useNavigate();

  // STATES //
  const data = location.state as IBuildingDetails;
  const { rendered, selectedImage, failedImages } =
    useAppSelector((state) => state.detailBuilding);
  const dispatch = useAppDispatch();

  // VARIABLES //
  const pageLoadingClassName = rendered
    ? "hidden no-height"
    : "visible";

  // FUNCTIONS //
  const handleImageError = (index: number) => {
    const newFailedImages = [...failedImages, index];
    dispatch(setFailedImages(newFailedImages));
  };

  useEffect(() => {
    if (!data) return navigation("/");
    dispatch(setRendered(true));
  }, []);

  if (!rendered) {
    return (
      <PageLoading
        className={pageLoadingClassName}
        loadingMessage={PAGE_LOADING_MESSAGE}
        noLogo={false}
      />
    );
  }

  return (
    <div className="detail-building">
      <div className="visible detail-building-container">
        <div className="detail-building-wrapper">
          <div className="detail-building-flex-container">
            <div className="detail-building-body-container">
              <div className="detail-building-body-header-container">
                <div className="detail-building-body-header-left">
                  <h4>{data?.building_title}</h4>
                </div>
                <div className="detail-building-body-header-right">
                  <img
                    onClick={() => sendWACS()}
                    className="detail-building-body-icon"
                    src={WhatsappIcon}
                    alt="whatsapp-icon"
                  />
                </div>
              </div>
              <div className="detail-building-body-mainpic-container dark-bg-color">
                <img
                  className="detail-building-body-mainpic"
                  src={data?.image_url[selectedImage]}
                  alt="main-image"
                />
              </div>
              <div className="detail-building-body-listpic-container dark-bg-color">
                {data?.image_url.map((obj, index) => {
                  return (
                    !failedImages.includes(index) && (
                      <Card
                        key={`detail-building-card-${index}`}
                        className="dark-bg-color margin-top-0 detail-building-card">
                        <img
                          onClick={() =>
                            dispatch(
                              setSelectedImage(index)
                            )
                          }
                          onError={() =>
                            handleImageError(index)
                          }
                          className="card-img"
                          src={obj}
                          alt=""
                        />
                      </Card>
                    )
                  );
                })}
              </div>
              <div className="detail-building-mainbody-container dark-bg-color">
                <div className="detail-building-mainbody-wrapper">
                  <div className="detail-building-textinput-box">
                    <p className="font-bold">Infomasi</p>
                  </div>
                  <div className="detail-building-textinput-box">
                    <label className="detail-building-input-title">
                      Alamat
                    </label>
                    <TextInput
                      value={data?.building_address}
                      type="text"
                      className="detail-building-textinput darker-bg-color"
                    />
                  </div>
                  <div className="detail-building-textinput-box">
                    <label className="detail-building-input-title">
                      Harga (Rp.)
                    </label>
                    <TextInput
                      value={formattedNumber(
                        parseFloat(
                          data?.housing_price ?? "0"
                        )
                      )}
                      type="text"
                      readOnly={true}
                      className="detail-building-textinput darker-bg-color"
                    />
                  </div>
                  <div className="detail-building-textinput-box">
                    <label className="detail-building-input-title">
                      Pemilik
                    </label>
                    <TextInput
                      value={data?.owner_name}
                      type="text"
                      readOnly={true}
                      className="detail-building-textinput darker-bg-color"
                    />
                  </div>
                  {/* <div className="detail-building-textinput-box">
                      <label className="detail-building-input-title">
                        Whatsapp
                      </label>
                      <TextInput
                        value={data?.owner_whatsapp}
                        type="text"
                        readOnly={true}
                        className="detail-building-textinput darker-bg-color"
                      />
                    </div>
                    <div className="detail-building-textinput-box">
                      <label className="detail-building-input-title">
                        Nomor Telepon
                      </label>
                      <TextInput
                        value={data?.owner_phone_number}
                        type="text"
                        readOnly={true}
                        className="detail-building-textinput darker-bg-color"
                      />
                    </div> */}
                  <div className="detail-building-textinput-box">
                    <label className="detail-building-input-title">
                      Email Pemilik
                    </label>
                    <TextInput
                      value={data?.owner_email}
                      type="text"
                      readOnly={true}
                      className="detail-building-textinput darker-bg-color"
                    />
                  </div>
                  <div className="detail-building-textinput-box">
                    <label className="detail-building-input-title">
                      Keterangan
                    </label>
                    <TextArea
                      readOnly={true}
                      className="detail-building-longtext-area darker-bg-color"
                      value={data?.building_description}
                    />
                  </div>
                  <hr className="max-width standard-line" />
                  <label className="margin-top-bottom-16">
                    Untuk detail lebih lanjut kami akan
                    menghubungkan anda dengan pemilik via
                    whatsapp untuk mengonfirmasi
                    ketersediaan kamar, silahkan klik tombol{" "}
                    <span
                      onClick={() => sendWACS()}
                      className="font-bold main-color cursor-pointer">
                      Whatsapp
                    </span>{" "}
                    diatas
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
