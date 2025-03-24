import './App.css'
import { useState } from 'react'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import { AppRoutes } from './app/routes'

function App() {

  return (
    <RouterProvider router={AppRoutes}>
      
    </RouterProvider>
  )
}

export default App
