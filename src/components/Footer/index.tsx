import React, { useLayoutEffect, useState } from "react";
import "./style.scss";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { sendWACS } from "../../utils/functions/global";
import { useLocation } from "react-router-dom";
import { APP_EMAIL } from "../../config/environment";

const socialMedia = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/",
  },
  {
    name: "Whatsapp",
    url: "https://web.whatsapp.com/",
  },
];

// Define the types for the props
interface StyledButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

// Define types for Footer component props
interface FooterProps {
  forceShow?: boolean;
}

const StyledButton: React.FC<StyledButtonProps> = (
  props
) => {
  const { children, className = "", onClick } = props;
  return (
    <div className="footer-button-container">
      <Button
        onClick={onClick}
        className={`footer-button ${className}`}>
        {children}
      </Button>
    </div>
  );
};

const Footer: React.FC<FooterProps> = () => {
  const [isRender, setIsRender] = useState(false);
  const navigation = useNavigate();
  const location = useLocation();

  function sendWA(): void {
    sendWACS();
  }

  function handleGoToTNC(): void {
    navigation("/tnc");
  }

  function handleGoToPrivacyPolicy(): void {
    navigation("/privacy-policy");
  }

  useLayoutEffect(() => {
    setIsRender(() => {
      if (location.pathname === "/") return false;
      if (location.pathname === "/detail") return false;
      else return true;
    });
  }, [location]);

  return (
    isRender && (
      <div className="footer-container dark-bg-color">
        <div className="footer-grid-wrapper grid-false">
          <div className="footer-column-1">
            <div className="footer-column-1-wrapper">
              <div className="footer-column-1-media-social">
                {socialMedia.map((social, index) => (
                  <StyledButton
                    key={`footer-styled-button-${index}`}
                    className={"footer-button-outlined"}>
                    {social.name}
                  </StyledButton>
                ))}
              </div>
              <h3 className="text-md font-bold mb-4"> We are based in </h3>
              <h3 className="text-xl font-bold mb-2">Jakarta,&nbsp;</h3>
              <h1 className="break-word text-4xl font-bold">Indonesia</h1>
              <h3 className="text-md font-bold footer-column-1-email">
                Drop us a line at
              </h3>
              <h2 className="text-md font-bold break-word mb-4">
                <a
                  className="footer-column-1-email-text main-color"
                  href={`mailto:${APP_EMAIL}`}>
                  {APP_EMAIL}
                </a>
              </h2>
              <div className="footer-column-1-help">
                <StyledButton
                  onClick={handleGoToPrivacyPolicy}
                  className="footer-button-block">
                  Privacy
                </StyledButton>
                <StyledButton
                  onClick={handleGoToTNC}
                  className="footer-button-block">
                  Our Terms
                </StyledButton>
                <StyledButton
                  onClick={sendWA}
                  className="footer-button-block">
                  Give Us Feedback
                </StyledButton>
              </div>
            </div>
          </div>
          <div className="footer-column-2">
            <div className="footer-column-2-wrapper">
              <label>
                © {"2024"} All Rights Reserved,{" "}
                <span className="main-color font-bold">
                  Pintrail
                </span>
              </label>
              <p
                className="text-align-start"
                onClick={() => sendWA()}>
                Daftarin propertimu{" "}
                <span className="main-color font-bold cursor-pointer">
                  disini !
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Footer;
