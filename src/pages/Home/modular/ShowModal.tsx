import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import {
  setShowErrorMessage,
  setShowTopUpMenu,
} from "../../../redux/reducers/pages/home/index.ts";
import {
  formattedCurrencyIDR,
  sendWACS,
} from "../../../utils/functions/global";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../utils/hooks/useRedux";
import { defaultError } from "../../../variables/global.ts";

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
                {formattedCurrencyIDR(30000)}
              </p>
              <h1>{formattedCurrencyIDR(19999)}</h1>
              <p className="text-ellipsis">
                Berisikan 30 Trailtokens
              </p>
              <div className="breakline" />
              <Button onClick={() => sendWACS()}>
                Beli
              </Button>
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
                Berisikan 70 Trailtokens
              </p>
              <div className="breakline" />
              <Button onClick={() => sendWACS()}>
                Beli
              </Button>
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
                Berisikan 150 Trailtokens
              </p>
              <div className="breakline" />
              <Button onClick={() => sendWACS()}>
                Beli
              </Button>
              <div className="breakline" />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export const ShowErrorMessage = () => {
  // STATES
  const { showErrorMessage } = useAppSelector(
    (state) => state.home
  );
  const dispatch = useAppDispatch();

  return (
    <Modal
      clicked={() =>
        dispatch(setShowErrorMessage(defaultError))
      }
      toggle={showErrorMessage.isError}>
      <div className="child-modal-container dark-bg-color">
        <div className="child-modal-wrapper">
          <Button
            onClick={() =>
              dispatch(setShowErrorMessage(defaultError))
            }
            className="align-self-end child-modal-button red-bg-color">
            <h4 className="child-modal-button-text">X</h4>
          </Button>
          <div className="breakline" />
          <h3 className="margin-top-0 margin-bottom-12-18">
            There is an{" "}
            <span className="red-color">ERROR</span>
          </h3>
          <div className="breakline" />
          <label className="margin-top-0 margin-bottom-12-18 white-space-pre-line">
            {showErrorMessage.errorContent}
          </label>
        </div>
      </div>
    </Modal>
  );
};
