import React, { CSSProperties } from "react";
import "./style.scss";
import MainLogo from "../../assets/png/transparent-pintrail.png";

interface PageLoadingProps {
  containerStyle?: CSSProperties;
  wrapperStyle?: CSSProperties;
  className?: string;
  loadingMessage: string;
  noLogo?: boolean;
}

const PageLoading: React.FC<PageLoadingProps> = ({
  containerStyle,
  wrapperStyle,
  className = "",
  loadingMessage,
  noLogo = false,
}: PageLoadingProps) => {
  return (
    <div
      style={containerStyle}
      className={`page-loading-container ${className}`}>
      <div
        style={wrapperStyle}
        className="page-loading-wrapper">
        {!noLogo && (
          <img
            className="spinner-logo-img page-loading-logo-img"
            src={MainLogo}
            alt="main_logo"
          />
        )}
        <label className="page-loading-text">
          {loadingMessage}
        </label>
      </div>
    </div>
  );
};

export default PageLoading;
