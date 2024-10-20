import Button from "../../../components/Button";
import Modal from "../../../components/Modal";

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
              <label className="font-bold margin-top-0 margin-bottom-12-18">
                Basic
              </label>
              <p>Rp. 19999 {"~50~"}</p>
              <p>Paket basic berisikan 40 token</p>
              <Button>Beli</Button>
              <div className="breakline" />
            </div>
            <div className="darker-bg-color padding-12 border-radius-12">
              <label className="font-bold margin-top-0 margin-bottom-12-18">
                Premium
              </label>
              <p>Rp. 49999</p>
              <p>Paket Premium berisikan 110 token</p>
              <Button>Beli</Button>
              <div className="breakline" />
            </div>
            <div className="darker-bg-color padding-12 border-radius-12">
              <label className="font-bold margin-top-0 margin-bottom-12-18">
                Platinum
              </label>
              <p>Rp. 99999</p>
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
