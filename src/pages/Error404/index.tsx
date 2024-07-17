import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import "./style.scss";

const Error404: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="error404-container">
      <div className="error404-wrapper">
        <div className="error404-title">
          <h3 className="margin-bottom-0 red-color">
            ERROR 404
          </h3>
          <div className="breakline" />
          <label>
            Mungkin halaman ini sedang{" "}
            <span className="red-color">maintenance</span>{" "}
            atau{" "}
            <span className="red-color">
              tidak dapat ditemukan
            </span>
          </label>
          <div className="breakline" />
          <Button onClick={() => navigate("/")}>
            Balik ke home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Error404;
