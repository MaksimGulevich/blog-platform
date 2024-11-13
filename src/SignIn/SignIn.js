import React from 'react'
import './SignIn.css'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { currentUser, postUserLogin } from '../Store/UserInfo'

export default function SignIn() {
  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  // Создаем метод диспатч
  const dispatch = useDispatch()

  const serverItems = useSelector((state) => state.userInfo.result)

  return (
    <section className="signin">
      <form
        className="signin__form"
        onSubmit={handleSubmit((data) => {
          const { email, password } = data
          const user = {
            email,
            password,
          }
          // При отправке формы, диспатчим отправку данных на сервер
          dispatch(postUserLogin({ user }))
            .then((res) => {
              // Проверяем, если запрос успешен, то записываем токен в локалсторедж
              if (res.meta.requestStatus === 'fulfilled' && res.payload.user) {
                const { token, username } = res.payload.user
                localStorage.setItem('token', token)
                localStorage.setItem('username', username)
                dispatch(currentUser(token))
                navigate('/')
                // Иначе выдаем ошибку в консоль
              } else {
                console.error('Запрос завершился с ошибкой')
              }
            })
            .catch((error) => console.log(error))
        })}
      >
        <h2 className="signin__title">Sign In</h2>
        <label className="signin__label" htmlFor="email">
          <span className="signin__span">Email address</span>
          <input
            className={errors.email ? 'signin__error' : 'signin__input'}
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
        <label className="signin__label" htmlFor="password">
          <span className="signin__span">Password</span>
          <input
            className={errors.password ? 'signin__error' : 'signin__input'}
            type="password"
            placeholder="Password"
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
            })}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
          {serverItems.errors && <p style={{ color: 'red' }}>Логин или пароль не верный</p>}
        </label>
        <button className="signin__button" type="submit" id="checkbox">
          <span className="signin__button_span">Login</span>
        </button>
        <p className="signin__p">
          Don`t have an account? <Link to="/sign-up">Sign Up.</Link>
        </p>
      </form>
    </section>
  )
}
