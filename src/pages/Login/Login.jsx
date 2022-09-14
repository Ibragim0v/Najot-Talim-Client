import React, { useState } from "react";
import "./Login.scss";
import loginPhoto from "../../assets/images/login.svg";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Queue } from "../../components";

export const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth(false);
  const [view, setView] = useState(false);
  const [inform, setInform] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, pass } = e.target;

    const username = name.value.toString().toLowerCase().trim();
    const password = pass.value.toString().toLowerCase().trim();

    fetch(`${process.env.REACT_APP_API}/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setToken(data?.access_token);
        localStorage.setItem("role", data?.role);
        setInform(data.message);
        navigate(`${data?.role ? `/${data.role}` : "/"}`);
      })
      .catch((err) => console.error(err));
  };

  if (inform === "Unauthorized") {
    setTimeout(() => {
      setInform("");
    }, 2000);
  }

  return (
    <>
      <section className="login">
        <div className="login__wrapper">
          <figure className="login__photo">
            <img
              src={loginPhoto}
              alt="login"
              width={450}
              height={450}
              className="login__img"
            />
          </figure>

          <div className="login__cover">
            <h2 className="login__title">Log In</h2>
            <form onSubmit={handleSubmit}>
              <div className="login__group">
                <label htmlFor="text">
                  <PersonIcon className="icon" />
                </label>

                <input
                  type="text"
                  name="name"
                  className="login__input"
                  id="text"
                  placeholder="Enter Your Phone Username..."
                  autoComplete="off"
                  required
                />
              </div>
              <div className="login__group">
                <label htmlFor="pass">
                  <LockIcon className="icon" />
                </label>
                <input
                  type={view ? "text" : "password"}
                  name="pass"
                  className="login__input"
                  id="pass"
                  placeholder="Enter Your Password..."
                  minLength={8}
                  maxLength={20}
                  autoComplete="off"
                  required
                />
                <span onClick={() => setView(!view)}>
                  {view ? (
                    <VisibilityOffIcon className="icon" />
                  ) : (
                    <VisibilityIcon className="icon" />
                  )}
                </span>
              </div>

              <button type="submit" className="btn login__btn">
                Log In
              </button>
            </form>
          </div>
        </div>
      </section>

      <Queue
        active={inform === "Unauthorized" ? "queue__active" : ""}
        color={"red"}
        title={inform}
      />
    </>
  );
};
