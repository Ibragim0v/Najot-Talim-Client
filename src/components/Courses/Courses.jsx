import React, { useEffect, useState } from "react";
import "./Courses.scss";
import { Sidebar } from "../Sidebar";
import PersonIcon from "@mui/icons-material/Person";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import InsightsIcon from "@mui/icons-material/Insights";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import SchoolIcon from "@mui/icons-material/School";
import ArchiveIcon from "@mui/icons-material/Archive";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [removed, setRemoved] = useState(null);
  const [inform, setInform] = useState(null);

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
    fetch(`${process.env.REACT_APP_API}/courses`)
      .then((res) => res.json())
      .then((data) => setCourses(data?.data))
      .catch((err) => console.error(err));
  }, [courses]);

  useEffect(() => {
    if (removed) {
      fetch(`${process.env.REACT_APP_API}/courses/${removed}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => setInform(data))
        .catch((err) => console.error(err));
    }
  }, [removed, inform]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, cost, txt } = e.target;

    console.log({
      title: name.value.toString().toLowerCase().trim(),
      price: cost.value,
      body: txt.value.toString().toLowerCase().trim(),
    });

    fetch(`${process.env.REACT_APP_API}/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        title: name.value.toString().toLowerCase().trim(),
        price: cost.value,
        body: txt.value.toString().toLowerCase().trim(),
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="courses">
        <Sidebar links={links} />

        <div className="courses__wrapper">
          <div className="courses__cover">
            <h1 className="courses__title">Courses</h1>
            <button
              className="courses__btn"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <AddCircleIcon /> New Course
            </button>
          </div>
          <ul className="courses__list">
            {courses.map((e) => (
              <li className="courses__item" key={e.id}>
                <span className="courses__btn--update">
                  <EditIcon />
                </span>
                <h5 className="courses__txt">{e.title}</h5>
                <p className="courses__price">{e.price}</p>
                <p className="courses__body">{e.body}</p>
                <button
                  className="courses__btn--delete"
                  onClick={() => setRemoved(e.id)}
                >
                  <DeleteIcon />
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
                <input type="text" name="name" placeholder="Course title" />
                <input type="number" name="cost" placeholder="Course price" />
                <textarea
                  placeholder="Course body"
                  name="txt"
                  cols="30"
                  rows="10"
                ></textarea>
                <button type="submit" className="btn">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
