import "./style.scss";
import React, {
  Fragment,
  ReactNode,
  useEffect,
} from "react";

interface ModalProps {
  className?: string;
  bgClassName?: string;
  toggle: boolean;
  clicked?: () => void;
  children?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  className,
  bgClassName,
  children,
  toggle,
  clicked,
}) => {
  const backgroundClassName = toggle
    ? `modal-background ${bgClassName}`
    : "";
  const containerInline = {
    display: toggle ? "block" : "none",
  };

  if (!clicked) clicked = () => null;
  const handleOnClick = () => {
    clicked();
  };

  useEffect(() => {
    // useEffect logic can be added here if needed
  }, []);

  return (
    <Fragment>
      <div
        onClick={handleOnClick}
        className={backgroundClassName}
      />
      <div
        style={containerInline}
        className={`modal-container ${className || ""}`}>
        {children}
      </div>
    </Fragment>
  );
};

export default Modal;
