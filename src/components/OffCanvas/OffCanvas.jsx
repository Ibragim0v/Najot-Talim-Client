import React, { useState } from "react";
import "./Offcanvas.scss";
import { Queue } from "../Queue";

export const OffCanvas = ({ title, inputs, link }) => {
  const [inform, setInform] = useState(null);
  const handleUser = (e) => {
    e.preventDefault();

    const { name, pass, tel } = e.target;

    fetch(`${process.env.REACT_APP_API}${link}`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: name.value.toString().toLowerCase().trim(),
        password: pass.value.toString().toLowerCase().trim(),
        phone: tel.value.toString().toLowerCase().trim(),
      }),
    })
      .then((res) => res.json())
      .then((data) => setInform(data?.message))
      .catch((err) => console.error(err));
  };

  if (inform) {
    setTimeout(() => {
      setInform("");
    }, 2000);
  }

  return (
    <>
      <div
        className="offcanvas offcanvas-end"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">{title}</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <form onSubmit={handleUser}>
            {inputs.map((e) => (
              <input
                key={e.id}
                type={e.type}
                name={e.name}
                placeholder={`Enter ${e.title}`}
                className="offcanvas__input"
                autoComplete="off"
                required
              />
            ))}
            <button className="btn offcanvas__btn" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>

      <Queue
        color={inform === "User is available" ? "red" : "green"}
        active={inform && "queue__active"}
        title={inform}
      />
    </>
  );
};
