import Modal from "../Modal";
import { usePromiseTracker } from "react-promise-tracker";
import "./style.scss";
import MainLogo from "../../assets/png/transparent-pintrail.png";

export default function Spinner() {
  const { promiseInProgress } = usePromiseTracker();

  return (
    promiseInProgress && (
      <Modal
        bgClassName="dark-bg-color"
        className="spinner-container"
        toggle={true}>
        <div className="spinner-wrapper">
          <img
            className="spinner-logo-img"
            src={MainLogo}
            alt="main_logo"
          />
          <p>Sabar ya tunggu bentar...</p>
        </div>
      </Modal>
    )
  );
}
