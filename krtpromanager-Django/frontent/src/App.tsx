import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { Form_login } from './components/Usuarios/Form_login.tsx'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path= "/" element ={<Navigate to="/login" />} />
        <Route path= "/login" element = {<Form_login/>}></Route> 
        <Route path= "/login" element = {<Form_login/>}></Route> 
      </Routes>
    </BrowserRouter>
  )
}
