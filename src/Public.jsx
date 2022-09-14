import React from "react";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "./components";
import { Login } from "./pages";

export const Public = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<NotFound link={"/"} />} />
    </Routes>
  );
};
