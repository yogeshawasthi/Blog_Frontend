import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Home from "./page/Home";
import Blogs from "./Component/Blogs";
import Login from "./Component/Login";
import Signup from "./Component/Signup";

const App = () => {
  return (
    <>
      {/* Navbar is placed outside of Routes to make it persistent */}
      <Navbar />
      <div className="pt-16"> {/* Add padding to avoid overlap with fixed Navbar */}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
