import React from "react";
import "./Sidebar.scss";
import { useLogout } from "../../hooks/useLogout";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

export const Sidebar = ({ links }) => {
  const { setLogout } = useLogout(false);

  return (
    <div className="sidebar">
      <ul className="sidebar__wrapper">
        {links?.map((link) => (
          <li key={link?.id}>
            <Link to={link?.link}>{link?.icon}</Link>
          </li>
        ))}
        <li>
          <button className="sidebar__logout" onClick={() => setLogout(true)}>
            <LogoutIcon className="sidebar__icon" sx={{ fontSize: 50 }} />
          </button>
        </li>
      </ul>
    </div>
  );
};
