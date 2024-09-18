import Modal from "../Modal";
import { usePromiseTracker } from "react-promise-tracker";
import WGLogo from "../../assets/svg/LIVEJB_V1_LOGO.svg";
import "./style.scss";

export default function Spinner() {
  const { promiseInProgress } = usePromiseTracker();

  return (
    promiseInProgress && (
      <Modal
        bgClassName="dark-bg-color"
        className="spinner-container"
        toggle={true}>
        <p>Loading...</p>
      </Modal>
    )
  );
}
