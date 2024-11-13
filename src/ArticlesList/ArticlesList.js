import React, { useEffect } from 'react'
import './ArticlesList.css'
import Icon, { HeartOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { format, parseISO } from 'date-fns'
import { Pagination, Space } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'

import { getArticles, onChangeFavorited } from '../Store/ShowSlice'
import { deleteFavorites, postFavorites } from '../Store/PostFavorite'

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

export default function ArticlesList() {
  // Создаем функцию диспатч
  const dispatch = useDispatch()
  // Записываем в переменную массив статей
  let arrayOfArticles = useSelector((state) => state.show.items.articles)
  // Записываем в переменную количество статей
  const articlesCount = useSelector((state) => state.show.items.articlesCount)
  // Создаем токен из локалстореджа
  const token = localStorage.getItem('token')

  const { idPage } = useParams()
  const idPages = parseInt(idPage, 10)
  const currentOffset = (idPages - 1) * 5
  const maxPage = articlesCount / 5
  const maxPages = Math.ceil(maxPage)

  // Создаем навигатор для навигации по страницам
  const navigate = useNavigate()

  // Пишем условие, что бы перенаправлять с неверного адреса
  useEffect(() => {
    if (idPages > maxPages || Number.isNaN(idPages)) {
      navigate('/1')
    }
  }, [idPages])

  useEffect(() => {
    dispatch(getArticles({ token, currentOffset }))
  }, [idPage])

  // Функция для удаления всех символов, которые не являются буквами, цифрами или
  // стандартными символами
  function cleanText(text) {
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
  // Если  мы не получили массив статей, то он равен = []
  if (arrayOfArticles === undefined) {
    arrayOfArticles = []
  }
  // Создаем константу равную массиву статей
  const articlesArray = [...arrayOfArticles]
  // console.log(articlesArray)
  let keyOfTags = 0

  // Создаем статьи из полученного массива статей в стейте методом map

  const articles = articlesArray.map((item) => {
    // Создаем переменную с тегами
    let tags
    if (item.tagList) {
      tags = item.tagList.map((tag) => {
        keyOfTags += 1
        if (tag.length !== 0) {
          return (
            <div className="article__tagbox" key={keyOfTags}>
              <p className="article__tag">{cutString(cleanText(tag), 20)}</p>
            </div>
          )
        }
        return null
      })
    } else {
      tags = []
    }

    // Создаем переменную с датой создания статьи
    let formattedDate
    if (!item.createdAt) {
      formattedDate = 'Описание отсутствует'
    } else {
      const newDate = parseISO(item.createdAt)
      formattedDate = format(newDate, 'MMMM d, yyyy')
    }

    // Возвращаем статьи из метода map()
    const { slug } = item
    return (
      <article className="article" key={item.slug}>
        <div className="article__contant">
          <h2 className="article__title">
            <button className="article__button" type="button" onClick={() => navigate(`/article/${item.slug}`)}>
              <span className="article__span">{cutString(cleanText(item.title), 50)}</span>
            </button>
          </h2>

          {item.favorited ? (
            <Space>
              <HeartIcon
                style={{
                  color: '#FF0707',
                  fontSize: '18px',
                  marginRight: '5px',
                }}
                onClick={() => {
                  dispatch(onChangeFavorited(item.slug))
                  dispatch(deleteFavorites({ token, slug }))
                }}
              />
            </Space>
          ) : (
            <HeartOutlined
              className="article__heart"
              onClick={() => {
                dispatch(onChangeFavorited(item.slug))
                dispatch(postFavorites({ token, slug }))
              }}
            >
              {item.favoritesCount}
            </HeartOutlined>
          )}

          <div className="article__div">{item.favoritesCount}</div>
          <br />
          {tags}
          <div className="article__description">{cutString(cleanText(item.description), 300)}</div>
        </div>
        <div className="article__author">
          <h2 className="article__name"> {item.author.username}</h2>
          <p className="article__date"> {formattedDate}</p>
        </div>
        <div className="article__imgbox">
          <img className="article__img" src={item.author.image} alt="Аватар автора" />
        </div>
      </article>
    )
  })

  // Возвращаем элементы в компонент ArticlesList
  return (
    <>
      {articles}
      <Pagination
        defaultPageSize={5}
        align="center"
        current={idPages}
        onChange={(page) => {
          navigate(`/${page}`)
        }}
        total={articlesCount}
      />
    </>
  )
}
