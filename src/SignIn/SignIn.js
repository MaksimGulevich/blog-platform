import React from 'react'
import './SignIn.css'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

export default function SignIn() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  return (
    <section className="signin">
      <form className="signin__form" onSubmit={handleSubmit((data) => console.log(data))}>
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
            type="text"
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
              pattern: {
                value: /^[a-zA-Z0-9]*$/,
                message: 'Неверное имя пользователя',
              },
            })}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </label>
        <button className="signin__button" type="submit" id="checkbox">
          <span className="signin__button_span">Login</span>
        </button>
        <p className="signin__p">
          Don`t have an account? <Link to="/signup">Sign Up.</Link>
        </p>
      </form>
    </section>
  )
}
