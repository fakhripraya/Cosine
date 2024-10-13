import React from "react";
import "./style.scss";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { sendWACS } from "../../utils/functions/global";

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
  // VARIABLES
  const navigation = useNavigate();

  // FUNCTIONS SPECIFIC //
  function sendWA(): void {
    sendWACS();
  }

  function handleGoToTNC(): void {
    navigation("/tnc");
  }

  function handleGoToPrivacyPolicy(): void {
    navigation("/privacy-policy");
  }

  return (
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
            <h3> We are based in </h3>
            <h3>Jakarta,&nbsp;</h3>
            <h1 className="break-word`">Indonesia</h1>
            <h3 className="footer-column-1-email">
              Drop us a line at
            </h3>
            <h2 className="break-word">
              <a
                className="footer-column-1-email-text"
                href="mailto:letmeask@wg.com">
                letmeask@pintrail.com
              </a>
            </h2>
            <div className="footer-column-1-help">
              <StyledButton
                onClick={handleGoToPrivacyPolicy}
                className="max-width footer-button-block">
                Privacy Policy
              </StyledButton>
              <StyledButton
                onClick={handleGoToTNC}
                className="max-width footer-button-block">
                Terms and Condition
              </StyledButton>
              <StyledButton
                onClick={sendWA}
                className="max-width footer-button-block">
                Customer Service
              </StyledButton>
            </div>
          </div>
        </div>
        <div className="footer-column-2">
          <div className="footer-column-2-wrapper">
            <p>
              © {"2022"} All Rights Reserved,{" "}
              <span className="main-color font-bold">
                Pintrail
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
