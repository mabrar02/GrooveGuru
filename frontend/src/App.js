import {BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider} from 'react-router-dom'
import React from 'react'

//pages and components
import Home from './pages/Home'
import ErrorPage from './pages/ErrorPage'
import Login from './pages/Login'

function App() {

  const code = new URLSearchParams(window.location.search).get('code');
  return code ? <Home code={code}/> : <Login/>;
}

export default App;
