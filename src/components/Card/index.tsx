import { ReactNode, useState } from "react";
import "./style.scss";

interface CardProps {
  onKeyUp?: (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => void;
  onClick?: (
    event: React.MouseEvent<HTMLDivElement>
  ) => void;
  className?: string;
  children?: ReactNode;
}

const Card: React.FC<CardProps> = (props) => {
  const [isMouseDown, setIsMouseDown] =
    useState<boolean>(false);
  const style = {
    cursor: isMouseDown ? "grabbing" : "pointer",
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    setIsMouseDown(true);
    if (props.onClick) {
      props.onClick(event);
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  return (
    <div
      onKeyUp={props.onKeyUp}
      onClick={props.onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={style}
      className={"card-container " + props.className}>
      {props.children}
    </div>
  );
};

export default Card;
