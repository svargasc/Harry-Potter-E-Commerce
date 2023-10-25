import { Routes, Route } from 'react-router-dom'
import './App.css'
import { Books } from './components/Books/Books'
import { ShoppingCar } from './components/ShoppingCar/ShoppingCar'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Books></Books>}></Route>
        <Route path='/car' element={<ShoppingCar></ShoppingCar>}></Route>
      </Routes>
    </>
  )
}

export default App
