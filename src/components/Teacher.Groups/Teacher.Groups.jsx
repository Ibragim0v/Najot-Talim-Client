import React from "react";
import { Sidebar } from "../Sidebar";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";

export const TeacherGroups = () => {
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
    <div className="groups">
      <Sidebar links={links} />

      <div className="groups__wrapper">
        <h1>Teacher Groups</h1>

        <ul></ul>
      </div>
    </div>
  );
};
