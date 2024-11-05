import React from 'react'
import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <h1 className="header__title">Realworld Blog</h1>
      <button className="header__button" type="button" aria-label="Кнопка">
        Sign In
      </button>
      <button className="header__button" type="button" aria-label="Кнопка">
        Sign Up
      </button>
    </header>
  )
}
