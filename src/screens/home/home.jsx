import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Library from "../library/library";
import Player from '../player/player';
import Favorites from '../favorites/favorites';
import Feed from '../feed/feed';
import Trending from '../trending';
import Sidebar from '../../components/sidebar/sidebar';
import "./home.css"
import { setClientToken } from "../../spotify";

import Login from '../auth/login';
export default function Home() {
  
    const [token, setToken] = useState("");
  
    useEffect(() => {
      const token = window.localStorage.getItem("token");
      const hash = window.location.hash;
      window.location.hash = "";
      if (!token && hash) {
        const _token = hash.split("&")[0].split("=")[1];
        window.localStorage.setItem("token", _token);
        setToken(_token);
        setClientToken(_token);
      } else {
        setToken(token);
        setClientToken(token);
      }
    }, []);
  
    return !token ? (
      <Login />
    ) : (
    <BrowserRouter>
    <div className="main-body">
    <Sidebar/>

    <Routes>
    <Route path="/" element={<Library />} />
    <Route path="/feed" element={<Feed/>} />
    {/* <Route path="/trending" element={<Trending/>} /> */}
    <Route path="/player" element={<Player/>} />
    <Route path="/favorites" element={<Favorites/>} />

    </Routes>
    </div>
    
    </BrowserRouter>
  )
}

