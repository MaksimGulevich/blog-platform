import React from 'react'
import './ArticlesList.css'
import { HeartOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { format, parseISO } from 'date-fns'
import { Pagination } from 'antd'
import { useNavigate } from 'react-router-dom'

import { onPageChange } from '../Store/ShowSlice'

export default function ArticlesList() {
  // Создаем функцию диспатч
  const dispatch = useDispatch()
  // Записываем в переменную массив статей
  let arrayOfArticles = useSelector((state) => state.show.items.articles)
  // Записываем в переменную количество
  const articlesCount = useSelector((state) => state.show.items.articlesCount)
  // Записываем в переменную текущую страницу
  const currentPage = useSelector((state) => state.show.page)
  // Создаем навигатор для навигации по страницам
  const navigate = useNavigate()

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
  console.log(articlesArray)
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
              <p className="article__tag">{cutString(tag, 20)}</p>
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
    return (
      <article className="article" key={item.slug}>
        <div className="article__contant">
          <h2 className="article__title">
            <button className="article__button" type="button" onClick={() => navigate(`/${item.slug}`)}>
              <span className="article__span">{cutString(item.title, 30)}</span>
            </button>
          </h2>
          <HeartOutlined className="article__heart">{item.favoritesCount}</HeartOutlined>
          <div className="article__div">{item.favoritesCount}</div>
          <br />
          {tags}
          <div className="article__description">{cutString(item.description, 300)}</div>
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
        current={currentPage}
        onChange={(page) => dispatch(onPageChange(page))}
        total={articlesCount}
      />
    </>
  )
}
