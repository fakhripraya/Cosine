import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import { formattedCurrencyIDR } from "../../../utils/functions/global";

export const ShowTopUp = () => {
  return (
    <Modal toggle={true}>
      <div className="child-modal-container dark-bg-color">
        <div className="child-modal-wrapper">
          <Button className="align-self-end child-modal-button red-bg-color">
            <h4 className="child-modal-button-text">X</h4>
          </Button>
          <div className="breakline" />
          <label className="font-bold margin-top-0 margin-bottom-12-18">
            Pilih Paket
          </label>
          <div className="home-page-pricing-plan-container">
            <div className="darker-bg-color padding-12 border-radius-12">
              <h2 className="margin-top-0 margin-bottom-12-18">
                Basic
              </h2>
              <p className="font-strikethrough">
                {formattedCurrencyIDR(25000)}
              </p>
              <h1>{formattedCurrencyIDR(19999)}</h1>
              <p>Paket basic berisikan 40 token</p>
              <Button>Beli</Button>
              <div className="breakline" />
            </div>
            <div className="darker-bg-color padding-12 border-radius-12">
              <h2 className="margin-top-0 margin-bottom-12-18">
                Premium
              </h2>
              <p className="font-strikethrough">
                {formattedCurrencyIDR(75000)}
              </p>
              <h1>{formattedCurrencyIDR(49999)}</h1>
              <p>Paket Premium berisikan 110 token</p>
              <Button>Beli</Button>
              <div className="breakline" />
            </div>
            <div className="darker-bg-color padding-12 border-radius-12">
              <h2 className="margin-top-0 margin-bottom-12-18">
                Platinum
              </h2>
              <p className="font-strikethrough">
                {formattedCurrencyIDR(150000)}
              </p>
              <h1>{formattedCurrencyIDR(99999)}</h1>
              <p>Paket Platinum berisikan 230 token</p>
              <Button>Beli</Button>
              <div className="breakline" />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
