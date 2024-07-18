import Button from "../../../components/Button";
import { ShowModalProps } from "../../../interfaces/modal";

export const ShowResponseModal: React.FC<ShowModalProps> = (
  props
) => (
  <div className="login-modal-container dark-bg-color">
    <div className="login-modal-wrapper">
      <Button
        onClick={props.closeModal}
        className="align-self-end login-button red-bg-color">
        <h4 className="login-button-text">X</h4>
      </Button>
      <div className="breakline" />
      <h3 className="margin-top-0 margin-bottom-12-18">
        There is an <span className="red-color">ERROR</span>
      </h3>
      <div className="breakline" />
      <label className="margin-top-0 margin-bottom-12-18 white-space-pre-line">
        {props.errorMessage}
      </label>
    </div>
  </div>
);
