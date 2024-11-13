import React, { useEffect } from 'react'
import './Article.css'
import Icon, { HeartOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { format, parseISO } from 'date-fns'
import ReactMarkdown from 'react-markdown'
import { useParams, useNavigate } from 'react-router-dom'
import { Popconfirm, Space } from 'antd'

import { postFavorites, deleteFavorites } from '../Store/PostFavorite'
import { onChangeFavoritedArticle, getArticle } from '../Store/ShowSlice'
import { deleteArticle } from '../Store/EditArticleInfo'

function HeartSvg() {
  return (
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
      <title>heart icon</title>
      <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
    </svg>
  )
}
function HeartIcon(props) {
  return <Icon component={HeartSvg} {...props} />
}
export default function Article() {
  const articleItems = useSelector((state) => state.show.article.article)
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  // Функция для удаления всех символов, которые не являются буквами, цифрами или
  // стандартными символами
  function cleanText(text) {
    if (!text) {
      return null
    }
    return text.replace(/\p{Nonspacing_Mark}+/gu, '')
  }

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
    dispatch(getArticle({ token, id }))
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
    let tags
    if (article.tagList) {
      tags = article.tagList.map((tag) => {
        keyOfTags += 1
        if (tag.length !== 0) {
          return (
            <div className="articl__tagbox" key={keyOfTags}>
              <p className="articl__tag">{cleanText(cutString(tag, 300))}</p>
            </div>
          )
        }
        return null
      })
    } else {
      tags = []
    }
    const { slug } = article

    articl = (
      <article className="articl">
        <section className="articl__header">
          <div className="articl__contant">
            <h2 className="articl__title">{cutString(cleanText(article.title), 50)}</h2>
            {article.favorited ? (
              <Space>
                <HeartIcon
                  style={{
                    color: '#FF0707',
                    fontSize: '18px',
                    marginRight: '5px',
                  }}
                  onClick={() => {
                    dispatch(onChangeFavoritedArticle())
                    dispatch(deleteFavorites({ token, slug }))
                  }}
                />
              </Space>
            ) : (
              <HeartOutlined
                className="articl__heart"
                onClick={() => {
                  dispatch(onChangeFavoritedArticle())
                  dispatch(postFavorites({ token, slug }))
                }}
              />
            )}
            <span>{article.favoritesCount}</span>
            <br />
            {tags}
          </div>
          <div className="articl__author">
            <h2 className="articl__name"> {article.author.username}</h2>
            <p className="articl__date">{formattedDate}</p>
          </div>
          <div className="articl__imgbox">
            <img className="articl__img" src={article.author.image} alt="Аватар автора" />
          </div>
        </section>
        <section className="articl__discriptionandbuttons">
          <div className="articl__discription">{cleanText(article.description)}</div>
          <Popconfirm
            placement="topRight"
            title="Are you sure to delete this article?"
            description="'Delete the task'"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              dispatch(deleteArticle({ token, id }))
              navigate('/1')
            }}
          >
            <button
              className={
                article.author.username === localStorage.getItem('username') ? 'articl__button' : 'articl__button_none'
              }
              type="button"
            >
              Delete
            </button>
          </Popconfirm>

          <button
            className={
              article.author.username === localStorage.getItem('username') ? 'articl__button' : 'articl__button_none'
            }
            type="button"
            onClick={() => navigate(`/articles/${article.slug}/edit`)}
          >
            Edit
          </button>
        </section>

        <section className="articl__main">
          <ReactMarkdown>{cleanText(article.body)}</ReactMarkdown>
        </section>
      </article>
    )
  }

  console.log(article)

  return articl
}
