import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import { getArticles } from '../Store/ShowSlice'
import './Main.css'
import ArticlesList from '../ArticlesList/ArticlesList'
import Article from '../Article/Article'
import EditProfile from '../EditProfile/EditProfile'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'

export default function Main() {
  const currentPage = useSelector((state) => state.show.page)
  const currentOffset = useSelector((state) => state.show.offset)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getArticles(currentOffset))
  }, [currentPage])

  return (
    <main className="main">
      <Routes>
        <Route path="/" exact element={<ArticlesList />} />
        <Route path="/:idPage" element={<ArticlesList />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </main>
  )
}
