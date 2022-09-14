import React from "react";
import { Sidebar, Users } from "../../components";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import "./Teacher.scss";

export const Teacher = () => {
  const links = [
    {
      id: 1,
      link: "/teacher",
      icon: <PersonIcon className="sidebar__icon" sx={{ fontSize: 50 }} />,
    },
    {
      id: 2,
      link: "/teacher/groups",
      icon: <SchoolIcon className="sidebar__icon" sx={{ fontSize: 50 }} />,
    },
  ];

  return (
    <div className="teacher">
      <Sidebar links={links} />

      <div className="teacher__wrapper">
        <Users className="teacher__user" />
      </div>
    </div>
  );
};
