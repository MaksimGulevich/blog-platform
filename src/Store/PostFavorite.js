import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const postFavorites = createAsyncThunk('data/postFavorites', async ({ token, slug }) => {
  try {
    const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}/favorite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    })
    const data = await response.json()
    console.log(data)
    return data
  } catch (err) {
    return console.log('что то пошло не так')
  }
})

export const deleteFavorites = createAsyncThunk('data/deleteFavorites', async ({ token, slug }) => {
  try {
    const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    })
    const data = await response.json()
    return data
  } catch (err) {
    return console.log('что то пошло не так')
  }
})

const showFavorites = createSlice({
  name: 'showSlice',
  initialState: {
    favorites: {},
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postFavorites.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(postFavorites.fulfilled, (state) => ({
        ...state,
        status: 'succeeded',
      }))
      .addCase(postFavorites.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
  },
})

// export const {} = showFavorites.actions
export default showFavorites.reducer
