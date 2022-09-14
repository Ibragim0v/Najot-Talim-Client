import React from "react";
import "./Admin.scss";
import { Sidebar, Users } from "../../components";
import PersonIcon from "@mui/icons-material/Person";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import InsightsIcon from "@mui/icons-material/Insights";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import SchoolIcon from "@mui/icons-material/School";
import ArchiveIcon from "@mui/icons-material/Archive";

export const Admin = () => {
  const links = [
    {
      id: 1,
      link: "/admin",
      icon: <PersonIcon className="sidebar__icon" sx={{ fontSize: 50 }} />,
    },
    {
      id: 2,
      link: "/admin/courses",
      icon: <BubbleChartIcon className="sidebar__icon" sx={{ fontSize: 50 }} />,
    },
    {
      id: 3,
      link: "/admin/teachers",
      icon: <InsightsIcon className="sidebar__icon" sx={{ fontSize: 50 }} />,
    },
    {
      id: 4,
      link: "/admin/students",
      icon: <AutoStoriesIcon className="sidebar__icon" sx={{ fontSize: 50 }} />,
    },
    {
      id: 5,
      link: "/admin/groups",
      icon: <SchoolIcon className="sidebar__icon" sx={{ fontSize: 50 }} />,
    },
    {
      id: 6,
      link: "/admin/archive",
      icon: <ArchiveIcon className="sidebar__icon" sx={{ fontSize: 50 }} />,
    },
  ];

  return (
    <div className="admin">
      <Sidebar links={links} />

      <div className="admin__wrapper">
        <Users className="admin__user" />
      </div>
    </div>
  );
};
