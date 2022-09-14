import React, { useEffect, useState } from "react";
import "./Archive.scss";
import { Sidebar } from "../Sidebar";
import PersonIcon from "@mui/icons-material/Person";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import InsightsIcon from "@mui/icons-material/Insights";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import SchoolIcon from "@mui/icons-material/School";
import ArchiveIcon from "@mui/icons-material/Archive";

export const Archive = () => {
  const [archives, setArchives] = useState([]);

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

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/archive`)
      .then((res) => res.json())
      .then((data) => setArchives(data))
      .catch((err) => console.error(err));
  }, [archives]);
  return (
    <div className="archive">
      <Sidebar links={links} />

      <div className="archive__wrapper">
        <h1 className="archive__title">Archive</h1>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Phone Number</th>
              <th>Role</th>
              <th>Registered_at</th>
            </tr>
          </thead>
          <tbody>
            {archives?.map(({ id, username, phone, status, registered_at }) => (
              <tr key={id}>
                <td>{username}</td>
                <td>{phone}</td>
                <td>
                  {status === 1
                    ? "admin"
                    : status === 2
                    ? "teacher"
                    : "student"}
                </td>
                <td>{registered_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
