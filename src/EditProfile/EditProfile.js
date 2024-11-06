import React from 'react'
import './EditProfile.css'
import { useForm } from 'react-hook-form'

export default function EditProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  return (
    <section className="edit">
      <form className="edit__form" onSubmit={handleSubmit((data) => console.log(data))}>
        <h2 className="edit__title">Create new account</h2>
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
            className={errors.newpassword ? 'edit__error' : 'edit__input'}
            type="text"
            placeholder="New password"
            id="newpassword"
            {...register('newpassword', {
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
          {errors.newpassword && <p style={{ color: 'red' }}>{errors.newpassword.message}</p>}
        </label>
        <label className="edit__label" htmlFor="avatarimage">
          <span className="edit__span">Avatar image (url)</span>
          <input
            className={errors.avatarimage ? 'edit__error' : 'edit__input'}
            type="text"
            placeholder="Avatar image"
            id="avatarimage"
            {...register('avatarimage', {
              required: 'Поле обязательно для заполнения',
              pattern: { value: /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/, message: 'Неверный URL адрес' },
            })}
          />
          {errors.avatarimage && <p style={{ color: 'red' }}>{errors.avatarimage.message}</p>}
        </label>
        <button className="edit__button" type="submit" id="checkbox">
          <span className="edit__button_span">Save</span>
        </button>
      </form>
    </section>
  )
}
