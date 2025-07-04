import React, { StrictMode } from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home.jsx';
import NewMatch from './pages/NewMatch.jsx';
import StartMatch from './pages/StartMatch.jsx';
import ViewMatch from './pages/ViewMatch.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/new" element={<NewMatch />}/>
        <Route path="/view" element={<ViewMatch />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
