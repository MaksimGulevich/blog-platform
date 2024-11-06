import './App.css'

import { BrowserRouter } from 'react-router-dom'

import Main from '../Main/Main'
import Header from '../Header/Header'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Main />
    </BrowserRouter>
  )
}

export default App
