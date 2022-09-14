import React from "react";
import { Admin, Teacher, Student } from "./pages";
import {
  NotFound,
  AdminTeacher,
  AdminStudent,
  Archive,
  Courses,
  AdminGroups,
  TeacherGroups,
  StudentGroups,
} from "./components";
import { Routes, Route } from "react-router-dom";

export const Private = () => {
  const getRole = localStorage.getItem("role");

  const link =
    getRole === "admin"
      ? "/admin"
      : getRole === "teacher"
      ? "/teacher"
      : getRole === "student"
      ? "/student"
      : null;

  return (
    <Routes>
      {getRole === "admin" ? (
        <>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/courses" element={<Courses />} />
          <Route path="/admin/teachers" element={<AdminTeacher />} />
          <Route path="/admin/students" element={<AdminStudent />} />
          <Route path="/admin/groups" element={<AdminGroups />} />
          <Route path="/admin/archive" element={<Archive />} />
        </>
      ) : getRole === "teacher" ? (
        <>
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/teacher/groups" element={<TeacherGroups />} />
        </>
      ) : getRole === "student" ? (
        <>
          <Route path="/student" element={<Student />} />
          <Route path="/student/groups" element={<StudentGroups />} />
        </>
      ) : null}

      <Route path="/*" element={<NotFound link={link} />} />
    </Routes>
  );
};
