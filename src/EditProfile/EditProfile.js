import React from 'react'
import './EditProfile.css'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { editProfile } from '../Store/UserInfo'

export default function EditProfile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  return (
    <section className="edit">
      <form
        className="edit__form"
        onSubmit={handleSubmit((data) => {
          const { email, password, username, image = null, bio = null } = data
          const user = {
            email,
            username,
            bio,
            image,
            password,
          }
          console.log(user)
          // При отправке формы, диспатчим отправку данных на сервер
          dispatch(editProfile({ token: localStorage.getItem('token'), user }))
            .then((res) => {
              // Проверяем, если запрос успешен, то записываем токен в локалсторедж
              if (res.meta.requestStatus === 'fulfilled' && res.payload.user) {
                navigate('/')
                // Иначе выдаем ошибку в консоль
              } else {
                console.error('Запрос завершился с ошибкой')
              }
            })
            .catch((error) => console.log(error))
        })}
      >
        <h2 className="edit__title">Edit account</h2>
        <label className="edit__label" htmlFor="username">
          <span className="edit__span">Username</span>
          <input
            className={errors.username ? 'edit__error' : 'edit__input'}
            type="text"
            placeholder="username"
            id="username"
            {...register('username', {
              required: 'Поле обязательно для заполнения',
              minLength: {
                value: 3,
                message: 'Поле должно содержать более 3 символов',
              },
              maxLength: {
                value: 20,
                message: 'Поле должно содержать не более 20 символов',
              },
              pattern: {
                value: /^[a-zA-Z0-9]*$/,
                message: 'Неверное имя пользователя',
              },
            })}
          />
          {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
        </label>
        <label className="edit__label" htmlFor="email">
          <span className="edit__span">Email address</span>
          <input
            className={errors.email ? 'edit__error' : 'edit__input'}
            type="text"
            placeholder="Email address"
            id="email"
            {...register('email', {
              required: 'Поле обязательно для заполнения',
              pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: 'Неверный E-mail адрес' },
            })}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </label>
        <label className="edit__label" htmlFor="newpassword">
          <span className="edit__span">New password</span>
          <input
            className={errors.password ? 'edit__error' : 'edit__input'}
            type="password"
            placeholder="New password"
            id="password"
            {...register('password', {
              required: 'Поле обязательно для заполнения',
              minLength: {
                value: 6,
                message: 'Поле должно содержать более 6 символов',
              },
              maxLength: {
                value: 40,
                message: 'Поле должно содержать не более 40 символов',
              },
              pattern: {
                value: /^[a-zA-Z0-9]*$/,
                message: 'Неверное имя пользователя',
              },
            })}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </label>
        <label className="edit__label" htmlFor="image">
          <span className="edit__span">Avatar image (url)</span>
          <input
            className={errors.image ? 'edit__error' : 'edit__input'}
            type="text"
            placeholder="Avatar image"
            id="image"
            {...register('image', {
              required: 'Поле обязательно для заполнения',
              pattern: { value: /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/, message: 'Неверный URL адрес' },
            })}
          />
          {errors.image && <p style={{ color: 'red' }}>{errors.image.message}</p>}
        </label>
        <button className="edit__button" type="submit" id="checkbox">
          <span className="edit__button_span">Save</span>
        </button>
      </form>
    </section>
  )
}
