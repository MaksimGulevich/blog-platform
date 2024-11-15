import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const postUserRegistration = createAsyncThunk('data/postUserRegistration', async (user) => {
  try {
    const response = await fetch('https://blog-platform.kata.academy/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    const result = await response.json()
    console.log(result)
    return result
  } catch (err) {
    return console.log('что то пошло не так')
  }
})

export const currentUser = createAsyncThunk('data/currentUser', async (token) => {
  try {
    const response = await fetch('https://blog-platform.kata.academy/api/user', {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    const result = await response.json()
    console.log(result)
    return result
  } catch (err) {
    return console.log('что то пошло не так')
  }
})

export const editProfile = createAsyncThunk('data/editProfile', async ({ token, user }) => {
  try {
    const response = await fetch('https://blog-platform.kata.academy/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ user }),
    })

    const result = await response.json()
    return result
  } catch (err) {
    return console.log('что то пошло не так')
  }
})

export const postUserLogin = createAsyncThunk('data/postUserLogin', async (user) => {
  try {
    const response = await fetch('https://blog-platform.kata.academy/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    const result = await response.json()
    return result
  } catch (err) {
    return console.log('что то пошло не так')
  }
})

const userInfoSlice = createSlice({
  name: 'userInfoSlice',
  initialState: {
    result: {},
    resReg: {},
    token: '',
    status: 'none',
    error: null,
  },
  reducers: {
    onLogout: (state) => ({
      ...state,
      result: false,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(postUserRegistration.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(postUserRegistration.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        resReg: action.payload,
      }))
      .addCase(postUserRegistration.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
      .addCase(postUserLogin.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(postUserLogin.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        result: action.payload,
      }))
      .addCase(postUserLogin.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
      .addCase(currentUser.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(currentUser.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        result: action.payload,
      }))
      .addCase(currentUser.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
      .addCase(editProfile.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(editProfile.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        result: action.payload,
      }))
      .addCase(editProfile.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
  },
})

export const { onLogout } = userInfoSlice.actions
export default userInfoSlice.reducer
