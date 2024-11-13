import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes, Navigate } from 'react-router-dom'

import { currentUser } from '../Store/UserInfo'
import './Main.css'
import ArticlesList from '../ArticlesList/ArticlesList'
import Article from '../Article/Article'
import EditProfile from '../EditProfile/EditProfile'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import CreateArticle from '../CreateArticle/CreateArticle'
import EditArticle from '../EditArticle/EditArticle'

export default function Main() {
  const dispatch = useDispatch()
  useEffect(() => {
    if (localStorage.length !== 0) {
      dispatch(currentUser(localStorage.getItem('token')))
    }
  }, [])

  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<ArticlesList />} />
        <Route path="/:idPage" element={<ArticlesList />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/profile" element={<EditProfile />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/new-article" element={<CreateArticle />} />
        <Route path="/articles/:idArticle/edit" element={<EditArticle />} />
        <Route path="*" element={<Navigate to="/1" replace />} />
      </Routes>
    </main>
  )
}
