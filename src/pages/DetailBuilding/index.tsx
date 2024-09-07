/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import "./style.scss";
import { Fragment, useState } from "react";
import { BuildingDetails } from "../../interfaces/building";
// import TextArea from "../../components/TextArea";
import TextInput from "../../components/TextInput";
import Modal from "../../components/Modal";
import {
  formattedNumber,
  sendWACS,
} from "../../utils/functions/global";
import { useLocation } from "react-router-dom";
import Card from "../../components/Card";
import TextArea from "../../components/TextArea";
import Button from "../../components/Button";

export default function DetailBuilding() {
  const location = useLocation();

  const data = location.state as BuildingDetails;
  const [isLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] =
    useState<number>(0);
  const [failedImages, setFailedImages] = useState<
    number[]
  >([]);

  const handleImageError = (index: number) => {
    setFailedImages((prevFailedImages) => [
      ...prevFailedImages,
      index,
    ]);
  };

  return (
    <Fragment>
      <Modal toggle={isLoading}>...Loading bentar</Modal>
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
                    <Button onClick={() => sendWACS()}>
                      Detail
                    </Button>
                  </div>
                </div>
                <div className="detail-building-body-mainpic-container dark-bg-color">
                  <img
                    className="detail-building-body-mainpic"
                    src={data.image_url[selectedImage]}
                    alt="main-image"
                  />
                </div>
                <div className="detail-building-body-listpic-container dark-bg-color">
                  {data.image_url.map((obj, index) => {
                    return (
                      !failedImages.includes(index) && (
                        <Card
                          key={`detail-building-card-${index}`}
                          className="dark-bg-color margin-top-0 detail-building-card">
                          <img
                            onClick={() =>
                              setSelectedImage(index)
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
                      ketersediaan kamar, silahkan klik
                      tombol{" "}
                      <span className="font-bold main-color">
                        detail
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
    </Fragment>
  );
}
