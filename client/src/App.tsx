// import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'

import Entries from "./Entries"
import Header from "./Header"
import { NewEntry } from './NewEntry'

function App() {
  return (
    <>
    <Routes>
     <Route path='/' element={<Header />}>
      <Route index element={<Entries/>}/>
      <Route path='details/new' element={<NewEntry />} />
     </Route>
      </Routes>
    </>
  )
}

export default App
