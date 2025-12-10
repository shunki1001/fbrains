import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Page from "./pages/Page";
import Company from "./pages/Company";
import VideoProduction from "./pages/VideoProduction";
import Contact from "./pages/Contact";
import Works from "./pages/Works";
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="blog" element={<Blog />} />
        <Route path="post/:postId" element={<BlogPost />} />
        <Route path="company" element={<Company />} />
        <Route path="video-production" element={<VideoProduction />} />
        <Route path="contact" element={<Contact />} />
        <Route path="works" element={<Works />} />
        {/* このルートは他のどのルートにもマッチしない場合に適用されるため、最後に置く */}
        <Route path=":slug" element={<Page />} />
      </Route>
    </Routes>
  );
}

export default App;
