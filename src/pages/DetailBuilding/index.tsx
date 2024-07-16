/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import "./style.scss";
import { Fragment, useRef, useState } from "react";
import { BuildingDetails } from "../../interfaces/building";
import TextArea from "../../components/TextArea";
import TextInput from "../../components/TextInput";
import Modal from "../../components/Modal";
import { formattedNumber } from "../../utils/functions/global";
import { useLocation } from "react-router-dom";

export default function DetailBuilding() {
  const location = useLocation();
  const chatBodyContainerRef =
    useRef<HTMLInputElement>(null);

  const data = location.state as BuildingDetails;
  const [isLoading] = useState<boolean>(false);

  return (
    <Fragment>
      <Modal toggle={isLoading}>...Loading bentar</Modal>
      <div className="home-page">
        <div className="visible detail-building-container">
          <div className="detail-building-wrapper">
            <div className="detail-building-flex-container">
              <div className="detail-building-body-container">
                <div className="detail-building-body-header-container">
                  <div className="detail-building-body-header-left">
                    <h4>{data?.building_title}</h4>
                  </div>
                </div>
                <div className="detail-building-body-mainpic-container">
                  <img
                    className="detail-building-body-mainpic"
                    src={data.image_url[0]}
                    alt="main-image"
                  />
                </div>
                <div className="detail-building-body-listpic-container">
                  {data.image_url.map((obj, index) => {
                    return (
                      <img
                        key={`detail-building-body-listpic-item-${index}`}
                        className="detail-building-body-listpic-item"
                        src={obj}
                        alt={`image-${index}`}
                      />
                    );
                  })}
                </div>
                <div
                  ref={chatBodyContainerRef}
                  className="detail-building-mainbody-container dark-bg-color">
                  <div className="detail-building-mainbody-wrapper">
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
                        className="detail-building-textinput darker-bg-color"
                      />
                    </div>
                    <div className="detail-building-textinput-box">
                      <label className="detail-building-input-title">
                        Whatsapp Pemilik
                      </label>
                      <TextInput
                        value={data?.owner_whatsapp}
                        type="text"
                        className="detail-building-textinput darker-bg-color"
                      />
                    </div>
                    <div className="detail-building-textinput-box">
                      <label className="detail-building-input-title">
                        Nomor Telepon Pemilik
                      </label>
                      <TextInput
                        value={data?.owner_phone_number}
                        type="text"
                        className="detail-building-textinput darker-bg-color"
                      />
                    </div>
                    <div className="detail-building-textinput-box">
                      <label className="detail-building-input-title">
                        Email Pemilik
                      </label>
                      <TextInput
                        value={data?.owner_email}
                        type="text"
                        className="detail-building-textinput darker-bg-color"
                      />
                    </div>
                    <div className="detail-building-textinput-box">
                      <label className="detail-building-input-title">
                        Deskripsi
                      </label>
                      <TextArea
                        className="detail-building-longtext-area darker-bg-color"
                        value={data?.building_description}
                      />
                    </div>
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
