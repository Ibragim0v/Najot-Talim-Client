import React from "react";
import "./Student.Groups.scss";
import { Sidebar } from "../Sidebar";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";

export const StudentGroups = () => {
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
    <div className="groups">
      <Sidebar links={links} />

      <div className="groups__wrapper">
        <h1>Student Groups</h1>
      </div>
    </div>
  );
};
