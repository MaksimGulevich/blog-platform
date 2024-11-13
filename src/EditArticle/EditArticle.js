import React, { useEffect } from 'react'
import './EditArticle.css'
import { useForm, useFieldArray } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

// import { onPageChange } from '../Store/ShowSlice'
import {
  putArticle,
  getArticle,
  // onTagsDelete, onTagsAdd,
  onClearTags,
} from '../Store/EditArticleInfo'

export default function EditArticle() {
  // Достаем url
  const { idArticle } = useParams()

  // Создаем функцию диспатч
  const dispatch = useDispatch()

  // Создаем функцию навигейт
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    // unregister,
    reset,
    control,
  } = useForm()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList', // Имя массива тегов в форме
  })

  // Запрашиваем данные статьи
  useEffect(() => {
    dispatch(getArticle(idArticle))
  }, [])

  const stateArticle = useSelector((state) => state.editArticleInfo.article)

  console.log(stateArticle)

  // Извлекаем из useForm необходимые методы для работы с формами

  useEffect(() => {
    if (stateArticle.article) {
      reset({
        title: stateArticle.article.title,
        description: stateArticle.article.description,
        body: stateArticle.article.body,
        tagList: stateArticle.article.tagList || [],
      })
    }
  }, [stateArticle, reset])

  // Возвращаем разметку
  return (
    <section className="createarticle">
      <form
        className="createarticle__form"
        onSubmit={handleSubmit((data) => {
          const { title, description, body, tagList } = data
          // const tagList = Object.values(tags)
          const article = {
            title,
            description,
            body,
            tagList,
          }
          console.log(article)
          // При отправке формы, диспатчим отправку данных на сервер
          dispatch(putArticle({ token: localStorage.getItem('token'), article, idArticle }))
            .then((res) => {
              // Проверяем, если запрос успешен, то записываем токен в локалсторедж
              if (res.meta.requestStatus === 'fulfilled' && res.payload.article) {
                // Переходим к списку статей
                navigate('/1')
                // Чистим теги после отправки
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
              {fields.map((tag, index) => {
                return (
                  <div key={tag.id}>
                    <input
                      className={errors.tagList ? 'createarticle__error' : 'createarticle__input_tags'}
                      type="text"
                      placeholder="Tags"
                      id="tagList"
                      {...register(`tagList.${index}`, {
                        pattern: { value: /^[a-zA-Zа-яА-Я0-9]*$/ },
                      })}
                    />
                    <button
                      aria-label={tag}
                      className="createarticle__delete"
                      type="button"
                      id="delete"
                      onClick={() => remove(index)}
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
              onClick={() => append('')}
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
