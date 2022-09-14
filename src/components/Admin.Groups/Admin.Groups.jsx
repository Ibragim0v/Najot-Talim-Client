import React, { useEffect, useState } from "react";
import "./Admin.Groups.scss";
import { Sidebar } from "../Sidebar";
import PersonIcon from "@mui/icons-material/Person";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import InsightsIcon from "@mui/icons-material/Insights";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import SchoolIcon from "@mui/icons-material/School";
import ArchiveIcon from "@mui/icons-material/Archive";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

export const AdminGroups = () => {
  const [groups, setGroups] = useState([]);
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [id, setId] = useState(null);

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
    fetch(`${process.env.REACT_APP_API}/groups`)
      .then((res) => res.json())
      .then((data) => setGroups(data?.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/courses`)
      .then((res) => res.json())
      .then((data) => setCourses(data?.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/teachers`)
      .then((res) => res.json())
      .then((data) => setTeachers(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/students`)
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, course, teacher } = e.target;

    fetch(`${process.env.REACT_APP_API}/groups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: name.value,
        course_id: course.value,
        teacher_id: teacher.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  const handleGroup = (e) => {
    e.preventDefault();

    const { group_id, students } = e.target;

    fetch(`${process.env.REACT_APP_API}/studentgroups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        group_id: group_id.value,
        student_id: students.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="groups">
        <Sidebar links={links} />

        <div className="groups__wrapper">
          <div className="groups__cover">
            <h1 className="groups__title">Groups</h1>
            <button
              className="groups__btn"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <AddCircleIcon /> New Group
            </button>
          </div>
          <ul className="groups__list">
            {groups.map((e) => (
              <li className="groups__item" key={e.id}>
                <p className="groups__name">{e.title}</p>
                <button
                  className="groups__btn--create"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight"
                  aria-controls="offcanvasRight"
                  onClick={() => setId(e.id)}
                >
                  <PersonAddAlt1Icon />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Group title" />
                <select name="course">
                  {courses?.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.title}
                    </option>
                  ))}
                </select>
                <select name="teacher">
                  {teachers?.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.username}
                    </option>
                  ))}
                </select>
                <button type="submit" className="btn">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        className="offcanvas offcanvas-end"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">Offcanvas right</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <form onSubmit={handleGroup}>
            <input type="hidden" name="group_id" defaultValue={id} />
            <select name="students">
              {students?.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.username}
                </option>
              ))}
            </select>
            <button type="submit" className="btn">
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
