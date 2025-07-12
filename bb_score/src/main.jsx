import React, { StrictMode } from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/Home.jsx';
import NewMatch from './pages/NewMatch.jsx';
import StartMatch from './pages/StartMatch.jsx';
import ViewMatch from './pages/ViewMatch.jsx';
import PrevMatches from './pages/PrevMatches.jsx';
import Login from './pages/Login.jsx';
import Layout from './layout.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/new' element={<NewMatch/>}/>
          <Route path='/view' element={<ViewMatch/>}/>
          <Route path='/previous' element={<PrevMatches/>}/>
        </Route>
        
        <Route path='/start' element={<StartMatch />}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
