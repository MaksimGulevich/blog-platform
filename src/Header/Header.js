import React from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()
  return (
    <header className="header">
      <h1 className="header__title">Realworld Blog</h1>
      <button className="header__button" type="button" aria-label="Кнопка" onClick={() => navigate('/signin')}>
        Sign In
      </button>
      <button className="header__button" type="button" aria-label="Кнопка" onClick={() => navigate('/signup')}>
        Sign Up
      </button>
    </header>
  )
}
