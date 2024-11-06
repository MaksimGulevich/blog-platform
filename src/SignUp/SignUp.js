import React from 'react'
import './SignUp.css'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <section className="signup">
      <form className="signup__form" onSubmit={handleSubmit((data) => console.log(data))}>
        <h2 className="signup__title">Create new account</h2>
        <label className="signup__label" htmlFor="username">
          <span className="signup__span">Username</span>
          <input
            className={errors.username ? 'signup__error' : 'signup__input'}
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
        <label className="signup__label" htmlFor="email">
          <span className="signup__span">Email address</span>
          <input
            className={errors.email ? 'signup__error' : 'signup__input'}
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
        <label className="signup__label" htmlFor="password">
          <span className="signup__span">Password</span>
          <input
            className={errors.password ? 'signup__error' : 'signup__input'}
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
              pattern: {
                value: /^[a-zA-Z0-9]*$/,
                message: 'Неверное имя пользователя',
              },
            })}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </label>
        <label className="signup__label" htmlFor="repeatpassword">
          <span className="signup__span">Repeat password</span>
          <input
            className={errors.repeatpassword ? 'signup__error' : 'signup__input'}
            type="password"
            placeholder="Repeat password"
            id="repeatpassword"
            {...register('repeatpassword', {
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
          {errors.repeatpassword && <p style={{ color: 'red' }}>{errors.repeatpassword.message}</p>}
        </label>
        <label className="signup__label signup__label_checkbox" htmlFor="checkbox">
          <input
            className="signup__input signup__input_checkbox"
            type="checkbox"
            id="checkbox"
            {...register('checkbox', {
              required: 'Примите согласие на обработку персональных данных',
            })}
          />
          <span className="signup__span signup__span_checkbox">
            I agree to the processing of my personal information
          </span>
        </label>
        {errors.checkbox && (
          <p style={{ color: 'red', marginTop: '0', marginBottom: '25px' }}>{errors.checkbox.message}</p>
        )}
        <button className="signup__button" type="submit" id="button">
          <span className="signup__button_span">Create</span>
        </button>
        <p className="signup__p">
          Already have an account? <Link to="/signin">Sign In.</Link>
        </p>
      </form>
    </section>
  )
}
