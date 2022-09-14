import React, { useEffect, useState } from "react";
import { Sidebar } from "../Sidebar";
import { OffCanvas } from "../OffCanvas";
import { Queue } from "../Queue";
import PersonIcon from "@mui/icons-material/Person";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import InsightsIcon from "@mui/icons-material/Insights";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import SchoolIcon from "@mui/icons-material/School";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ArchiveIcon from "@mui/icons-material/Archive";
import "./Admin.TS.scss";

export const AdminTeacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [teacherId, setTeacherId] = useState(null);
  const [inform, setInform] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/teachers`)
      .then((res) => res.json())
      .then((data) => setTeachers(data))
      .catch((err) => console.error(err));
  }, [teachers]);

  useEffect(() => {
    if (teacherId) {
      fetch(`${process.env.REACT_APP_API}/teachers/${teacherId}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => setInform(data?.message))
        .catch((err) => console.error(err));
      return;
    }
  }, [teacherId]);

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

  const inputs = [
    {
      id: 1,
      type: "text",
      name: "name",
      title: "Username",
    },
    {
      id: 2,
      type: "password",
      name: "pass",
      title: "Password",
    },
    {
      id: 3,
      type: "tel",
      name: "tel",
      title: "Phone Number",
    },
  ];

  const link = "/teachers";

  if (inform) {
    setTimeout(() => {
      setInform("");
    }, 2000);
  }

  return (
    <>
      <div className="admin">
        <Sidebar links={links} />

        <div className="admin__wrapper">
          <div className="admin__cover">
            <h1 className="admin__title">Teachers-List</h1>

            <button
              className="admin__create--btn"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              <PersonAddIcon />
              New Teacher
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Phone Number</th>
                <th>Registered at</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map(({ id, username, phone, registered_at }) => (
                <tr key={id}>
                  <td>{username}</td>
                  <td>{phone}</td>
                  <td>{registered_at}</td>
                  <td>
                    <button
                      className="admin__remove--btn"
                      onClick={() => setTeacherId(id)}
                    >
                      Delete
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <OffCanvas title={"New Teacher"} inputs={inputs} link={link} />

      <Queue
        color={"green"}
        active={inform && "queue__active"}
        title={inform}
      />
    </>
  );
};
