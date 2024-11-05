import React, { useEffect } from 'react'
import './Article.css'
import { HeartOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { format, parseISO } from 'date-fns'
import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router-dom'

import { getArticle } from '../Store/ShowSlice'

export default function Article() {
  const articleItems = useSelector((state) => state.show.article.article)
  const dispatch = useDispatch()
  const { id } = useParams()

  // Функция для сокращения строки описания фильма
  function cutString(string, number) {
    let str = string
    while (str.length > number) {
      str = str.split(' ')
      str.pop()
      str = `${str.join(' ')}...`
    }
    return str
  }

  useEffect(() => {
    dispatch(getArticle(id))
  }, [id])

  let article
  let articl
  if (articleItems === undefined) {
    article = []
  } else {
    article = articleItems

    let formattedDate
    if (!article.createdAt) {
      formattedDate = 'Описание отсутствует' // или любое другое значение по умолчанию
    } else {
      const newDate = parseISO(article.createdAt)
      formattedDate = format(newDate, 'MMMM d, yyyy')
    }

    // Перебираем теги
    let keyOfTags = 0
    const tags = article.tagList.map((tag) => {
      keyOfTags += 1
      return (
        <div className="articl__tagbox" key={keyOfTags}>
          <p className="articl__tag">{tag}</p>
        </div>
      )
    })

    articl = (
      <article className="articl">
        <section className="articl__header">
          <div className="articl__contant">
            <h2 className="articl__title">{cutString(article.title, 30)}</h2>
            <HeartOutlined className="articl__heart" />
            <span>{article.favoritesCount}</span>
            <br />
            {tags}
            <div className="articl__discription">{article.description}</div>
          </div>
          <div className="articl__author">
            <h2 className="articl__name"> {article.author.username}</h2>
            <p className="articl__date">{formattedDate}</p>
          </div>
          <div className="articl__imgbox">
            <img className="articl__img" src={article.author.image} alt="Аватар автора" />
          </div>
        </section>
        <section className="articl__main">
          <ReactMarkdown>{article.body}</ReactMarkdown>
        </section>
      </article>
    )
  }

  console.log(article)

  return articl
}
