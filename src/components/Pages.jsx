import { Routes,Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import React from 'react'
import Main from "./Main";
import Search from "./Search";
import Station from "./Station";
export default function Pages() {
    const location= useLocation()

    return (
    <Routes location={location}>
      <Route path="/" element={<Main/>} />
      <Route path="/search" element={<Search/>} />
      <Route path="/station/:id" element={<Station/>} />
    </Routes>
  )
}

