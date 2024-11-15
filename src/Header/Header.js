import React from 'react'
import './Header.css'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { onLogout } from '../Store/UserInfo'

export default function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const states = useSelector((state) => state.userInfo.result.user)
  let authorName
  let tokenFromState
  let imageFromState
  if (states) {
    tokenFromState = states.token
    imageFromState = states.image
    authorName = states.username
  } else {
    tokenFromState = undefined
    imageFromState = ''
    authorName = ''
  }

  return (
    <header className="header">
      <h1 className="header__title">
        <Link to="/1">Realworld Blog</Link>
      </h1>
      <button
        className={token || tokenFromState !== undefined ? 'header__button_none' : 'header__button'}
        type="button"
        aria-label="Кнопка входа в профиль"
        onClick={() => navigate('/sign-in')}
      >
        Sign In
      </button>
      <button
        className={token || tokenFromState !== undefined ? 'header__button_none' : 'header__button'}
        type="button"
        aria-label="Кнопка регистрации"
        onClick={() => navigate('/sign-up')}
      >
        Sign Up
      </button>
      <div className={token && tokenFromState !== undefined ? 'header__author' : 'header__author_none'}>
        <Link className="header__button header__button_article" aria-label="Написать статью" to="/new-article">
          Create article
        </Link>

        <p className="header__name">
          {' '}
          <Link to="/profile">{authorName.substr(0, 1).toUpperCase() + authorName.substr(1)}</Link>
        </p>
        <div className="header__imgbox">
          <Link to="/profile">
            <img
              className="header__img"
              src={
                imageFromState === undefined
                  ? 'https://cs13.pikabu.ru/post_img/2020/10/29/7/1603970117173657728.jpg'
                  : imageFromState
              }
              alt="Аватар автора"
            />
          </Link>
        </div>

        <button
          className="header__button header__button_logout"
          type="button"
          aria-label="Кнопка выход из профиля"
          onClick={() => {
            dispatch(onLogout())
            localStorage.clear()
            navigate('/')
          }}
        >
          Log Out
        </button>
      </div>
    </header>
  )
}
