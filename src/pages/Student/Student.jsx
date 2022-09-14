import React from "react";
import { Sidebar, Users } from "../../components";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import "./Student.scss";

export const Student = () => {
  const links = [
    {
      id: 1,
      link: "/student",
      icon: <PersonIcon className="sidebar__icon" sx={{ fontSize: 50 }} />,
    },
    {
      id: 2,
      link: "/student/groups",
      icon: <SchoolIcon className="sidebar__icon" sx={{ fontSize: 50 }} />,
    },
  ];

  return (
    <div className="student">
      <Sidebar links={links} />

      <div className="student__wrapper">
        <Users className="student__user" />
      </div>
    </div>
  );
};
