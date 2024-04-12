import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Admin from './Admin.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter basename='/PA2-Interactive'>
      <Routes>
        <Route Component={App} path='/'/>
        <Route Component={Admin} path='/admin'/>
      </Routes>
    </HashRouter>
  </React.StrictMode>,
)
