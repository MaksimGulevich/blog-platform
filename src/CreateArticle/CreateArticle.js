import React, { useEffect } from 'react'
import './CreateArticle.css'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { postArticle, onTagsDelete, onTagsAdd, onClearTags } from '../Store/ArticleInfo'

export default function CreateArticle() {
  // Создаем функцию диспатч
  const dispatch = useDispatch()

  // Создаем функцию навигейт
  const navigate = useNavigate()

  // Создаем Массив с  тегами
  const tagsArray = useSelector((state) => state.articleInfo.tags)

  const token = localStorage.getItem('token')
  useEffect(() => {
    if (!token) {
      navigate('/sign-in')
    }
  })

  // Извлекаем из useForm необходимые методы для работы с формами
  const {
    register,
    handleSubmit,
    formState: { errors },
    unregister,
  } = useForm()

  // Возвращаем разметку
  return (
    <section className="createarticle">
      <form
        className="createarticle__form"
        onSubmit={handleSubmit((data) => {
          const { title, description, body, ...tags } = data
          const tagList = Object.values(tags)
          const article = {
            title,
            description,
            body,
            tagList,
          }
          // При отправке формы, диспатчим отправку данных на сервер
          dispatch(postArticle({ token: localStorage.getItem('token'), article }))
            .then((res) => {
              // Проверяем, если запрос успешен, то записываем токен в локалсторедж
              if (res.meta.requestStatus === 'fulfilled' && res.payload.article) {
                navigate('/1')
                dispatch(onClearTags())
                // Иначе выдаем ошибку в консоль
              } else {
                console.error('Запрос завершился с ошибкой')
              }
            })
            .catch((error) => console.log(error))
        })}
      >
        <h2 className="createarticle__title">Create new article</h2>
        <label className="createarticle__label" htmlFor="username">
          <span className="createarticle__span">Title</span>
          <input
            className={errors.title ? 'createarticle__error' : 'createarticle__input'}
            type="text"
            placeholder="Title"
            id="title"
            {...register('title', {
              required: 'Поле обязательно для заполнения',
              // pattern: {
              //   value: /^[a-zA-Zа-яА-Я0-9]*$/,
              //   message: 'Неверное имя пользователя',
              // },
            })}
          />
          {errors.title && <p style={{ color: 'red' }}>{errors.title.message}</p>}
        </label>
        <label className="createarticle__label" htmlFor="description">
          <span className="createarticle__span">Short description</span>
          <input
            className={errors.description ? 'createarticle__error' : 'createarticle__input'}
            type="text"
            placeholder="Short description"
            id="description"
            {...register('description', {
              required: 'Поле обязательно для заполнения',
              pattern: { value: /[a-zA-Zа-яА-Я0-9]/ },
            })}
          />
          {errors.description && <p style={{ color: 'red' }}>{errors.description.message}</p>}
        </label>
        <label className="createarticle__label" htmlFor="body">
          <span className="createarticle__span">Text</span>
          <textarea
            className={errors.body ? 'createarticle__error_textarea' : 'createarticle__textarea'}
            type="text"
            placeholder="Text"
            id="body"
            {...register('body', {
              required: 'Поле обязательно для заполнения',
              // pattern: {
              //   value: /^[a-zA-Zа-яА-Я0-9.]*$/,
              // },
            })}
          />
          {errors.body && <p style={{ color: 'red' }}>{errors.body.message}</p>}
        </label>

        {/* Разметка для ТЕГОВ */}
        <span className="createarticle__span">Tags</span>
        <label className="createarticle__label createarticle__label_tag" htmlFor="tagList">
          <div className="createarticle__flex_tag">
            <div className="crearearicle__div_tags">
              {tagsArray.map((tag) => {
                return (
                  <div key={tag}>
                    <input
                      className={errors.tagList ? 'createarticle__error' : 'createarticle__input_tags'}
                      type="text"
                      placeholder="Tags"
                      id="tagList"
                      {...register(`${tag}`, {
                        pattern: { value: /^[a-zA-Zа-яА-Я0-9]*$/ },
                      })}
                    />
                    <button
                      aria-label={tag}
                      className="createarticle__delete"
                      type="button"
                      id="delete"
                      onClick={() => {
                        tagsArray.filter((i) => {
                          if (i === tag) {
                            unregister(tag)
                            return dispatch(onTagsDelete(i))
                          }
                          return null
                        })
                      }}
                    >
                      <span className="createarticle__delete_span">Delete</span>
                    </button>
                  </div>
                )
              })}
            </div>
            {/* Кнопка добавить тег */}
            <button
              aria-label="add"
              className="createarticle__button_add"
              type="button"
              id="add"
              onClick={() => dispatch(onTagsAdd())}
            >
              <span className="createarticle__add_span">Add tags</span>
            </button>
          </div>
          {errors.tagList && <p style={{ color: 'red' }}>{errors.tagList.message}</p>}
        </label>

        {/* Кнопка отправить форму */}
        <button className="createarticle__button" type="submit" id="checkbox">
          <span className="createarticle__button_span">Send</span>
        </button>
      </form>
    </section>
  )
}
