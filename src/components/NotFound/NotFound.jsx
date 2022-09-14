import React from "react";
import { Link } from "react-router-dom";
import notFoundPhoto from "../../assets/images/notFound.jpg";
import "./NotFound.scss";

export const NotFound = ({ link }) => {
  return (
    <section className="notfound">
      <div className="notfound__wrapper">
        <figure className="notfound__photo">
          <img
            src={notFoundPhoto}
            alt="notfound"
            width={450}
            height={450}
            className="notfound__img"
          />
        </figure>

        <div className="notfound__cover">
          <h2 className="notfound__title">Ooops!</h2>
          <p className="notfound__txt">
            The page <span className="notfound__mark">you're looking for</span>{" "}
            does not exist.
          </p>
          <Link to={link} className="btn">
            Previous page
          </Link>
        </div>
      </div>
    </section>
  );
};
