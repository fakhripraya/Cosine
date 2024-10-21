import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import { setShowTopUpMenu } from "../../../redux/reducers/pages/Home";
import { formattedCurrencyIDR } from "../../../utils/functions/global";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../utils/hooks/useRedux";

export const ShowTopUp = () => {
  // STATES
  const { showTopUpMenu } = useAppSelector(
    (state) => state.home
  );
  const dispatch = useAppDispatch();

  return (
    <Modal
      clicked={() => dispatch(setShowTopUpMenu(false))}
      toggle={showTopUpMenu}>
      <div className="child-modal-container dark-bg-color">
        <div className="child-modal-wrapper">
          <Button
            onClick={() =>
              dispatch(setShowTopUpMenu(false))
            }
            className="align-self-end child-modal-button red-bg-color">
            <h4 className="child-modal-button-text">X</h4>
          </Button>
          <div className="breakline" />
          <label className="font-bold margin-top-0 margin-bottom-12-18">
            Pilih Paket
          </label>
          <div className="home-page-pricing-plan-container">
            <div className="home-page-pricing-plan-card darker-bg-color padding-12 border-radius-12">
              <h2 className="margin-top-0 margin-bottom-12-18">
                Basic
              </h2>
              <p className="font-strikethrough">
                {formattedCurrencyIDR(20000)}
              </p>
              <h1>{formattedCurrencyIDR(9999)}</h1>
              <p className="text-ellipsis">
                Berisikan 30 Trailtokens
              </p>
              <Button>Beli</Button>
              <div className="breakline" />
            </div>
            <div className="home-page-pricing-plan-card darker-bg-color padding-12 border-radius-12">
              <h2 className="margin-top-0 margin-bottom-12-18">
                Premium
              </h2>
              <p className="font-strikethrough">
                {formattedCurrencyIDR(50000)}
              </p>
              <h1>{formattedCurrencyIDR(29999)}</h1>
              <p className="text-ellipsis">
                Berisikan 120 Trailtokens
              </p>
              <Button>Beli</Button>
              <div className="breakline" />
            </div>
            <div className="home-page-pricing-plan-card darker-bg-color padding-12 border-radius-12">
              <h2 className="margin-top-0 margin-bottom-12-18">
                Platinum
              </h2>
              <p className="font-strikethrough">
                {formattedCurrencyIDR(100000)}
              </p>
              <h1>{formattedCurrencyIDR(59999)}</h1>
              <p className="text-ellipsis">
                Berisikan 250 Trailtokens
              </p>
              <Button>Beli</Button>
              <div className="breakline" />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
