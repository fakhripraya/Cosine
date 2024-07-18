import Button from "../../../components/Button";
import { ShowModalProps } from "../../../interfaces/modal";
import {
  ShowErrorTitle,
  ShowSuccessTitle,
} from "./ShowTitle";

const successMessage =
  "Kami sudah berhasil kirimin kamu recovery email ke kamu, tolong dicek ya";

export const ShowResponseModal: React.FC<ShowModalProps> = (
  props
) => (
  <div className="forgot-password-modal-container dark-bg-color">
    <div className="forgot-password-modal-wrapper">
      <Button
        onClick={props.closeModal}
        className="align-self-end forgot-password-button red-bg-color">
        <h4 className="forgot-password-button-text">X</h4>
      </Button>
      <div className="breakline" />
      {props.success && <ShowSuccessTitle />}
      {!props.success && <ShowErrorTitle />}
      <div className="breakline" />
      <label className="margin-top-0 margin-bottom-12-18 white-space-pre-line">
        {props.success && successMessage}
        {!props.success && props.errorMessage}
      </label>
    </div>
  </div>
);
