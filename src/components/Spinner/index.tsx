import Modal from "../Modal";
import { usePromiseTracker } from "react-promise-tracker";
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
