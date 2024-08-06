import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import ProtectedRoute from './components/ProtectedRoute'
import Tasks from './components/Tasks'
import Navbar from './utils/Navbar'

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Tasks />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
