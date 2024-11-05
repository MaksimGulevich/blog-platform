import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { getArticles } from '../Store/ShowSlice'
import './Main.css'
import ArticlesList from '../ArticlesList/ArticlesList'
import Article from '../Article/Article'

export default function Main() {
  const currentPage = useSelector((state) => state.show.page)
  const currentOffset = useSelector((state) => state.show.offset)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getArticles(currentOffset))
  }, [currentPage])

  return (
    <main className="main">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<ArticlesList />} />
          <Route path="/:idPage" element={<ArticlesList />} />
          <Route path="/article/:id" element={<Article />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}
